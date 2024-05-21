import { MatchWithTeams } from '../../Interfaces/Matches/IMatches';

export default function calculateTotalLosses(matches: MatchWithTeams[], teamId: number): number {
  let totalLosses = 0;

  matches.forEach((match) => {
    if (match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals) {
      totalLosses += 1;
    }
  });

  return totalLosses;
}
