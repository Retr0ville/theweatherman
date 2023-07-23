import { ITopCity } from "../interfaces/ITopCities";
import { IWeatherConditionIcons } from "../interfaces/IWeatherConditionIcons";
import { importAllIcons } from "./functions";

const weatherIcons = process.env.NODE_ENV === "test" ? {} :  importAllIcons(
  require.context("../assets/images/weather", true, /\.png/)
);

export const localStorageKeys = {
  lastErrorLog: "lEl",
  hasLocationPermission: "hLp",
  hasSetInitialTopCities: "hSit",
  topCities: "tCi",
  favorites: "fVr",
  notes: "nTs",
  weatherCache: "wTch",
  userLocation: "uLoc"
};

export const pageurl = {
  HOMEPAGE: "/",
  WEATHER_DETAIL: "weather",
};

// https://en.wikipedia.org/wiki/List_of_largest_cities
export const topCitiesLocationCoords: ITopCity[] = [
  {
    name: "Tokyo, Japan",
    coord: "35.69,139.69",
  },
  {
    name: "Delhi, India",
    coord: "28.67,77.22",
  },
  {
    name: "Shanghai, China",
    coord: "31.01,121.41",
  },
  {
    name: "Sao Paulo, Brazil",
    coord: "-23.53,-46.62",
  },
  {
    name: "Mexico City, Mexico",
    coord: "19.43,-99.13",
  },
  {
    name: "Cairo, Egypt",
    coord: "30.05,31.25",
  },
  {
    name: "Mumbai, India",
    coord: "18.98,72.83",
  },
  {
    name: "Beijing, China",
    coord: "39.93,116.39",
  },
  {
    name: "Dhaka, Bangladesh",
    coord: "23.72,90.41",
  },
  {
    name: "Osaka, Japan",
    coord: "34.69,135.5",
  },
  {
    name: "New York, United States",
    coord: "40.71,-74.01",
  },
  {
    name: "Karachi, Pakistan",
    coord: "24.87, 67.05",
  },
  {
    name: "Buenos Aires, Argentina",
    coord: "-34.59,-58.67",
  },
  {
    name: "Chongqing, China",
    coord: "29.56,106.55",
  },
  {
    name: "Istanbul, Turkey",
    coord: "41.02,28.96",
  },
];

