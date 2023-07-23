import { AxiosError } from "axios";
import { IWeather } from "../interfaces/IWeather";
import {
  getWeatherFromCache,
  logError,
  updateWeatherCache,
} from "../utils/functions";
import { get } from "../utils/http-client";

export const getWeather = async (location: string) => {
  return new Promise<IWeather>((resolve, reject) => {
    get<IWeather>({ q: location })
      .then((response) => {
        const apiWeather = response.data;

        updateWeatherCache(apiWeather, `${apiWeather.location?.lat},${apiWeather.location?.lat}`);

        resolve(apiWeather);
      })
      .catch((err: AxiosError) => {
        logError(err);

        const cachedWeather = getWeatherFromCache(location);
        if (cachedWeather) {
          resolve(cachedWeather);
        }

        // error code 1006, means no weather found for this location
        if((err.response?.data as {error : {code: number}})?.error?.code === 1006) {
          
        // call reject to trigger the correct error boundary
          reject({});
        }

        reject({});
      });
  });
};
