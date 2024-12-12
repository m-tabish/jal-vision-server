interface Well {
	name: string;
	currentDepth: number; // Negative value
	thresholdDepth: number; // Negative value
	dwlrDepth: number; // Negative value
	state: string;
	district: string;
	tehsil: string;
	block: string;
	village: string;
	latitude: number;
	longitude: number;
	dateTime: string; // ISO 8601 format
	batteryVoltage: number; // Voltage in volts
	lastRecordedDepth?: number; // Last recorded depth
	lastRecordedTime?: string; // Last recorded time in ISO 8601 format
	waterTemperature?: number; // Temperature in degrees Celsius
	telemetryUID?: string; // Unique telemetry identifier
}

class Logger {
	static log(message: string): void {
		console.log(message);
	}

	static warn(message: string): void {
		console.warn(message);
	}

	static error(message: string): void {
		console.error(message);
	}

	static anomaly(message: string): void {
		console.error(`Anomaly: ${message}`);
	}
}

class Config {
	static thresholdMargin: number = 2;
	static variationMargin: number = 2; // Variation margin for water level
	static lowBatteryThreshold: number = 1; // Low battery threshold
}

class WellDepthChecker {
    static checkDepths(wells: Well[]): void {
        wells.forEach((well) => {
            this.checkDwlrDepth(well);
            this.checkBatteryLevel(well);
            this.checkWaterLevelVariation(well);
        });
    }

    private static checkDwlrDepth(well: Well): void {
        const {
            name,
            currentDepth,
            dwlrDepth,
            thresholdDepth,
            state,
            district,
            tehsil,
            block,
            village,
            latitude,
            longitude,
            dateTime,
            batteryVoltage,
            telemetryUID,
        } = well;

        if (Math.abs(currentDepth) >= Math.abs(dwlrDepth)) {
            if (Math.abs(currentDepth) > Math.abs(thresholdDepth)) {
                Logger.error(
                    `Alert! The current depth of well "${name}" is ${currentDepth} meters, which exceeds the threshold depth of ${thresholdDepth} meters.\n` +
                    `[Telemetry UID: ${telemetryUID}, State: ${state}, District: ${district}, Tehsil: ${tehsil}, Block: ${block}, Village: ${village},\n` +
                    `Latitude: ${latitude}, Longitude: ${longitude}, Date & Time: ${dateTime}, Battery: ${batteryVoltage}V]`
                );
            } else {
                Logger.error(
                    `Alarm! The current depth of well "${name}" is ${currentDepth} meters, which exceeds the DWLR depth of ${dwlrDepth} meters but not the threshold depth of ${thresholdDepth} meters.\n` +
                    `[Telemetry UID: ${telemetryUID}, State: ${state}, District: ${district}, Tehsil: ${tehsil}, Block: ${block}, Village: ${village},\n` +
                    `Latitude: ${latitude}, Longitude: ${longitude}, Date & Time: ${dateTime}, Battery: ${batteryVoltage}V]`
                );
            }
        } else {
            Logger.log(
                `The current depth of well "${name}" is ${currentDepth} meters, which is less than the DWLR depth of ${dwlrDepth} meters.\n` +
                `[Telemetry UID: ${telemetryUID}, State: ${state}, District: ${district}, Tehsil: ${tehsil}, Block: ${block}, Village: ${village},\n` +
                `Latitude: ${latitude}, Longitude: ${longitude}, Date & Time: ${dateTime}, Battery: ${batteryVoltage}V]`
            );
        }
    }

    private static checkBatteryLevel(well: Well): void {
        const {
            name,
            batteryVoltage,
            state,
            district,
            tehsil,
            block,
            village,
            latitude,
            longitude,
            dateTime,
            telemetryUID,
        } = well;

        if (batteryVoltage < Config.lowBatteryThreshold) {
            Logger.error(
                `Low Battery Level for well "${name}" at ${dateTime}.\n` +
                `[Telemetry UID: ${telemetryUID}, State: ${state}, District: ${district}, Tehsil: ${tehsil}, Block: ${block}, Village: ${village},\n` +
                `Latitude: ${latitude}, Longitude: ${longitude}, Battery: ${batteryVoltage}V]`
            );
        }
    }

