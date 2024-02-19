import { NextFunction, Request, Response } from 'express';
import catchAsync from "../util/catchAsync";
import { createResponse } from '../util/createResponse';
import prisma from '../util/db';
import { donationModelFromPrisma } from '../donations/model';
import CustomError from '../util/customError';

export const createDonation = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = parseInt(req.params.id);
        const { donatedTo, donatedAmount, points } = req.body;

        if (!donatedTo || !donatedAmount || !points) {
            return next(
                new CustomError('Please provide donatedTo, donatedAmount and points', 400)
            );
        }

        const user = await prisma.user.findFirst({
            where: { id: userId }
        });
        if (!user) {
            return next(
                new CustomError('No user with that id exists', 400)
            );
        }

        const organization = await prisma.organization.findFirst({
            where: { id: parseInt(donatedTo) }
        });
        if (!organization) {
            return next(
                new CustomError('No organization with that id exists', 400)
            );
        }

        const date = new Date();

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"];
        const dateString = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

        const donationPrisma = await prisma.donation.create({
            data: {
                donated_to_id: parseInt(donatedTo),
                donated_amount: donatedAmount,
                points,
                userId,
                date: dateString
            }
        });


        const leaderBoard = await prisma.user.findMany({
            orderBy: {
                donated_amount: 'desc'
            },
            take: 10
        });

        let topThree = undefined;
        let ranked = undefined;
        if (leaderBoard[0].id == userId || leaderBoard[1].id == userId || leaderBoard[2].id == userId) {
            topThree = true;
        }
        for (let i = 0; i < leaderBoard.length; i++) {
            if (leaderBoard[i].id == userId) {
                ranked = true;
                break;
            }
        }

        await prisma.user.update({
            where: { id: userId },
            data: {
                points: user.points + points,
                donated_amount: user.donated_amount + donatedAmount,
                alltime_total_points: {
                    increment: points
                },
                alltime_been_ranked: ranked,
                alltime_been_top_three: topThree
            }
        });

        const donationModel = await donationModelFromPrisma(donationPrisma);
        return res.status(200).json(createResponse(donationModel, 200));
    }
);