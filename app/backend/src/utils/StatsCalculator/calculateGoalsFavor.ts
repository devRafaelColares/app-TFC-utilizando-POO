import { MatchWithTeams } from '../../Interfaces/Matches/IMatches';

export default function calculateGoalsFavor(matches: MatchWithTeams[], teamId: number): number {
  let goalsFavor = 0;

  matches.forEach((match) => {
    if (match.homeTeamId === teamId) {
      goalsFavor += match.homeTeamGoals;
    }
  });

  return goalsFavor;
}
