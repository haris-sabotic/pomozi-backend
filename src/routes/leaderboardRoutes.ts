import { Router } from 'express';
import * as leaderboardController from '../leaderboard/controller';

const router = Router();

router
    .route('/leaderboard')
    .get(leaderboardController.leaderboard);

router
    .route('/top-donations')
    .get(leaderboardController.topDonationsOfTheDay);

export default router;
