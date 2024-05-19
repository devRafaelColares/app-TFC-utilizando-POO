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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const INVALID_DATA_MSG = 'Invalid email or password';
    if (!emailRegex.test(email)) {
      return { status: 'INVALID_DATA', data: { message: INVALID_DATA_MSG } };
    }

    if (password.length < 6) {
      return { status: 'INVALID_DATA', data: { message: INVALID_DATA_MSG } };
    }

    const user = await this.userModel.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'INVALID_DATA', data: { message: INVALID_DATA_MSG } };
    }

    const token = JwtUtils.sign({ id: user.id, email: user.email });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
