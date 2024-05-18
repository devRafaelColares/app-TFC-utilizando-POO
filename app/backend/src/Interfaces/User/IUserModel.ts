import IUser from './IUser';

export interface IUserModel {
  findByEmail(email: IUser['email']):
  Promise<Pick<IUser, 'id' | 'role' | 'email' | 'password'> | null>;
}
