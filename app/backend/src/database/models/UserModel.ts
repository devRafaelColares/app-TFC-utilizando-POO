import { DataTypes, Model, Optional } from 'sequelize';
import db from '.';
import IUser from '../../Interfaces/User/IUser';

type UserCreationAttributes = Optional<IUser, 'id'>;

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: number;
  public userName!: string;
  public role!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username',
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'User',
    timestamps: false,
    underscored: true,
  },
);

export default User;
