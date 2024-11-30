-- CreateTable
CREATE TABLE "Central_data" (
    "id" TEXT NOT NULL DEFAULT '00000',
    "state_ut" TEXT NOT NULL,
    "tehsil_block" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "well_site_type" TEXT NOT NULL,
    "water_level" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Central_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device_data" (
    "id" TEXT NOT NULL DEFAULT '00000',
    "date" TEXT NOT NULL,
    "battery_voltage" DOUBLE PRECISION NOT NULL,
    "water_level" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Device_data_pkey" PRIMARY KEY ("id")
);
