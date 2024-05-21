import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import MatchesModel from '../models/Matches.model';
import TeamModel from '../models/Team.model';
import { ITeamStats } from '../Interfaces/Teams/ITeamStats';
import * as StatsCalculator from '../utils/StatsCalculator';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
    private teamsModel: ITeamsModel = new TeamModel(),
  ) {}

  private static async calculateTeamStats(
    teamId: number,
    teamName: string,
    matches: any[],
  ): Promise<ITeamStats> {
    return {
      name: teamName,
      totalPoints: StatsCalculator.calculateTotalPoints(matches, teamId),
      totalGames: StatsCalculator.calculateTotalGames(matches, teamId),
      totalVictories: StatsCalculator.calculateTotalVictories(matches, teamId),
      totalDraws: StatsCalculator.calculateTotalDraws(matches, teamId),
      totalLosses: StatsCalculator.calculateTotalLosses(matches, teamId),
      goalsFavor: StatsCalculator.calculateGoalsFavor(matches, teamId),
      goalsOwn: StatsCalculator.calculateGoalsOwn(matches, teamId),
    };
  }

  public async getHomeLeaderboard(): Promise<ServiceResponse<ITeamStats[]>> {
    try {
      const matches = await this.matchesModel.findAll();
      const teams = await this.teamsModel.findAll();

      const leaderboard: Promise<ITeamStats>[] = teams.map((team) =>
        LeaderboardService.calculateTeamStats(team.id, team.teamName, matches));

      const data = await Promise.all(leaderboard);
      return { status: 'SUCCESSFUL', data };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Internal Server Error' } };
    }
  }
}
