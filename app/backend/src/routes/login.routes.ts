import { Request, Router, Response } from 'express';
import LoginController from '../controllers/Login.controller';

const loginController = new LoginController();

const router = Router();

router.post('/', (req: Request, res: Response) => loginController.login(req, res));

export default router;
