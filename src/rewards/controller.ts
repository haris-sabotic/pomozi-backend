import { NextFunction, Request, Response } from 'express';
import catchAsync from "../util/catchAsync";
import { createResponse } from '../util/createResponse';
import prisma from '../util/db';
import { rewardModelFromPrisma } from './model';
import CustomError from '../util/customError';
import { Reward } from '@prisma/client';

export const allRewards = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const query = req.query.query;

        let rewardsPrisma: Reward[] = [];
        if (query) {
            if (typeof query != "string") {
                return next(
                    new CustomError('query must be a string', 400)
                );
            }

            rewardsPrisma = await prisma.reward.findMany({
                where: {
                    name: {
                        contains: query,
                        mode: 'insensitive'
                    }
                }
            });
        } else {
            rewardsPrisma = await prisma.reward.findMany();
        }

        const rewards = await Promise.all(rewardsPrisma.map(rewardModelFromPrisma));

        return res.status(200).json(createResponse(rewards, 200));
    }
);

export const userRewards = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user!;

        const userRewardsPrisma = await prisma.userReward.findMany({
            where: { userId: id },
        });


        const userRewards = await Promise.all(userRewardsPrisma.map(async (userReward) => {
            const reward = await prisma.reward.findUnique({
                where: { id: userReward.rewardId }
            });

            return {
                count: userReward.count,
                reward: await rewardModelFromPrisma(reward!)
            };
        }));

        return res.status(200).json(createResponse(userRewards, 200));
    }
);

export const userBuyReward = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user!;
        const rewardId = parseInt(req.params.id);

        const reward = await prisma.reward.findUnique({ where: { id: rewardId } });
        if (!reward) {
            return next(
                new CustomError('No reward with that id exists', 400)
            );
        }

        if ((reward.price as Number) > req.user!.points) {
            return next(
                new CustomError('Not enough points', 400)
            );
        }

        const userRewards = await prisma.userReward.findMany({
            where: {
                userId: id,
                rewardId
            }
        });

        if (userRewards.length >= 1) {
            await prisma.userReward.update({
                where: {
                    id: userRewards[0].id
                },
                data: {
                    count: {
                        increment: 1
                    }
                }
            });
        } else {
            await prisma.userReward.create({
                data: {
                    userId: id,
                    rewardId
                }
            });
        }

        await prisma.user.update({
            where: { id },
            data: {
                alltime_total_rewards_bought: {
                    increment: 1
                }
            }
        });

        return res.status(200).json(createResponse(null, 200));
    }
);
