import { NextFunction, Request, Response } from 'express';
import catchAsync from "../util/catchAsync";
import { createResponse } from '../util/createResponse';
import prisma from '../util/db';
import { Organization } from '@prisma/client';
import CustomError from '../util/customError';

export const allOrganizations = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const query = req.query.query;

        let organizations: Organization[] = [];

        if (query) {
            if (typeof query != "string") {
                return next(
                    new CustomError('query must be a string', 400)
                );
            }

            organizations = await prisma.organization.findMany({
                where: {
                    name: {
                        contains: query,
                        mode: 'insensitive'
                    }
                }
            });
        } else {
            organizations = await prisma.organization.findMany();
        }

        return res.status(200).json(createResponse(organizations, 200));
    }
);
