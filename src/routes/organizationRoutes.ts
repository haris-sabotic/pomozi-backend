import { Router } from 'express';
import * as organizationController from '../organizations/controller';

const router = Router();

router
    .route('/')
    .get(organizationController.allOrganizations);

export default router;
