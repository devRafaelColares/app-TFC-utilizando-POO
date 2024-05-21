import { MatchWithTeams } from '../Interfaces/Matches/IMatches';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = Matches;
  private teams = Teams;

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

  async updateMatch(id: number, updatedData:
  { homeTeamGoals: number, awayTeamGoals: number }): Promise<boolean> {
    const match = await this.model.findOne({ where: { id } });

    if (!match) {
      return false;
    }

    match.homeTeamGoals = updatedData.homeTeamGoals;
    match.awayTeamGoals = updatedData.awayTeamGoals;

    await match.save();

    return true;
  }

  async findTeamById(id: number): Promise<Teams | null> {
    return this.teams.findOne({ where: { id } });
  }

  async createMatch(matchData:
  { homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number }) {
    const newMatch = await this.model.create({ ...matchData, inProgress: true });
    return newMatch;
  }
}
