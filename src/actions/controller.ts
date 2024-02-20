import { NextFunction, Request, Response } from 'express';
import catchAsync from "../util/catchAsync";
import { createResponse } from '../util/createResponse';
import prisma from '../util/db';

export const allActions = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const actions = await prisma.action.findMany();

        return res.status(200).json(createResponse(actions, 200));
    }
);
