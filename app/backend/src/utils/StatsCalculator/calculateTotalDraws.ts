import { MatchWithTeams } from '../../Interfaces/Matches/IMatches';

export default function calculateTotalDraws(matches: MatchWithTeams[], teamId: number): number {
  let totalDraws = 0;

  matches.forEach((match) => {
    if (match.homeTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals) {
      totalDraws += 1;
    }
  });

  return totalDraws;
}