    private static checkWaterLevelVariation(well: Well): void {
        const {
            name,
            currentDepth,
            lastRecordedDepth,
            state,
            district,
            tehsil,
            block,
            village,
            latitude,
            longitude,
            dateTime,
            lastRecordedTime,
            telemetryUID,
        } = well;

        if (lastRecordedDepth !== undefined && lastRecordedTime !== undefined) {
            const timeDifference =
                new Date(dateTime).getTime() - new Date(lastRecordedTime).getTime();
            const hoursDifference = timeDifference / (1000 * 3600);

            if (hoursDifference > 6) {
                const variation = Math.abs(currentDepth - lastRecordedDepth);
                if (variation > Config.variationMargin) {
                    Logger.anomaly(
                        `Too Large Variation for well "${name}". Variation: ${variation} meters.\n` +
                        `[Telemetry UID: ${telemetryUID}, State: ${state}, District: ${district}, Tehsil: ${tehsil}, Block: ${block}, Village: ${village},\n` +
                        `Latitude: ${latitude}, Longitude: ${longitude}, Date & Time: ${dateTime}]`
                    );
                }
            }
        }
    }
}

var wells: Well[] = [
	{
		name: "Well 1",
		currentDepth: -15,
		thresholdDepth: -20,
		dwlrDepth: -16,
		state: "Madhya Pradesh",
		district: "Agarmalwa",
		tehsil: "Susner",
		block: "Susner",
		village: "Soyat(Deep)",
		latitude: 24.1472,
		longitude: 76.1603,
		dateTime: "2023-10-05T14:48:00Z",
		batteryVoltage: 0.5,
		lastRecordedDepth: -14,
		lastRecordedTime: "2023-10-05T08:48:00Z",
		waterTemperature: 28.57,
		telemetryUID: "CGWKOL0166",
	},
	{
		name: "Well 2",
		currentDepth: -25,
		thresholdDepth: -20,
		dwlrDepth: -16,
		state: "Madhya Pradesh",
		district: "Agarmalwa",
		tehsil: "Susner",
		block: "Susner",
		village: "Soyat(Deep)",
		latitude: 24.1472,
		longitude: 76.1603,
		dateTime: "2023-10-05T14:48:00Z",
		batteryVoltage: 3.5,
		lastRecordedDepth: -24,
		lastRecordedTime: "2023-10-05T08:48:00Z",
		waterTemperature: 28.51,
		telemetryUID: "CGWKOL0166",
	},

	{
		name: "Well 3",
		currentDepth: -13,
		thresholdDepth: -15,
		dwlrDepth: -12,
		state: "Madhya Pradesh",
		district: "Agarmalwa",
		tehsil: "Susner",
		block: "Susner",
		village: "Soyat(Deep)",
		latitude: 24.1472,
		longitude: 76.1603,
		dateTime: "2023-10-05T14 :48 :00Z",
		batteryVoltage: 3.9,
		lastRecordedDepth: -11,
		lastRecordedTime: "2023-10-05T08 :48 :00Z",
		waterTemperature: 26.99,
		telemetryUID: "CGWKOL0166",
	},

	{
		name: "Well 4",
		currentDepth: -30,
		thresholdDepth: -25,
		dwlrDepth: -20,
		state: "Madhya Pradesh",
		district: "Agarmalwa",
		tehsil: "Susner",
		block: "Susner",
		village: "Soyat(Deep)",
		latitude: 24.1472,
		longitude: 76.1603,
		dateTime: "2023-10-05T14 :48 :00Z",
		batteryVoltage: 3.8,
		lastRecordedDepth: -29,
		lastRecordedTime: "2023-10-05T08 :48 :00Z",
		waterTemperature: 27.03,
		telemetryUID: "CGWKOL0166",
	},

	{
		name: "Well 5",
		currentDepth: -10,
		thresholdDepth: -15,
		dwlrDepth: -12,
		state: "Madhya Pradesh",
		district: "Agarmalwa",
		tehsil: "Susner",
		block: "Susner",
		village: "Soyat(Deep)",
		latitude: 24.1472,
		longitude: 76.1603,
		dateTime: "2023-10-05T14 :48 :00Z",
		batteryVoltage: 3.56,
		lastRecordedDepth: -11,
		lastRecordedTime: "2023-10-05T08 :48 :00Z",
		telemetryUID: "CGWKOL0166",
	},

	{
		name: "Well 6",
		currentDepth: -30,
		thresholdDepth: -25,
		dwlrDepth: -20,
		state: "Madhya Pradesh",
		district: "Agarmalwa",
		tehsil: "Susner",
		block: "Susner",
		village: "Soyat(Deep)",
		latitude: 24.1472,
		longitude: 76.1603,
		dateTime: "2023-10-05T14 :48 :00Z",
		batteryVoltage: 3.5,
		lastRecordedDepth: -29,
		lastRecordedTime: "2023-10-05T08 :48 :00Z",
		telemetryUID: "CGWKOL0166",
	},

	{
		name: "Well7",
		currentDepth: -10,
		thresholdDepth: -15,
		dwlrDepth: -12,
		state: "Madhya Pradesh",
		district: "Agarmalwa",
		tehsil: "Susner",
		block: "Susner",
		village: "Soyat(Deep)",
		latitude: 24.1472,
		longitude: 76.1603,
		dateTime: "2023-10-05T14 :48 :00Z",
		batteryVoltage: 3.45,
		lastRecordedDepth: -11,
		lastRecordedTime: "2023-10-05T08 :48 :00Z",
		telemetryUID: "CGWKOL0166",
	},

	{
		name: "Well8",
		currentDepth: -30,
		thresholdDepth: -25,
		dwlrDepth: -20,
		state: "Madhya Pradesh",
		district: "Agarmalwa",
		tehsil: "Susner",
		block: "Susner",
		village: "Soyat(Deep)",
		latitude: 24.1472,
		longitude: 76.1603,
		dateTime: "2023-10-05T14 :48 :00Z",
		batteryVoltage: 3.2,
		lastRecordedDepth: -29,
		lastRecordedTime: "2023-10-05T08 :48 :00Z",
		waterTemperature: 28.57,
		telemetryUID: "CGWKOL0166",
	},

	{
		name: "Well9",
		currentDepth: -10,
		thresholdDepth: -15,
		dwlrDepth: -12,
		state: "Madhya Pradesh",
		district: "Agarmalwa",
		tehsil: "Susner",
		block: "Susner",
		village: "Soyat(Deep)",
		latitude: 24.1472,
		longitude: 76.1603,
		dateTime: "2023-10-05T14 :48 :00Z",
		batteryVoltage: 3.5,
		lastRecordedDepth: -11,
		lastRecordedTime: "2023-10-05T08 :48 :00Z",
		waterTemperature: 26.99,
		telemetryUID: "CGWKOL0166",
	},

	{
		name: "Well10",
		currentDepth: -30,
		thresholdDepth: -25,
		dwlrDepth: -20,
		state: "Madhya Pradesh",
		district: "Agarmalwa",
		tehsil: "Susner",
		block: "Susner",
		village: "Soyat(Deep)",
		latitude: 24.1472,
		longitude: 76.1603,
		dateTime: "2023-10-05T14 :48 :00Z",
		batteryVoltage: 3.5,
		lastRecordedDepth: -29,
		lastRecordedTime: "2023-10-05T08 :48 :00Z",
		waterTemperature: 27.03,
		telemetryUID: "CGWKOL0166",
	},
];

WellDepthChecker.checkDepths(wells);
