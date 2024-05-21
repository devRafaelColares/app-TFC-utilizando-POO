import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import MatchesModel from '../models/Matches.model';
import { MatchWithTeams } from '../Interfaces/Matches/IMatches';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  private static mapToMatchWithTeams(matches: any[]): MatchWithTeams[] {
    return matches.map((match) => ({
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
    }));
  }

  public async getAllMatches(): Promise<ServiceResponse<MatchWithTeams[]>> {
    const allMatches = await this.matchesModel.findAll();
    const matchesWithTeams = MatchesService.mapToMatchWithTeams(allMatches);
    return { status: 'SUCCESSFUL', data: matchesWithTeams };
  }

  public async getMatchesByStatus(inProgress: boolean): Promise<ServiceResponse<MatchWithTeams[]>> {
    const filteredMatches = await this.matchesModel.findAllBoolean(inProgress);
    const matchesWithTeams = MatchesService.mapToMatchWithTeams(filteredMatches);
    return { status: 'SUCCESSFUL', data: matchesWithTeams };
  }

  public async getAndFinishMatche(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const isSuccess = await this.matchesModel.finishMatch(id);
    if (isSuccess) {
      return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
    }
    return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
  }

  public async updateMatch(id: number, updatedData: {
    homeTeamGoals: number, awayTeamGoals: number }): Promise<ServiceResponse<ServiceMessage>> {
    const isSuccess = await this.matchesModel.updateMatch(id, updatedData);

    if (isSuccess) {
      return { status: 'SUCCESSFUL', data: { message: 'Match updated successfully' } };
    }
    return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
  }
}
