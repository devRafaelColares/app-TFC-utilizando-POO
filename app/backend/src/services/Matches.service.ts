import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import MatchesModel from '../models/Matches.model';
import { MatchWithTeams } from '../Interfaces/Matches/IMatches';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<MatchWithTeams[]>> {
    const allMatches = await this.matchesModel.findAll();
    const matchesWithTeams: MatchWithTeams[] = allMatches.map((match) => ({
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
    }));
    return { status: 'SUCCESSFUL', data: matchesWithTeams };
  }
}
