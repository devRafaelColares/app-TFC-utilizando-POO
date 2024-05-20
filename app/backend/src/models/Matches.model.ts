import { MatchWithTeams } from '../Interfaces/Matches/IMatches';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = Matches;

  async findAll(): Promise<MatchWithTeams[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    }) as unknown as MatchWithTeams[];

    return dbData.map((match) => ({
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
}
