import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LoginService from '../services/Login.service';
import UserModel from '../models/User.model';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
    private userModel = new UserModel(),
  ) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.loginService.login(email, password);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    res.status(200).json(serviceResponse.data);
  }

  public async getUserRole(req: Request, res: Response) {
    const userEmail = (req as any).user.email;
    const user = await this.userModel.findByEmail(userEmail);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ role: user.role });
  }
}
