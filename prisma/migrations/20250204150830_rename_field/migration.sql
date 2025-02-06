/*
  Warnings:

  - You are about to drop the column `sportSportId` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `userUserId` on the `sessions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_sportSportId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userUserId_fkey";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "sportSportId",
DROP COLUMN "userUserId",
ADD COLUMN     "sport_id" INTEGER,
ADD COLUMN     "user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "sports"("sport_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
