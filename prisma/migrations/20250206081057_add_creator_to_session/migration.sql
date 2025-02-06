-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_creator_id_fkey";

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "creator_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
