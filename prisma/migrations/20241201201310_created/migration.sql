/*
  Warnings:

  - You are about to drop the `Central_Data_Schema` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Central_Data_array` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STATE', 'DISTRICT');

-- DropForeignKey
ALTER TABLE "Central_Data_Schema" DROP CONSTRAINT "Central_Data_Schema_centralDataArrayId_fkey";

-- DropTable
DROP TABLE "Central_Data_Schema";

-- DropTable
DROP TABLE "Central_Data_array";

-- CreateTable
CREATE TABLE "Central_Data" (
    "id" TEXT NOT NULL DEFAULT '00000',
    "state_ut" TEXT NOT NULL,
    "tehsil_block" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "well_site_type" TEXT NOT NULL,
    "water_level" DOUBLE PRECISION NOT NULL,
    "state_id" INTEGER NOT NULL,
    "district_id" INTEGER NOT NULL,

    CONSTRAINT "Central_Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
