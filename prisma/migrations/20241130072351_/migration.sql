/*
  Warnings:

  - You are about to drop the column `central_dataId` on the `Central_Data_Schema` table. All the data in the column will be lost.
  - You are about to drop the `Central_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Central_Data_Schema" DROP CONSTRAINT "Central_Data_Schema_central_dataId_fkey";

-- AlterTable
ALTER TABLE "Central_Data_Schema" DROP COLUMN "central_dataId",
ADD COLUMN     "centralDataArrayId" TEXT;

-- DropTable
DROP TABLE "Central_data";

-- CreateTable
CREATE TABLE "Central_Data_array" (
    "id" TEXT NOT NULL DEFAULT '00000',

    CONSTRAINT "Central_Data_array_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Central_Data_Schema" ADD CONSTRAINT "Central_Data_Schema_centralDataArrayId_fkey" FOREIGN KEY ("centralDataArrayId") REFERENCES "Central_Data_array"("id") ON DELETE SET NULL ON UPDATE CASCADE;
