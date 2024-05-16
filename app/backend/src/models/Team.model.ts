import ITeams from '../Interfaces/Teams/ITeams';
import Teams from '../database/models/TeamsModel';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';

export default class TeamModel implements ITeamsModel {
  private model = Teams;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { teamName }: ITeams = dbData;
    return { id, teamName };
  }
}
