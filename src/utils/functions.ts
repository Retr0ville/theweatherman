import { enc, AES } from "crypto-js";
import {
  localStorageKeys,
  weatherConditionCodesMappedToIcons,
} from "./constants";
import { localstorageGet, localstorageSet } from "./local-storage-helpers";
import { IWeather } from "../interfaces/IWeather";
import { ICoords } from "../interfaces/ICoords";
import { INote } from "../interfaces/INote";
import { ITopCity } from "../interfaces/ITopCities";

const { REACT_APP_PASSPHRASE = "" } = process.env;

export function importAllIcons(r: __WebpackModuleApi.RequireContext) {
  let icons = {} as Record<string, string>;
  r.keys().forEach((item) => {
    icons[item.replace(/\.\/(night|day|cloud)\//g, "")] = r(item);
  });
  return icons;
}

export const getDayandTime = () => {

  const date = Date();

  /**
   * returns current date by default
   * 
   */
  const todaysDate =(weather?: IWeather)=> !weather?.location ? `${date.split(" ")[0]} ${date.split(" ")[1]} ${
    date.split(" ")[2]
  },${date.split(" ")[3]}` : new Date(weather.location.localtime.split(" ")[0])
  .toDateString();

  const today = `${date.split(" ")[1]} ${date.split(" ")[2]}, ${
    date.split(" ")[3]
  }`;

  
  /**
   * returns current day by default
   * 
   */
  const day = (weather?: IWeather) =>
    !weather?.location
      ? `${date.split(" ")[0]}`
      : new Date(weather.location.localtime.split(" ")[0])
          .toDateString()
          .split(" ")[0];
  const time = Date().split(" ")[4];
  const hourOfDay = time.split(":")[0];

  
  /**
   * returns day status for current day by default
   * 
   */
  const isDay = (weather?: IWeather) =>
    Number(
      weather?.location.localtime.split(" ")[1].split(":")[0] || hourOfDay
    ) >= 5 &&
    Number(
      weather?.location.localtime.split(" ")[1].split(":")[0] || hourOfDay
    ) <= 16;

  return { time, hourOfDay, isDay, todaysDate, today, day };
};

export function hash(thing: string): string {
  return AES.encrypt(thing, REACT_APP_PASSPHRASE).toString();
}

export function deHash(thing: string): string {
  if (!thing) {
    return "";
  }
  
  return AES.decrypt(thing, REACT_APP_PASSPHRASE).toString(enc.Utf8);
}

export function round(num: number, precision: number = 2) {
  const base = 10 ** precision;
  return (Math.round(num * base) / base).toFixed(precision);
}

export function getUserLocationCoords(
  onSuccess: (coords: ICoords) => void,
  onError?: (err: GeolocationPositionError) => void
) {
  let coords: ICoords;
  let status = {
    failed: true,
  };

  const setSuccessStatus = () => {
    status.failed = false;
  };

  const success = (position: GeolocationPosition) => {
    const latitude = +round(position.coords.latitude);
    const longitude = +round(position.coords.longitude);

    coords = { latitude, longitude };
    onSuccess(coords);
    setSuccessStatus();
  };

  const error = (err: GeolocationPositionError) => {
    console.warn("error in getting location coordinates");
    logError(err);
    onError?.(err);
    return;
  };

  if (!navigator?.geolocation) {
    const err = "Geolocation is not supported by your browser";
    console.warn(err);
    logError(err);
    setSuccessStatus();
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  return status;
}

export async function locationPermissionQuery(): Promise<PermissionStatus> {
  return await navigator.permissions.query({ name: "geolocation" });
}

export const updateWeatherCache = (weather: IWeather, location: string) => {
  const [lat, lon] = location.split(",");
  const weatherCache = localstorageGet<IWeather[]>(
    localStorageKeys.weatherCache,
    { isObject: true }
  ) as IWeather[] | null;

  const unaffectedWeathers = (weatherCache || []).filter(
    (w) =>
      String(w.location.lat) !== String(lat.trim()) &&
      String(w.location.lon) !== String(lon.trim())
  );

  const updatedCache = unaffectedWeathers.concat(weather);
  localstorageSet(localStorageKeys.weatherCache, updatedCache);

  return updatedCache;
};

export const getWeatherFromCache = (location: string) => {
  const [lat, lon] = location.split(",");

  try {
    const weatherCache = localstorageGet<IWeather[]>(
      localStorageKeys.weatherCache,
      { isObject: true }
    ) as IWeather[] | null;

    const cachedWeather = weatherCache?.find(
      (w) =>
        String(w.location.lat) === String(lat.trim()) &&
        String(w.location.lon) === String(lon.trim())
    );

    return cachedWeather;
  } catch {
    return;
  }
};

export const getFavLocations = () =>
  localstorageGet<string[]>(localStorageKeys.favorites, { isObject: true }) as
    | string[]
    | null;

export const getTopCities = () =>
  localstorageGet<ITopCity[]>(localStorageKeys.topCities, {
    isObject: true,
  }) as ITopCity[] | null;

export const getNotes = () =>
  localstorageGet<INote[]>(localStorageKeys.notes, { isObject: true }) as
    | INote[]
    | null;

export const isFavourite = (item: IWeather) => {
  const {
    location: { lat: latitude, lon: longitude },
  } = item;
  const locsFavourites = getFavLocations();

  const match = (locsFavourites || []).find((f) => {
    const [lat, lon] = f.split(",");
    return String(latitude) === lat.trim() && String(longitude) === lon.trim();
  });

  return match;
};

export const isTopCity = (item: IWeather) => {
  const {
    location: { lat: latitude, lon: longitude },
  } = item;
  const topCities = getTopCities();
  
  const match = (topCities || []).find((city) => {
    const [lat, lon] = city.coord.split(",");
    return String(latitude) === lat.trim() && String(longitude) === lon.trim();
  });

  return match;
};

export const hasNotes = (item: IWeather) => {
  const {
    location: { lat: latitude, lon: longitude },
  } = item;
  const allNotes = getNotes();

  const match = (allNotes || []).find(({ location, note }) => {
    const [lat, lon] = location.split(",");
    return (
      String(latitude) === lat.trim() &&
      String(longitude) === lon.trim() &&
      !!note.length
    );
  });

  return match;
};

export const saveNote = (item: IWeather, newNote: string) => {
  const {
    location: { lat: latitude, lon: longitude },
  } = item;
  const allNotes = getNotes();

  const match = (allNotes || []).find(({ location }) => {
    const [lat, lon] = location.split(",");
    return String(latitude) === lat.trim() && String(longitude) === lon.trim();
  });

  if (!!match) {
    // update note
    const updatedNote = (allNotes || []).map((oldNote) => {
      const [lat, lon] = oldNote.location.split(",");
      if (String(latitude) === lat.trim() && String(longitude) === lon.trim()) {
        return {
          location: oldNote.location,
          note: newNote,
        } as INote;
      } else {
        return oldNote;
      }
    });

    localstorageSet(localStorageKeys.notes, updatedNote);
    return;
  } else {
    // add note
    const updatedNote = (allNotes || []).concat({
      location: `${latitude},${longitude}`,
      note: newNote,
    });

    localstorageSet(localStorageKeys.notes, updatedNote);
  }
};

export const toggleFavorite = (item: IWeather) => {
  const {
    location: { lat: latitude, lon: longitude },
  } = item;
  const locsFavourites = getFavLocations();

  if (isFavourite(item)) {
    // removing from favorites
    const updatedFavs = (locsFavourites || []).filter((fav) => {
      const [lat, lon] = fav.split(",");
      // setIsFav(false);
      return (
        String(latitude) !== lat.trim() && String(longitude) !== lon.trim()
      );
    });

    localstorageSet(localStorageKeys.favorites, updatedFavs);
    return;
  }

  const updatedFavs = (locsFavourites || []).concat(`${latitude},${longitude}`);

  localstorageSet(localStorageKeys.favorites, updatedFavs);
};

export const removeFromTopCities = (item: IWeather) => {
  const {
    location: { lat: latitude, lon: longitude },
  } = item;
  const topCities = getTopCities();

  const updatedCities = (topCities || []).filter((city) => {
    const [lat, lon] = city.coord.split(",");

    return String(latitude) !== lat.trim() && String(longitude) !== lon.trim();
  });

  localstorageSet(localStorageKeys.topCities, updatedCities);
  return;
};

export const getImage = (conditionCode: number) =>
  weatherConditionCodesMappedToIcons.find(
    (weather) => weather.code === conditionCode
  );

export const sortByLocationName = (weather: IWeather[]) =>
  weather.sort((a, b) => a.location.name.localeCompare(b.location.name));

export const logError = (err: any) =>
  localstorageSet(localStorageKeys.lastErrorLog, err, false);

