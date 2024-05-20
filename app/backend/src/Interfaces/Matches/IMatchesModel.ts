import IMatches, { MatchWithTeams } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  findAllBoolean(inProgress: boolean): Promise<MatchWithTeams[]>
}
