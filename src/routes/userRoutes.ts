import { Router } from 'express';
import * as userController from '../users/controller';
import authMiddleware from '../middlewares/auth';

const router = Router();

router
    .route('/')
    .get(authMiddleware, userController.user);

router
    .route('/edit')
    .put(authMiddleware, userController.editUser);

router
    .route('/all')
    .get(userController.allUsers);

router
    .route('/donations')
    .get(authMiddleware, userController.getDonations);

export default router;