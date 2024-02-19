import { Router } from 'express';
import * as rewardController from '../rewards/controller';
import authMiddleware from '../middlewares/auth';

const router = Router();

router
    .route('/')
    .get(rewardController.allRewards);

router
    .route('/user')
    .get(authMiddleware, rewardController.userRewards);

router
    .route('/buy/:id')
    .post(authMiddleware, rewardController.userBuyReward);

export default router;
