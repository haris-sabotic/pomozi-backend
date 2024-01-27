import { NextFunction, Request, Response } from 'express';
import catchAsync from "../util/catchAsync";
import { createResponse } from '../util/createResponse';
import prisma from '../util/db';
import { userModelFromPrisma } from '../users/model';
import { donationModelFromPrisma } from '../donations/model';
import { hashPassword } from '../auth/util';

export const user = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.user!;

        const userPrisma = await prisma.user.findUnique({
            where: { id: id },
        });

        const userModel = await userModelFromPrisma(userPrisma!);
        return res.status(200).json(createResponse(userModel, 200));
    }
);

export const editUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user!;
        const { name, email, password, phone, about, photo } = req.body;

        let data: any = {};
        if (name) {
            data.name = name;
        }

        if (email) {
            data.email = email;
        }

        if (password) {
            data.password = await hashPassword(password);
        }

        if (phone) {
            data.phone = phone;
        }

        if (about) {
            data.about = about;
        }

        if (photo) {
            data.photo = photo;
        }

        const userPrisma = await prisma.user.update({
            where: { id: id },
            data
        });

        const userModel = await userModelFromPrisma(userPrisma!);
        return res.status(200).json(createResponse(userModel, 200));
    }
);

export const allUsers = catchAsync(
    async (req: Request, res: Response) => {
        const userPrisma = await prisma.user.findMany();

        const userModels = await Promise.all(userPrisma.map(userModelFromPrisma));

        return res.status(200).json(createResponse(userModels, 200));
    }
);

export const getDonations = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.user!;

        const userPrisma = await prisma.user.findUnique({
            where: { id: id },
            select: {
                donations: true
            }
        });

        const donations = userPrisma!.donations;
        const donationModels = await Promise.all(donations.map(donationModelFromPrisma));

        return res.status(200).json(createResponse(donationModels, 200));
    }
);
