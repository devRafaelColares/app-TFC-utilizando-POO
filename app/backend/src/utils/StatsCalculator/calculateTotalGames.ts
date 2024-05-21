import { MatchWithTeams } from '../../Interfaces/Matches/IMatches';

export default function calculateTotalGames(matches: MatchWithTeams[], teamId: number): number {
  return matches.filter((match) => match.homeTeamId === teamId).length;
}
