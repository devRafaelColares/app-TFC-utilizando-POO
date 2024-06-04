import Matches from '../database/models/MatchesModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import MatchesModel from '../models/Matches.model';
import TeamModel from '../models/Team.model';
import { ITeamStats } from '../Interfaces/Teams/ITeamStats';
import StatsCalculator from '../utils/LeaderBoardStatmesnts/StatsCalculator';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
    private teamsModel: ITeamsModel = new TeamModel(),
  ) {}

  public async getHomeLeaderboard(): Promise<ServiceResponse<ITeamStats[]>> {
    try {
      const matches = await this.matchesModel.findAll();
      const teams = await this.teamsModel.findAll();

      const convertedMatches: Matches[] = matches.map((match) => match as Matches);

      const leaderboard: Promise<ITeamStats>[] = teams.map(async (team) => {
        const { teamName } = team;
        const teamId = team.id;
        const teamStats = StatsCalculator.calculateTeamStats(convertedMatches, teamId, teamName);
        return teamStats;
      });

      const data = await Promise.all(leaderboard);
      return { status: 'SUCCESSFUL', data };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Internal Server Error' } };
    }
  }
}
