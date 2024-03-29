export const OPEN_METEO_API_URL = "https://api.open-meteo.com/v1/forecast";
export const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
export const LS_KEY_HISTORY_HI = "heat_index_history";

export type HourlyWeatherVariablesType = "temperature_2m" | "relative_humidity_2m" | "dew_point_2m" | "apparent_temperature" | "precipitation_probability" | "precipitation" | "rain" | "showers" | "snowfall" | "snow_depth" | "weather_code" | "pressure_msl" | "surface_pressure" | "cloud_cover" | "cloud_cover_low" | "cloud_cover_mid" | "cloud_cover_high" | "visibility" | "evapotranspiration" | "et0_fao_evapotranspiration" | "vapour_pressure_deficit" | "wind_speed_10m" | "wind_speed_80m" | "wind_speed_120m" | "wind_speed_180m" | "wind_direction_10m" | "wind_direction_80m" | "wind_direction_120m" | "wind_direction_180m" | "wind_gusts_10m" | "temperature_80m" | "temperature_120m" | "temperature_180m" | "soil_temperature_0cm" | "soil_temperature_6cm" | "soil_temperature_18cm" | "soil_temperature_54cm" | "soil_moisture_0_to_1cm" | "soil_moisture_1_to_3cm" | "soil_moisture_3_to_9cm" | "soil_moisture_9_to_27cm" | "soil_moisture_27_to_81cm";
export type TemperatureUnitsType = "fahrenheit" | "celsius";

export const TemperatureUnits: [TemperatureUnitsType, string, string][] = [['celsius', 'Celsius', '°C'], ['fahrenheit', 'Fahrenheit', '°F']];
export const HourlWeatherVariables = ["temperature_2m", "relative_humidity_2m", "dew_point_2m", "apparent_temperature", "precipitation_probability", "precipitation", "rain", "showers", "snowfall", "snow_depth", "weather_code", "pressure_msl", "surface_pressure", "cloud_cover", "cloud_cover_low", "cloud_cover_mid", "cloud_cover_high", "visibility", "evapotranspiration", "et0_fao_evapotranspiration", "vapour_pressure_deficit", "wind_speed_10m", "wind_speed_80m", "wind_speed_120m", "wind_speed_180m", "wind_direction_10m", "wind_direction_80m", "wind_direction_120m", "wind_direction_180m", "wind_gusts_10m", "temperature_80m", "temperature_120m", "temperature_180m", "soil_temperature_0cm", "soil_temperature_6cm", "soil_temperature_18cm", "soil_temperature_54cm", "soil_moisture_0_to_1cm", "soil_moisture_1_to_3cm", "soil_moisture_3_to_9cm", "soil_moisture_9_to_27cm", "soil_moisture_27_to_81cm"] as const;

export type GeocodingType = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    admin1?: string;
    admin2?: string;
};

export type GeocodingSearchType = {
    results: GeocodingType[];
};

export type SearchParameters = {
    hourly?: HourlyWeatherVariablesType[];
    temperature_unit?: TemperatureUnitsType;
    start_date?: string;
    end_date?: string;
};

export type RelativeHumidityResult = {
    value: number;
    unit: TemperatureUnitsType;
    date: number;
};

type HourlyWeatherVariablesDataType = Record<HourlyWeatherVariablesType, number[]> & Record<"time", string[]>;
type HourlyWeatherVariablesUnitsType = Record<HourlyWeatherVariablesType, string> & Record<"time", string>;

export type OpenMeteoDataStructureType = {
    hourly: HourlyWeatherVariablesDataType;
    hourly_units: HourlyWeatherVariablesUnitsType;
};

