import { Donation, Organization, User } from "@prisma/client";
import prisma from "../util/db";
import { UserModel, userModelFromPrisma } from "../users/model";

export interface DonationModel {
    id: number;
    donatedTo: Organization;
    donatedAmount: Number;
    points: Number;
    date: String;
    user: UserModel;
}

export const donationModelFromPrisma = async (prismaModel: Donation): Promise<DonationModel> => {
    const user = await prisma.user.findUnique({
        where: { id: prismaModel.userId }
    });

    return {
        id: prismaModel.id,
        donatedTo: (await prisma.organization.findUnique({ where: { id: prismaModel.donated_to_id } }))!,
        donatedAmount: prismaModel.donated_amount,
        points: prismaModel.points,
        date: prismaModel.date,
        user: await userModelFromPrisma(user!!)
    };
};