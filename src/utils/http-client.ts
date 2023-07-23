import axios, { AxiosPromise } from "axios";

export const get = <T>(params?: Record<string, string>): AxiosPromise<T> => {
  const { REACT_APP_BASEAPI_URL = "" } = process.env;
  const { REACT_APP_WEATHER_APIKEY = "" } = process.env;

  return axios({
    method: "get",
    url: REACT_APP_BASEAPI_URL,
    params: {
      key: REACT_APP_WEATHER_APIKEY,
      ...params,
    },
  });
};
