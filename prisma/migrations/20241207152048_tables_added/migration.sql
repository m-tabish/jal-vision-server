/*
  Warnings:

  - The values [NO_DATA,ANOMALY] on the enum `AlertType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AlertType_new" AS ENUM ('HIGH_WATER_LEVEL', 'LOW_WATER_LEVEL', 'SENSOR_FAILURE', 'BATTERY_LOW');
ALTER TABLE "Alert" ALTER COLUMN "alertType" TYPE "AlertType_new" USING ("alertType"::text::"AlertType_new");
ALTER TYPE "AlertType" RENAME TO "AlertType_old";
ALTER TYPE "AlertType_new" RENAME TO "AlertType";
DROP TYPE "AlertType_old";
COMMIT;
