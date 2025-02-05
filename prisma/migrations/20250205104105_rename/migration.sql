/*
  Warnings:

  - You are about to drop the column `lattitude` on the `sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "lattitude",
ADD COLUMN     "latitude" DOUBLE PRECISION;
