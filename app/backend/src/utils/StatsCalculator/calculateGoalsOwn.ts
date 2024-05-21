import { MatchWithTeams } from '../../Interfaces/Matches/IMatches';

export default function calculateGoalsOwn(matches: MatchWithTeams[], teamId: number): number {
  let goalsOwn = 0;

  matches.forEach((match) => {
    if (match.homeTeamId === teamId) {
      goalsOwn += match.awayTeamGoals;
    }
  });

  return goalsOwn;
}
