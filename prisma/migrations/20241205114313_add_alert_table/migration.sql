-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('NO_DATA', 'ANOMALY', 'BATTERY_LOW');

-- CreateTable
CREATE TABLE "Alert" (
    "id" SERIAL NOT NULL,
    "state" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "tehsilBlock" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "villageName" TEXT NOT NULL,
    "siteName" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "wellSiteType" TEXT NOT NULL,
    "waterLevel" DOUBLE PRECISION,
    "alertType" "AlertType" NOT NULL,
    "alertMessage" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);
