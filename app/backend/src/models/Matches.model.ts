import { MatchWithTeams } from '../Interfaces/Matches/IMatches';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = Matches;

  private static mapMatches(dbData: any[]): MatchWithTeams[] {
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

  async findAll(): Promise<MatchWithTeams[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return MatchesModel.mapMatches(dbData);
  }

  async findAllBoolean(inProgress: boolean): Promise<MatchWithTeams[]> {
    const dbData = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return MatchesModel.mapMatches(dbData);
  }

  async finishMatch(id: number): Promise<boolean> {
    const match = await this.model.findOne({ where: { id } });
    if (!match) {
      return false;
    }

    match.inProgress = false;
    await match.save();

    return true;
  }
}
