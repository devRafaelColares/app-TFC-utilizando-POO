import ITeams from '../Interfaces/Teams/ITeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import TeamModel from '../models/Team.model';

export default class TeamServices {
  constructor(
    private TeamsModel: ITeamsModel = new TeamModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allBooks = await this.TeamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allBooks };
  }
}
