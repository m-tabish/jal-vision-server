/*
  Warnings:

  - You are about to drop the column `latitude` on the `Central_data` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Central_data` table. All the data in the column will be lost.
  - You are about to drop the column `state_ut` on the `Central_data` table. All the data in the column will be lost.
  - You are about to drop the column `tehsil_block` on the `Central_data` table. All the data in the column will be lost.
  - You are about to drop the column `water_level` on the `Central_data` table. All the data in the column will be lost.
  - You are about to drop the column `well_site_type` on the `Central_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Central_data" DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "state_ut",
DROP COLUMN "tehsil_block",
DROP COLUMN "water_level",
DROP COLUMN "well_site_type";

-- CreateTable
CREATE TABLE "Central_Data_Schema" (
    "id" TEXT NOT NULL DEFAULT '00000',
    "state_ut" TEXT NOT NULL,
    "tehsil_block" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "well_site_type" TEXT NOT NULL,
    "water_level" DOUBLE PRECISION NOT NULL,
    "central_dataId" TEXT,

    CONSTRAINT "Central_Data_Schema_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Central_Data_Schema" ADD CONSTRAINT "Central_Data_Schema_central_dataId_fkey" FOREIGN KEY ("central_dataId") REFERENCES "Central_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;
