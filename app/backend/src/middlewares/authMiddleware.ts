import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/User.model';
import JwtUtils from '../utils/jwtUtils';

class AuthMiddleware {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = header.split(' ')[1];

    try {
      const decodedToken = JwtUtils.verify(token);

      const userModel = new UserModel();
      const data = await userModel.findByEmail(decodedToken.email);

      if (!data) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Salvando o usuário no objeto de solicitação para uso posterior no controlador
      (req as any).user = data;

      // Passando o controle para a próxima função
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default AuthMiddleware;
