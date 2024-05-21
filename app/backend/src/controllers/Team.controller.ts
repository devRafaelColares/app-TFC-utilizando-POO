import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamServices from '../services/Team.service';

export default class TeamController {
  constructor(
    private TeamsService = new TeamServices(),
  ) {}

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.TeamsService.getAllTeams();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.TeamsService.getTeamById(Number(id));
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
