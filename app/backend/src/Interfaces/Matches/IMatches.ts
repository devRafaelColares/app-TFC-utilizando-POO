export default interface IMatches {
  [x: string]: any;
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface MatchWithTeams extends IMatches {
  homeTeam: { teamName: string };
  awayTeam: { teamName: string };
}
