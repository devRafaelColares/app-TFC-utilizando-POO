import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamServices from '../services/Team.service';

export default class TeamController {
  constructor(
    private TeamsService = new TeamServices(),
  ) {}

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.TeamsService.getAllTeams();

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    res.status(200).json(serviceResponse.data);
  }
}
