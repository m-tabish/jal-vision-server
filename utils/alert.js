var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.log = function (message) {
        console.log(message);
    };
    Logger.warn = function (message) {
        console.warn(message);
    };
    Logger.error = function (message) {
        console.error(message);
    };
    Logger.anomaly = function (message) {
        console.error("Anomaly: ".concat(message));
    };
    return Logger;
}());
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.thresholdMargin = 2;
    Config.variationMargin = 2; // Variation margin for water level
    Config.lowBatteryThreshold = 1; // Low battery threshold
    return Config;
}());
var WellDepthChecker = /** @class */ (function () {
    function WellDepthChecker() {
    }
    WellDepthChecker.checkDepths = function (wells) {
        var _this = this;
        wells.forEach(function (well) {
            _this.checkDwlrDepth(well);
            _this.checkBatteryLevel(well);
            _this.checkWaterLevelVariation(well);
        });
    };
    WellDepthChecker.checkDwlrDepth = function (well) {
        var name = well.name, currentDepth = well.currentDepth, dwlrDepth = well.dwlrDepth, thresholdDepth = well.thresholdDepth, state = well.state, district = well.district, tehsil = well.tehsil, block = well.block, village = well.village, latitude = well.latitude, longitude = well.longitude, dateTime = well.dateTime, batteryVoltage = well.batteryVoltage, telemetryUID = well.telemetryUID;
        if (Math.abs(currentDepth) >= Math.abs(dwlrDepth)) {
            if (Math.abs(currentDepth) > Math.abs(thresholdDepth)) {
                Logger.error("Alert! The current depth of well \"".concat(name, "\" is ").concat(currentDepth, " meters, which exceeds the threshold depth of ").concat(thresholdDepth, " meters.\n") +
                    "[Telemetry UID: ".concat(telemetryUID, ", State: ").concat(state, ", District: ").concat(district, ", Tehsil: ").concat(tehsil, ", Block: ").concat(block, ", Village: ").concat(village, ",\n") +
                    "Latitude: ".concat(latitude, ", Longitude: ").concat(longitude, ", Date & Time: ").concat(dateTime, ", Battery: ").concat(batteryVoltage, "V]"));
            }
            else {
                Logger.error("Alarm! The current depth of well \"".concat(name, "\" is ").concat(currentDepth, " meters, which exceeds the DWLR depth of ").concat(dwlrDepth, " meters but not the threshold depth of ").concat(thresholdDepth, " meters.\n") +
                    "[Telemetry UID: ".concat(telemetryUID, ", State: ").concat(state, ", District: ").concat(district, ", Tehsil: ").concat(tehsil, ", Block: ").concat(block, ", Village: ").concat(village, ",\n") +
                    "Latitude: ".concat(latitude, ", Longitude: ").concat(longitude, ", Date & Time: ").concat(dateTime, ", Battery: ").concat(batteryVoltage, "V]"));
            }
        }
        else {
            Logger.log("The current depth of well \"".concat(name, "\" is ").concat(currentDepth, " meters, which is less than the DWLR depth of ").concat(dwlrDepth, " meters.\n") +
                "[Telemetry UID: ".concat(telemetryUID, ", State: ").concat(state, ", District: ").concat(district, ", Tehsil: ").concat(tehsil, ", Block: ").concat(block, ", Village: ").concat(village, ",\n") +
                "Latitude: ".concat(latitude, ", Longitude: ").concat(longitude, ", Date & Time: ").concat(dateTime, ", Battery: ").concat(batteryVoltage, "V]"));
        }
    };
    WellDepthChecker.checkBatteryLevel = function (well) {
        var name = well.name, batteryVoltage = well.batteryVoltage, state = well.state, district = well.district, tehsil = well.tehsil, block = well.block, village = well.village, latitude = well.latitude, longitude = well.longitude, dateTime = well.dateTime, telemetryUID = well.telemetryUID;
        if (batteryVoltage < Config.lowBatteryThreshold) {
            Logger.error("Low Battery Level for well \"".concat(name, "\" at ").concat(dateTime, ".\n") +
                "[Telemetry UID: ".concat(telemetryUID, ", State: ").concat(state, ", District: ").concat(district, ", Tehsil: ").concat(tehsil, ", Block: ").concat(block, ", Village: ").concat(village, ",\n") +
                "Latitude: ".concat(latitude, ", Longitude: ").concat(longitude, ", Battery: ").concat(batteryVoltage, "V]"));
        }
    };
    WellDepthChecker.checkWaterLevelVariation = function (well) {
        var name = well.name, currentDepth = well.currentDepth, lastRecordedDepth = well.lastRecordedDepth, state = well.state, district = well.district, tehsil = well.tehsil, block = well.block, village = well.village, latitude = well.latitude, longitude = well.longitude, dateTime = well.dateTime, lastRecordedTime = well.lastRecordedTime, telemetryUID = well.telemetryUID;
        if (lastRecordedDepth !== undefined && lastRecordedTime !== undefined) {
            var timeDifference = new Date(dateTime).getTime() - new Date(lastRecordedTime).getTime();
            var hoursDifference = timeDifference / (1000 * 3600);
            if (hoursDifference > 6) {
                var variation = Math.abs(currentDepth - lastRecordedDepth);
                if (variation > Config.variationMargin) {
                    Logger.anomaly("Too Large Variation for well \"".concat(name, "\". Variation: ").concat(variation, " meters.\n") +
                        "[Telemetry UID: ".concat(telemetryUID, ", State: ").concat(state, ", District: ").concat(district, ", Tehsil: ").concat(tehsil, ", Block: ").concat(block, ", Village: ").concat(village, ",\n") +
                        "Latitude: ".concat(latitude, ", Longitude: ").concat(longitude, ", Date & Time: ").concat(dateTime, "]"));
                }
            }
        }
    };
    return WellDepthChecker;
}());
var wells = [
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
