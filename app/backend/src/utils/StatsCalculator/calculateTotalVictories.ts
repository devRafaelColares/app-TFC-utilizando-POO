import { MatchWithTeams } from '../../Interfaces/Matches/IMatches';

export default function calculateTotalVictories(matches: MatchWithTeams[], teamId: number): number {
  let totalVictories = 0;

  matches.forEach((match) => {
    if (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals) {
      totalVictories += 1;
    }
  });

  return totalVictories;
}
