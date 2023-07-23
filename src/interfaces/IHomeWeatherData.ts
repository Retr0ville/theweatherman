import { IWeather } from "./IWeather";

export interface IHomeWeatherData {
  favouritesWeather: IWeather[];
  largestCitiesWeather: IWeather[];
}
