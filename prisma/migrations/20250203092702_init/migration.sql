-- CreateTable
CREATE TABLE "Session" (
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

    CONSTRAINT "Session_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Sport" (
    "sport_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sport_pkey" PRIMARY KEY ("sport_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_sportSportId_fkey" FOREIGN KEY ("sportSportId") REFERENCES "Sport"("sport_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
