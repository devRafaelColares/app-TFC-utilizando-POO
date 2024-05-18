import IUser from '../Interfaces/User/IUser';
import { IUserModel } from '../Interfaces/User/IUserModel';
import User from '../database/models/UserModel';

export default class UserModel implements IUserModel {
  private model = User;

  async findByEmail(email: IUser['email']):
  Promise<Pick<IUser, 'id' | 'role' | 'email' | 'password'> | null> {
    const dbUser = await this.model.findOne({
      where: { email },
      attributes: ['id', 'role', 'email', 'password'],
    });

    if (!dbUser) return null;
    return { id: dbUser.id, role: dbUser.role, email: dbUser.email, password: dbUser.password };
  }
}
