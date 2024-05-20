import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/Matches.controller';
import AuthMiddleware from '../middlewares/authMiddleware';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  AuthMiddleware.validateToken,
  (req: Request, res: Response) => matchesController.getMatcheForFinish(req, res),
);

export default router;
