import { DataTypes, Model, Optional } from 'sequelize';
import db from '.';
import ITeams from '../../Interfaces/ITeams';

type TeamCreationAttributes = Optional<ITeams, 'id'>;

class Teams extends Model<ITeams, TeamCreationAttributes> implements ITeams {
  public id!: number;
  public teamName!: string;
}

Teams.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'team_name',
    },
  },
  {
    sequelize: db,
    modelName: 'Team',
    timestamps: false,
    underscored: true,
  },
);

export default Teams;
