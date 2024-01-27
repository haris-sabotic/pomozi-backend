import { User } from "@prisma/client";

export interface UserModel {
    id: number;
    name: string;
    email: string;
    phone: string;
    about: string;
    photo: String;
    donatedAmount: Number;
    points: Number;

}

export const userModelFromPrisma = async (prismaModel: User): Promise<UserModel> => {
    return {
        id: prismaModel.id,
        name: prismaModel.name,
        email: prismaModel.email,
        phone: prismaModel.phone,
        about: prismaModel.about,
        photo: prismaModel.photo,
        donatedAmount: prismaModel.donated_amount,
        points: prismaModel.points,
    };
};