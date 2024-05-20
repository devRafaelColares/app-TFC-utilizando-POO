import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    let matchesResponse;
    if (inProgress !== undefined) {
      const inProgressBool = inProgress === 'true';
      matchesResponse = await this.matchesService.getMatchesByStatus(inProgressBool);
    } else {
      matchesResponse = await this.matchesService.getAllMatches();
    }

    if (matchesResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(matchesResponse.status)).json(matchesResponse.data);
    }
    res.status(200).json(matchesResponse.data);
  }

  public async getMatcheForFinish(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const finishResponse = await this.matchesService.getAndFinishMatche(Number(id));

      if (finishResponse.status === 'SUCCESSFUL') {
        return res.status(200).json({ message: 'Finished' });
      }
      return res.status(mapStatusHTTP(finishResponse.status)).json(finishResponse.data);
    } catch (error) {
      console.error('Erro ao finalizar a partida:', error);
      return res.status(500).json({ message: 'Erro ao finalizar a partida' });
    }
  }
}
