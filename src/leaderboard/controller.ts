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

const dateToString = (date: Date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
};

export const topDonationsOfTheDay = catchAsync(
    async (req: Request, res: Response) => {
        const donations = await prisma.donation.findMany({
            where: {
                created_at: {
                    gte: new Date()
                }
            },
            orderBy: {
                donated_amount: 'desc'
            },
            take: 3
        });

        let result: any = {};
        if (donations.length >= 1) {
            result["first"] = await donationModelFromPrisma(donations[0]);
        }
        if (donations.length >= 2) {
            result["second"] = await donationModelFromPrisma(donations[1]);
        }
        if (donations.length >= 3) {
            result["third"] = await donationModelFromPrisma(donations[2]);
        }

        return res.status(200).json(createResponse(result, 200));
    }
);