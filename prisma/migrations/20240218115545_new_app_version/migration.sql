/*
  Warnings:

  - You are about to drop the column `donated_to` on the `Donation` table. All the data in the column will be lost.
  - Added the required column `donated_to_id` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "donated_to",
ADD COLUMN     "donated_to_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "alltime_been_ranked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "alltime_been_top_three" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "alltime_total_points" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "alltime_total_rewards_bought" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "donated_to_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "featured_photo" TEXT,
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReward" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "rewardId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserReward_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donated_to_id_fkey" FOREIGN KEY ("donated_to_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReward" ADD CONSTRAINT "UserReward_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReward" ADD CONSTRAINT "UserReward_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
