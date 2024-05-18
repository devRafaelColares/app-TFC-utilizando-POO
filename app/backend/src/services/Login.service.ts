import * as bcrypt from 'bcryptjs';
import UserModel from '../models/User.model';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import JwtUtils from '../utils/jwtUtils';

export default class LoginService {
  constructor(
    private userModel = new UserModel(),
  ) {}

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    if (!email || !password) {
      return { status: 'BAD_REQUEST', data: { message: 'All fields must be filled' } };
    }

    const user = await this.userModel.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Incorrect email or password' } };
    }

    const token = JwtUtils.sign({ id: user.id, role: user.role });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
