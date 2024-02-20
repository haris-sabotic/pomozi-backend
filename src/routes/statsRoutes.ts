import { Router } from 'express';
import * as leaderboardController from '../stats/controller';

const router = Router();

router
    .route('/leaderboard')
    .get(leaderboardController.leaderboard);

router
    .route('/top-donation')
    .get(leaderboardController.topDonationOfTheDay);

router
    .route('/last-2-donations')
    .get(leaderboardController.last2Donations);

export default router;
