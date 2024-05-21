import { MatchWithTeams } from '../../Interfaces/Matches/IMatches';

export default function calculateTotalPoints(matches: MatchWithTeams[], teamId: number): number {
  let totalPoints = 0;

  matches.forEach((match) => {
    if (match.homeTeamId === teamId) {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalPoints += 3;
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        totalPoints += 1;
      }
    }
  });

  return totalPoints;
}
