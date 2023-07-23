import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IHomeWeatherData } from "../../interfaces/IHomeWeatherData";
import {
  getDayandTime,
  getImage,
  getUserLocationCoords,
  isFavourite,
  locationPermissionQuery,
  sortByLocationName,
} from "../../utils/functions";
import { localStorageKeys, pageurl } from "../../utils/constants";
import { LocationPermissionEnum } from "../../enums/LocationPermissionEnum";
import { IWeather } from "../../interfaces/IWeather";
import { getWeather } from "../../services/weather";
import { ICoords } from "../../interfaces/ICoords";
import {
  localstorageGet,
  localstorageSet,
} from "../../utils/local-storage-helpers";
import "./index.scss";
import { useBackground } from "../../hooks/use-background";
import { ActiveBackgroundEnum } from "../../enums/ActiveBackgroundEnum";
import Modal from "../utils/modal";
import SearchBar from "../utils/search-bar";
import WeatherBar from "../utils/weather-bar";

const Home = () => {
  const navigate = useNavigate();
  const homePageWeatherData = useLoaderData() as IHomeWeatherData;

  const { setActiveBackground } = useBackground();

  const [locationPermissionStatus, setLocationPermissionStatus] =
    useState<LocationPermissionEnum>();
  const [userWeather, setUserWeather] = useState<IWeather>();
  const [requestLocation, setRequestLocation] = useState(
    locationPermissionStatus === LocationPermissionEnum.PROMPT
  );
  const [homePageWeather, setHomePageWeather] =
    useState<IHomeWeatherData>(homePageWeatherData);

  const { isDay, day, todaysDate } = getDayandTime();

  const redirect = (data: IWeather) => {
    const loc = `${data?.location.lat},${data?.location.lon}`;
    navigate(`${pageurl.WEATHER_DETAIL}?q=${loc}`);
  };

  useEffect(() => {
    locationPermissionQuery().then(({ state }) => {
      if (state === "granted") {
        setLocationPermissionStatus(LocationPermissionEnum.GRANTED);
        const onSuccess = (coords: ICoords) => {
          const loc = `${coords?.latitude},${coords?.longitude}`;
          localstorageSet(localStorageKeys.userLocation, loc);
          getWeather(loc).then(setUserWeather);
        };
        const status = getUserLocationCoords(onSuccess);

        if (status.failed) {
          const localLocation = localstorageGet<string>(
            localStorageKeys.userLocation
          );
          if (!localLocation) {
            return;
          }
          getWeather(localLocation).then(setUserWeather);
        }
        return;
      } else if (state === "prompt") {
        setLocationPermissionStatus(LocationPermissionEnum.PROMPT);
        return;
      }
      // do nothing if the permission was denied.
      setLocationPermissionStatus(LocationPermissionEnum.DENIED);
      localStorage.removeItem(localStorageKeys.userLocation);
    });
  }, []);

  useEffect(() => {
    if (locationPermissionStatus === LocationPermissionEnum.PROMPT) {
      setRequestLocation(true);
    }
  }, [locationPermissionStatus]);

  return (
    <div>
      <>
        <div className="home-weather-page">
          <div className="home-weather-wrapper">
            <SearchBar />
            {userWeather && (
              <>
                <div className="at-a-glance">
                  <h2>At A Glance</h2>
                  <p>
                    {day(userWeather)} {todaysDate(userWeather).split(" ")[1]}{" "}
                    {todaysDate(userWeather).split(" ")[2]},{" "}
                    {todaysDate(userWeather).split(" ")[3]}
                  </p>
                </div>
                <div
                  className="user-weather-wrapper"
                  onClick={() => redirect(userWeather)}
                  onMouseOver={() =>
                    setActiveBackground(
                      !!userWeather.current.is_day
                        ? ActiveBackgroundEnum.DAY
                        : ActiveBackgroundEnum.NIGHT
                    )
                  }
                >
                  <div className="user-weather">
                    <div>
                      <img
                        alt={userWeather.current.condition.text}
                        src={
                          !!userWeather.current.is_day
                            ? `${
                                getImage(userWeather?.current.condition.code)
                                  ?.day
                              }`
                            : `${
                                getImage(userWeather?.current.condition.code)
                                  ?.night
                              }`
                        }
                      />
                    </div>
                    <div className="mid-section">
                      <h2 className="temp">
                        {userWeather.current.temp_c}&deg;C
                      </h2>
                      <p className="condition">
                        {userWeather.current.condition.text}
                      </p>
                      <p className="cloud">
                        Cloud <span>{userWeather.current.cloud}%</span>
                      </p>
                      <p className="wind">
                        Wind <span>{userWeather.current.wind_kph}km/h</span>
                      </p>
                    </div>
                    <div className="right-section">
                      <h3 className="location-name">
                        {userWeather.location.name}
                      </h3>
                      <h3 className="location-time">
                        {userWeather.location?.localtime.split(" ")[1]}
                      </h3>
                      <p className="location-feel">
                        Feels Like{" "}
                        <span>{userWeather.current.feelslike_c} &deg;C</span>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            {!!(homePageWeather?.favouritesWeather?.length > 0) && (
              <div className="home-weather-details">
                <div>
                  <h2 className="header">Favourites</h2>
                  <div className="weather-list">
                    {sortByLocationName(homePageWeather.favouritesWeather).map(
                      (weather, index) => (
                        <WeatherBar
                          weather={weather}
                          setActiveBackground={setActiveBackground}
                          key={index}
                          setHomePageWeather={setHomePageWeather}
                          isFavourite
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
            {!!(homePageWeather?.largestCitiesWeather?.length > 0) && (
              <div className="home-weather-details">
                <div>
                  <h2 className="header">Top Cities</h2>
                  <div className="weather-list">
                    {sortByLocationName(
                      homePageWeather.largestCitiesWeather
                    ).map((weather, index) => (
                      <WeatherBar
                        weather={weather}
                        setActiveBackground={setActiveBackground}
                        key={index}
                        setHomePageWeather={setHomePageWeather}
                        isFavourite={!!isFavourite(weather)}
                        isTopCity
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
      {requestLocation && (
        <Modal handleClose={() => setRequestLocation(false)} />
      )}
    </div>
  );
};

export default Home;
