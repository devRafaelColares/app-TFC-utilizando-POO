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

router.patch(
  '/:id',
  AuthMiddleware.validateToken,
  (req, res) => matchesController.updateMatch(req, res),
);

router.post(
  '/',
  AuthMiddleware.validateToken,
  (req, res) => matchesController.createMatch(req, res),
);
export default router;
