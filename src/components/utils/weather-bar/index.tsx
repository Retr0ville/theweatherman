import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActiveBackgroundEnum } from "../../../enums/ActiveBackgroundEnum";
import { IWeather } from "../../../interfaces/IWeather";
import { pageurl } from "../../../utils/constants";
import {
  getDayandTime,
  getImage,
  hasNotes,
  removeFromTopCities,
  toggleFavorite,
} from "../../../utils/functions";
import { ReactComponent as XIcon } from "../../../assets/icons/x.svg";
import { ReactComponent as Note } from "../../../assets/icons/note.svg";
import { ReactComponent as NoteFilled } from "../../../assets/icons/note-filled.svg";
import { ReactComponent as Star } from "../../../assets/icons/star.svg";
import { ReactComponent as StarFilled } from "../../../assets/icons/star-filled.svg";
import "./index.scss";
import { IHomeWeatherData } from "../../../interfaces/IHomeWeatherData";

interface IProps {
  weather: IWeather;
  setActiveBackground: (
    value: React.SetStateAction<ActiveBackgroundEnum>
  ) => void;
  setHomePageWeather: React.Dispatch<React.SetStateAction<IHomeWeatherData>>;
  isFavourite?: boolean;
  isTopCity?: boolean;
}

const WeatherBar: React.FC<IProps> = ({
  weather,
  setActiveBackground,
  setHomePageWeather,
  isTopCity,
  isFavourite,
}) => {
  const navigate = useNavigate();
  const { isDay, day } = getDayandTime();
  const navigateTo = (data: IWeather, tab?: string) => {
    const loc = `${data?.location.lat},${data?.location.lon}`;
    navigate(`${pageurl.WEATHER_DETAIL}?q=${loc}${tab ? `&t=${tab}` : ""}`);
  };
  const [hasNote, setHasNote] = useState<boolean>();

  useEffect(() => {
    setHasNote(!!hasNotes(weather));
  }, [weather]);

  const handleFavToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (isFavourite) {
      setHomePageWeather((prev) => ({
        ...prev,
        favouritesWeather: prev.favouritesWeather.filter(
          (w) =>
            !(
              w.location.lat === weather.location.lat &&
              w.location.lon === weather.location.lon
            )
        ),
      }));
    } else {
      setHomePageWeather((prev) => ({
        ...prev,
        favouritesWeather: [...(prev.favouritesWeather || []), weather],
      }));
    }
    toggleFavorite(weather);
  };

  const handleRemoveTopCity = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setHomePageWeather((prev) => ({
      ...prev,
      largestCitiesWeather: prev.largestCitiesWeather.filter(
        (w) =>
          !(
            w.location.lat === weather.location.lat &&
            w.location.lon === weather.location.lon
          )
      ),
    }));
    removeFromTopCities(weather);
  };

  return (
    <div
      className="weather-bar-wrapper"
      onClick={() => navigateTo(weather)}
      onMouseOver={() =>
        setActiveBackground(
          !!weather.current.is_day ? ActiveBackgroundEnum.DAY : ActiveBackgroundEnum.NIGHT
        )
      }
    >
      <div className="location-info">
        <h2>{weather.location.name}</h2>
        <p className="country">{weather.location.country}</p>
        <p className="last-updated">
          <span className="time">
            {weather.location.localtime.split(" ")[1]}
          </span>{" "}
          {day(weather)}
        </p>

        <p className="feels">
          Feels Like <span>{weather.current.feelslike_c}</span>&deg;C
        </p>
      </div>
      <div className="condition-info">
        <h3 className="temperature">{weather.current.temp_c}&deg;C</h3>
        <p className="condition">{weather.current.condition.text}</p>
      </div>
      <div className="image-wrapper">
        <img
          alt={weather.current.condition.text}
          src={
            !!weather.current.is_day
              ? `${getImage(weather?.current.condition.code)?.day}`
              : `${getImage(weather?.current.condition.code)?.night}`
          }
        />
      </div>
      <div className="action-bar">
        {isTopCity && (
          <div
            onClick={handleRemoveTopCity}
            className="remove"
            title="Remove city"
          >
            <XIcon className="x-icon" />
          </div>
        )}

        <div onClick={handleFavToggle} className="fav">
          {isFavourite ? (
            <StarFilled className="filled" title="Remove from favourites" />
          ) : (
            <Star title="Add to favourites" />
          )}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigateTo(weather, "note");
          }}
          className="notes"
        >
          {hasNotes(weather) ? (
            <NoteFilled className="filled" title="View note" />
          ) : (
            <Note title="No note" />
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherBar;
