import { Request, Router, Response } from 'express';
import LoginController from '../controllers/Login.controller';
import AuthMiddleware from '../middlewares/authMiddleware';

const loginController = new LoginController();
const router = Router();

router.get(
  '/role',
  AuthMiddleware.validateToken,
  (req: Request, res: Response) => loginController.getUserRole(req, res),
);
router.post('/', (req: Request, res: Response) => loginController.login(req, res));

export default router;
