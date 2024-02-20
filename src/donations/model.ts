import { Donation, Organization, User } from "@prisma/client";
import prisma from "../util/db";
import { UserModel, userModelFromPrisma } from "../users/model";

export interface DonationModel {
    id: number;
    donatedTo: Organization;
    donatedAmount: Number;
    points: Number;
    date: String;
    timestamp: String;
    user: UserModel;
}

const dateTimestamp = (date: Date): String => {
    let h = String(date.getHours()).padStart(2, '0');
    let m = String(date.getMinutes()).padStart(2, '0');

    return `${h}:${m}`;
};

export const donationModelFromPrisma = async (prismaModel: Donation): Promise<DonationModel> => {
    const user = await prisma.user.findUnique({
        where: { id: prismaModel.userId }
    });

    return {
        id: prismaModel.id,
        donatedTo: (await prisma.organization.findUnique({ where: { id: prismaModel.donated_to_id } }))!,
        donatedAmount: prismaModel.donated_amount,
        points: prismaModel.points,
        date: prismaModel.created_at.toDateString(),
        timestamp: dateTimestamp(prismaModel.created_at),
        user: await userModelFromPrisma(user!!)
    };
};