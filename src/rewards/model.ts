import { Reward } from "@prisma/client";

export interface RewardModel {
    id: number;
    name: String;
    description: String;
    photo: String;
    price: Number;
}

export const rewardModelFromPrisma = async (prismaModel: Reward): Promise<RewardModel> => {
    return {
        id: prismaModel.id,
        name: prismaModel.name,
        description: prismaModel.description,
        photo: prismaModel.photo,
        price: prismaModel.price
    };
};