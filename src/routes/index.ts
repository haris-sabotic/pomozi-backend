import { Router } from 'express';
import authRouter from './authRoutes';
import userRouter from './userRoutes';
import donationRouter from './donationRoutes';
import rewardRouter from './rewardRoutes';
import organizationRouter from './organizationRoutes';
import leaderboardRouter from './leaderboardRoutes';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/donation', donationRouter);
router.use('/reward', rewardRouter);
router.use('/organization', organizationRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;