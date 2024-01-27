import { Router } from 'express';
import * as donationController from '../donations/controller';
import authMiddleware from '../middlewares/auth';

const router = Router();

router
    .route('/create/:id')
    .post(donationController.createDonation);

export default router;