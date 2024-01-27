import { Donation } from "@prisma/client";

export interface DonationModel {
    id: number;
    donatedTo: String;
    donatedAmount: Number;
    points: Number;
    date: String;
}

export const donationModelFromPrisma = async (prismaModel: Donation): Promise<DonationModel> => {
    return {
        id: prismaModel.id,
        donatedTo: prismaModel.donated_to,
        donatedAmount: prismaModel.donated_amount,
        points: prismaModel.points,
        date: prismaModel.date,
    };
};