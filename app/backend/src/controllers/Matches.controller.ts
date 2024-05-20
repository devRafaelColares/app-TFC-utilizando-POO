import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const matchesResponse = await this.matchesService.getAllMatches();
    if (matchesResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(matchesResponse.status)).json(matchesResponse.data);
    }
    res.status(200).json(matchesResponse.data);
  }
}
