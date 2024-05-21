import Teams from '../../database/models/TeamsModel';
import IMatches, { MatchWithTeams } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  findAllBoolean(inProgress: boolean): Promise<MatchWithTeams[]>,
  finishMatch(matchId: number): Promise<boolean>,
  updateMatch(id: number, updatedData:
  { homeTeamGoals: number, awayTeamGoals: number }): Promise<boolean>,
  findTeamById(id: number): Promise<Teams | null>,
  createMatch(matchData:
  { homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number }): Promise<IMatches>;
}
