import { User } from "@prisma/client";
import prisma from "../util/db";

export interface UserAchievements {
    one_year: Boolean,
    six_months: Boolean,
    hundred_donated: Boolean,
    fifty_donated: Boolean,
    ten_donated: Boolean,
    ten_donations: Boolean,
    first_donation: Boolean,
    ten_rewards_bought: Boolean,
    five_rewards_bought: Boolean,
    reward_bought: Boolean,
    hundred_points_acquired: Boolean,
    ranked: Boolean,
    account_created: Boolean,
    top_three: Boolean,
    hundred_donations: Boolean,
    fifty_donations: Boolean,
}

export interface UserModel {
    id: number;
    name: string;
    email: string;
    phone: string;
    about: string;
    photo: String;
    donatedAmount: Number;
    points: Number;

    achievements: UserAchievements;
}

export const userModelFromPrisma = async (prismaModel: User): Promise<UserModel> => {
    const now = new Date();

    const diff = Math.abs(now.getTime() - prismaModel.created_at.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));


    const donations = await prisma.donation.findMany({
        where: {
            userId: prismaModel.id
        }
    });

    return {
        id: prismaModel.id,
        name: prismaModel.name,
        email: prismaModel.email,
        phone: prismaModel.phone,
        about: prismaModel.about,
        photo: prismaModel.photo,
        donatedAmount: prismaModel.donated_amount,
        points: prismaModel.points,
        achievements: {
            one_year: diffDays >= 365,
            six_months: diffDays >= 365 / 2,
            hundred_donated: prismaModel.donated_amount >= 100,
            fifty_donated: prismaModel.donated_amount >= 50,
            ten_donated: prismaModel.donated_amount >= 10,
            ten_donations: donations.length >= 10,
            first_donation: donations.length >= 1,
            ten_rewards_bought: prismaModel.alltime_total_rewards_bought >= 10,
            five_rewards_bought: prismaModel.alltime_total_rewards_bought >= 5,
            reward_bought: prismaModel.alltime_total_rewards_bought >= 1,
            hundred_points_acquired: prismaModel.alltime_total_points >= 100,
            ranked: prismaModel.alltime_been_ranked,
            account_created: true,
            top_three: prismaModel.alltime_been_top_three,
            hundred_donations: donations.length >= 100,
            fifty_donations: donations.length >= 100,
        }
    };
};