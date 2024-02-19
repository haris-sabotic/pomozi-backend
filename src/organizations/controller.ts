import { NextFunction, Request, Response } from 'express';
import catchAsync from "../util/catchAsync";
import { createResponse } from '../util/createResponse';
import prisma from '../util/db';

export const allOrganizations = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const organizations = await prisma.organization.findMany();

        return res.status(200).json(createResponse(organizations, 200));
    }
);
