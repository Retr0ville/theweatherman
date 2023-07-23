import { ITopCity } from "../../interfaces/ITopCities";
import { getWeather } from "../../services/weather";
import { localStorageKeys, topCitiesLocationCoords } from "../../utils/constants";
import { localstorageGet } from "../../utils/local-storage-helpers";
import { IHomeWeatherData } from "../../interfaces/IHomeWeatherData";

export const homeLoader = async () => {
  let homeWeatherData = {} as IHomeWeatherData;

  const locStorageFavorites = localstorageGet<string[]>(
    localStorageKeys.favorites,
    { isObject: true }
  ) as string[];

  const locStorageTopCities = localstorageGet<ITopCity[]>(
    localStorageKeys.topCities,
    { isObject: true }
  ) as ITopCity[];

  if (locStorageFavorites?.length) {
    const favouriteWeathers = await Promise.all(
      locStorageFavorites.map(async (fav) => await getWeather(fav))
    );

    homeWeatherData.favouritesWeather = favouriteWeathers;
  }

  if (!!localstorageGet(localStorageKeys.hasSetInitialTopCities) &&locStorageTopCities?.length) {
    const topCityWeathers = await Promise.all(
      locStorageTopCities.map(async (city) => await getWeather(city.coord))
    );

    homeWeatherData.largestCitiesWeather = topCityWeathers;
  }

  if (!localstorageGet(localStorageKeys.hasSetInitialTopCities)) {
    const topCityWeathers = await Promise.all(
      topCitiesLocationCoords.map(async (city) => await getWeather(city.coord))
    );

    homeWeatherData.largestCitiesWeather = topCityWeathers;
  }
  return homeWeatherData
};
