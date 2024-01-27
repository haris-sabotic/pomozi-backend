import { User } from "@prisma/client";
import prisma from "../util/db";
import { hashPassword } from './util';
import CustomError from "../util/customError";

interface CreateUserResult {
    success: boolean,
    data: User | null,
    error: Error | null;
}

export const createUser = async (body: any): Promise<CreateUserResult> => {
    const { name, email, password } = body;

    if (!name || !email || !password) {
        return {
            success: false,
            data: null,
            error: new CustomError(
                'Please provide name, email and password',
                400
            )
        };
    }

    const userWithSameEmail = await prisma.user.findUnique({
        where: { email },
    });
    if (userWithSameEmail) {
        return {
            success: false,
            data: null,
            error: new CustomError(
                'User with same email already exists',
                401
            )
        };
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: await hashPassword(password),
        },
    });

    return {
        success: true,
        data: user,
        error: null
    };
};