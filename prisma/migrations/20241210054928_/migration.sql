/*
  Warnings:

  - The primary key for the `Central_Data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Central_Data` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Central_Data" DROP CONSTRAINT "Central_Data_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Central_Data_pkey" PRIMARY KEY ("id");
