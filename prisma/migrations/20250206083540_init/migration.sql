-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'COACH', 'UTILISATEUR');

-- CreateTable
CREATE TABLE "sessions" (
    "session_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "session_date" TIMESTAMP(3) NOT NULL,
    "session_time" TIMESTAMP(3) NOT NULL,
    "places_remaining" INTEGER NOT NULL,
    "places_available" INTEGER NOT NULL,
    "is_full" BOOLEAN NOT NULL,
    "sportSportId" INTEGER,
    "userUserId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'UTILISATEUR',
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "sports" (
    "sport_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sports_pkey" PRIMARY KEY ("sport_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_sportSportId_fkey" FOREIGN KEY ("sportSportId") REFERENCES "sports"("sport_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
