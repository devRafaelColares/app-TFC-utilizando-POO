import { ILeaderboard } from '../../Interfaces/Leaderboard/ILeaderboard';
import Matches from '../../database/models/MatchesModel';

export default class StatsCalculator {
  public static calculateTeamStats(matches:
  Matches[], teamId: number, teamName: string): ILeaderboard {
    const teamMatches = this.filterTeamMatches(matches, teamId);
    const totalGames = this.calculateTotalGames(teamMatches);
    const { totalVictories, totalDraws, totalLosses } = this.calcTotalResults(teamMatches, teamId);
    const { goalsFavor, goalsOwn } = this.calculateGoals(teamMatches, teamId);
    const { totalPoints, efficiency } = this.calcPtsNEffic(totalVictories, totalDraws, totalGames);

    return {
      name: teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency,
    };
  }

  private static filterTeamMatches(matches: Matches[], teamId: number): Matches[] {
    return matches.filter((match) => match.homeTeamId === teamId || match.awayTeamId === teamId);
  }

  private static calculateTotalGames(matches: Matches[]): number {
    return matches.length;
  }

  private static calcTotalResults(
    matches: Matches[],
    teamId: number,
  ): { totalVictories: number; totalDraws: number; totalLosses: number } {
    const totalVictories = matches.filter((match) =>
      (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals)
      || (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals)).length;

    const totalDraws = matches.filter((match) =>
      (match.homeTeamId === teamId || match.awayTeamId === teamId)
      && match.homeTeamGoals === match.awayTeamGoals).length;

    const totalGames = matches.length;
    const totalLosses = totalGames - totalVictories - totalDraws;

    return { totalVictories, totalDraws, totalLosses };
  }

  private static calculateGoals(matches: Matches[], teamId: number):
  { goalsFavor: number; goalsOwn: number } {
    const goalsFavor = matches.reduce((acc, match) =>
      acc + (match.homeTeamId === teamId ? match.homeTeamGoals : match.awayTeamGoals), 0);

    const goalsOwn = matches.reduce((acc, match) =>
      acc + (match.homeTeamId === teamId ? match.awayTeamGoals : match.homeTeamGoals), 0);

    return { goalsFavor, goalsOwn };
  }

  private static calcPtsNEffic(
    totalVictories: number,
    totalDraws: number,
    totalGames: number,
  ): { totalPoints: number; efficiency: number } {
    const totalPoints = totalVictories * 3 + totalDraws;
    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
    return { totalPoints, efficiency };
  }
}
