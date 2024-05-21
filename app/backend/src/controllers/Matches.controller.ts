import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const serviceResponse = inProgress !== undefined
      ? await this.matchesService.getMatchesByStatus(inProgress === 'true')
      : await this.matchesService.getAllMatches();

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getMatcheForFinish(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchesService.getAndFinishMatche(Number(id));

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const serviceResponse = await this.matchesService.updateMatch(Number(id), {
      homeTeamGoals,
      awayTeamGoals,
    });

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    const serviceResponse = await this.matchesService.createMatch({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    });

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
