import { Router } from 'express';
import * as actionController from '../actions/controller';

const router = Router();

router
    .route('/')
    .get(actionController.allActions);

export default router;
