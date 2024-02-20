import { NextFunction, Request, Response } from 'express';
import catchAsync from "../util/catchAsync";
import { createResponse } from '../util/createResponse';
import prisma from '../util/db';
import { userModelFromPrisma } from '../users/model';
import { donationModelFromPrisma } from '../donations/model';

export const leaderboard = catchAsync(
    async (req: Request, res: Response) => {
        const leaderboardPrisma = await prisma.user.findMany({
            orderBy: {
                donated_amount: 'desc'
            },
            take: 10
        });

        const leaderboard = await Promise.all(leaderboardPrisma.map(userModelFromPrisma));

        return res.status(200).json(createResponse(leaderboard, 200));
    }
);

export const topDonationOfTheDay = catchAsync(
    async (req: Request, res: Response) => {
        let today = new Date();
        today.setHours(0, 0, 0, 0);

        const donations = await prisma.donation.findMany({
            where: {
                created_at: {
                    gte: today
                }
            },
            orderBy: {
                donated_amount: 'desc'
            },
            take: 1
        });

        let result: any = null;
        if (donations.length >= 1) {
            result = await donationModelFromPrisma(donations[0]);
        }

        return res.status(200).json(createResponse(result, 200));
    }
);

export const last2Donations = catchAsync(
    async (req: Request, res: Response) => {
        const donations = await prisma.donation.findMany({
            orderBy: {
                created_at: 'desc'
            },
            take: 2
        });

        let result: any = {};
        if (donations.length >= 1) {
            result["first"] = await donationModelFromPrisma(donations[0]);
        }
        if (donations.length >= 2) {
            result["second"] = await donationModelFromPrisma(donations[1]);
        }

        return res.status(200).json(createResponse(result, 200));
    }
);