// https://www.weatherapi.com/docs/weather_conditions.xml
export const weatherConditionCodesMappedToIcons: IWeatherConditionIcons[] = [
  {
    code: 1000,
    day: weatherIcons["26.png"],
    night: weatherIcons["10.png"],
  },
  {
    code: 1003,
    day: weatherIcons["27.png"],
    night: weatherIcons["31.png"],
  },
  {
    code: 1006,
    day: weatherIcons["27.png"],
    night: weatherIcons["15.png"],
  },
  {
    code: 1009,
    day: weatherIcons["35.png"],
    night: weatherIcons["32.png"],
  },
  {
    code: 1030,
    day: weatherIcons["4.png"],
    night: weatherIcons["41.png"],
  },
  {
    code: 1063,
    day: weatherIcons["8.png"],
    night: weatherIcons["1.png"],
  },
  {
    code: 1066,
    day: weatherIcons["18.png"],
    night: weatherIcons["40.png"],
  },
  {
    code: 1069,
    day: weatherIcons["22.png"],
    night: weatherIcons["21.png"],
  },
  {
    code: 1072,
    day: weatherIcons["17.png"],
    night: weatherIcons["7.png"],
  },
  {
    code: 1087,
    day: weatherIcons["16.png"],
    night: weatherIcons["11.png"],
  },
  {
    code: 1114,
    day: weatherIcons["25.png"],
    night: weatherIcons["23.png"],
  },
  {
    code: 1117,
    day: weatherIcons["29.png"],
    night: weatherIcons["29.png"],
  },
  {
    code: 1135,
    day: weatherIcons["35.png"],
    night: weatherIcons["32.png"],
  },
  {
    code: 1147,
    day: weatherIcons["35.png"],
    night: weatherIcons["32.png"],
  },
  {
    code: 1150,
    day: weatherIcons["16.png"],
    night: weatherIcons["2.1.png"],
  },
  {
    code: 1153,
    day: weatherIcons["7.png"],
    night: weatherIcons["7.png"],
  },
  {
    code: 1168,
    day: weatherIcons["22.png"],
    night: weatherIcons["22.png"],
  },
  {
    code: 1171,
    day: weatherIcons["24.png"],
    night: weatherIcons["24.png"],
  },
  {
    code: 1180,
    day: weatherIcons["8.png"],
    night: weatherIcons["2.1.png"],
  },
  {
    code: 1183,
    day: weatherIcons["13.png"],
    night: weatherIcons["2.png"],
  },
  {
    code: 1186,
    day: weatherIcons["8.png"],
    night: weatherIcons["1.png"],
  },
  {
    code: 1189,
    day: weatherIcons["13.png"],
    night: weatherIcons["2.1.png"],
  },
  {
    code: 1192,
    day: weatherIcons["17.png"],
    night: weatherIcons["17.png"],
  },
  {
    code: 1195,
    day: weatherIcons["17.png"],
    night: weatherIcons["17.png"],
  },
  {
    code: 1198,
    day: weatherIcons["22.png"],
    night: weatherIcons["21.png"],
  },
  {
    code: 1201,
    day: weatherIcons["24.png"],
    night: weatherIcons["24.png"],
  },
  {
    code: 1204,
    day: weatherIcons["23.png"],
    night: weatherIcons["23.png"],
  },
  {
    code: 1207,
    day: weatherIcons["29.png"],
    night: weatherIcons["29.png"],
  },
  {
    code: 1210,
    day: weatherIcons["18.png"],
    night: weatherIcons["40.png"],
  },
  {
    code: 1213,
    day: weatherIcons["23.png"],
    night: weatherIcons["40.png"],
  },
  {
    code: 1216,
    day: weatherIcons["25.png"],
    night: weatherIcons["19.png"],
  },
  {
    code: 1219,
    day: weatherIcons["28.png"],
    night: weatherIcons["19.png"],
  },
  {
    code: 1222,
    day: weatherIcons["29.png"],
    night: weatherIcons["29.png"],
  },
  {
    code: 1225,
    day: weatherIcons["29.png"],
    night: weatherIcons["29.png"],
  },
  {
    code: 1237,
    day: weatherIcons["22.png"],
    night: weatherIcons["3.png"],
  },
  {
    code: 1240,
    day: weatherIcons["13.png"],
    night: weatherIcons["2.1.png"],
  },
  {
    code: 1243,
    day: weatherIcons["30.png"],
    night: weatherIcons["2.png"],
  },
  {
    code: 1246,
    day: weatherIcons["17.png"],
    night: weatherIcons["17.png"],
  },
  {
    code: 1249,
    day: weatherIcons["22.png"],
    night: weatherIcons["19.png"],
  },
  {
    code: 1252,
    day: weatherIcons["24.png"],
    night: weatherIcons["21.png"],
  },
  {
    code: 1255,
    day: weatherIcons["18.png"],
    night: weatherIcons["19.png"],
  },
  {
    code: 1258,
    day: weatherIcons["28.png"],
    night: weatherIcons["21.png"],
  },
  {
    code: 1261,
    day: weatherIcons["22.png"],
    night: weatherIcons["3.png"],
  },
  {
    code: 1264,
    day: weatherIcons["24.png"],
    night: weatherIcons["22.png"],
  },
  {
    code: 1273,
    day: weatherIcons["30.png"],
    night: weatherIcons["17.png"],
  },
  {
    code: 1276,
    day: weatherIcons["17.png"],
    night: weatherIcons["17.png"],
  },
  {
    code: 1279,
    day: weatherIcons["25.png"],
    night: weatherIcons["25.png"],
  },
  {
    code: 1282,
    day: weatherIcons["28.png"],
    night: weatherIcons["28.png"],
  },
];
