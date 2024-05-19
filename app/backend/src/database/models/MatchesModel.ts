import { DataTypes, Model, Optional } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';
import IMatches from '../../Interfaces/Matches/IMatches';

type MatchesCreationAttributes = Optional<IMatches, 'id'>;

export default class Matches extends Model<
IMatches, MatchesCreationAttributes> implements IMatches {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Teams.hasMany(Matches, {
  foreignKey: 'homeTeamId', as: 'homeMatches',
});

Teams.hasMany(Matches, {
  foreignKey: 'awayTeamId', as: 'awayMatches',
});

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeamId', as: 'homeTeam',
});

Matches.belongsTo(Teams, {
  foreignKey: 'awayTeamId', as: 'awayTeam',
});
