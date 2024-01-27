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

        const donationPrisma = await prisma.donation.create({
            data: {
                donated_to: donatedTo,
                donated_amount: donatedAmount,
                points,
                userId
            }
        });


        await prisma.user.update({
            where: { id: userId },
            data: {
                points: user.points + points,
                donated_amount: user.donated_amount + donatedAmount,
            }
        });

        const donationModel = await donationModelFromPrisma(donationPrisma);
        return res.status(200).json(createResponse(donationModel, 200));
    }
);