import { Router } from 'express';
import authRouter from './authRoutes';
import userRouter from './userRoutes';
import donationRouter from './donationRoutes';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/donation', donationRouter);

export default router;