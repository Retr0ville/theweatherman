import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IWeather } from "../../interfaces/IWeather";
import { weatherConditionCodesMappedToIcons } from "../../utils/constants";
import {
  getDayandTime,
  hasNotes,
  isFavourite,
  saveNote,
  toggleFavorite,
} from "../../utils/functions";
import { useOnlineStatus } from "../../hooks/use-online";
import { ActiveBackgroundEnum } from "../../enums/ActiveBackgroundEnum";
import { useBackground } from "../../hooks/use-background";
import { ReactComponent as Wind } from "../../assets/icons/conditions/wind.svg";
import { ReactComponent as TemperatureSun } from "../../assets/icons/conditions/temperature-sun.svg";
import { ReactComponent as Pressure } from "../../assets/icons/conditions/pressure.svg";
import { ReactComponent as WindDirection } from "../../assets/icons/conditions/wind-dir.svg";
import { ReactComponent as Uv } from "../../assets/icons/conditions/uv.svg";
import { ReactComponent as Humidity } from "../../assets/icons/conditions/humidity.svg";
import { ReactComponent as Visibility } from "../../assets/icons/conditions/visibility.svg";
import { ReactComponent as Precipitation } from "../../assets/icons/conditions/precipitation.svg";
import { ReactComponent as Cloud } from "../../assets/icons/conditions/cloud.svg";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReactComponent as StarFilled } from "../../assets/icons/star-filled.svg";
import { ReactComponent as Back } from "../../assets/icons/back.svg";
import "./index.scss";
import Button from "../utils/button";

const WeatherDetail = () => {
  const weather = useLoaderData() as IWeather;
  const { setActiveBackground } = useBackground();
  const navigate = useNavigate();

  const [isForecastTab, setIsForecastTab] = useState(true);
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isFav, setIsFav] = useState<boolean>();

  const { location, current } = weather;
  const { isDay } = getDayandTime();

  useEffect(() => {
    setIsFav(!!isFavourite(weather));
  }, [weather]);

  useEffect(() => {
    setActiveBackground(
      !!weather.current.is_day ? ActiveBackgroundEnum.DAY : ActiveBackgroundEnum.NIGHT
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weather]);

  useEffect(() => {
    const localStorageNote = hasNotes(weather);

    if (localStorageNote) {
      setNotes(localStorageNote.note);
    }
  }, [weather]);

  const handleSaveNote = () => {
    saveNote(weather, notes);
    setIsEditing(false);
  };

  const handleClearNote = () => {
    saveNote(weather, "");
    setIsEditing(false);
  };

  const toggleFavoriteItem = (item: IWeather) => {
    toggleFavorite(item);
    setIsFav(!isFav);
  };

  useEffect(() => {
    const tab = new URL(window.location.href).searchParams.get("t");

    if (tab === "note") {
      setIsForecastTab(false);
    }
  }, []);

  /* here for setting seo friendly url if needed*/
  // useEffect(() => {
  //   if (isOnline) {
  //     window.history.replaceState(
  //       null,
  //       "",
  //       `${weather.location.name.toLowerCase()}-${weather.location.region.toLowerCase()}-${weather.location.country.toLowerCase()}`.replace(
  //         " ",
  //         "-"
  //       )
  //     );
  //     return;
  //   }

  //   window.history.replaceState(
  //     null,
  //     "",
  //     `${weather.location.lat},${weather.location.lon}`
  //   );
  // }, [isOnline, weather]);

  const image = weatherConditionCodesMappedToIcons.find(
    (weat) => weat.code === weather.current.condition.code
  );

  return (
    <div className={`weather-detail-page`}>
      <div className="weather-details-wrapper">
        <div className="back" onClick={() => navigate(-1)}>
          <Back /> Go back
        </div>
        <h1 className="name">{location.name}</h1>
        <p className="country">{location.country}</p>
        <div className="actions">
          <div className="tabs">
            <div
              className={`forecast ${isForecastTab ? "active" : ""}`}
              onClick={() => setIsForecastTab(true)}
            >
              <h2>Forecast</h2>
            </div>
            <div
              className={`note ${!isForecastTab ? "active" : ""}`}
              onClick={() => setIsForecastTab(false)}
            >
              <h2>Notes</h2>
            </div>
          </div>
          <div onClick={() => toggleFavoriteItem(weather)} className="fav">
            {isFavourite(weather) ? (
              <StarFilled className="filled" title="Remove from favourites" />
            ) : (
              <Star title="Add to favourites" />
            )}
          </div>
        </div>

        {isForecastTab ? (
          <div className="forecast-info">
            <div className="weather-detail">
              <div className="info-row">
                <div className="card temperature">
                  <div className="icon">
                    <TemperatureSun />
                  </div>
                  <div className="info">
                    <p>Temp</p>
                    <h2>{current.temp_c}&deg;C</h2>
                  </div>
                </div>
                <div className="card wind">
                  <div className="icon">
                    <Wind />
                  </div>
                  <div className="info">
                    <p>Wind</p>
                    <h2>{current.wind_kph}kph</h2>
                  </div>
                </div>
                <div className="card direction desktop">
                  <div className="icon">
                    <WindDirection />
                  </div>
                  <div className="info">
                    <p>Direction</p>
                    <h2>
                      {current.wind_degree}&deg;{current.wind_dir}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="info-row">
                <div className="card pressure">
                  <div className="icon">
                    <Pressure />
                  </div>
                  <div className="info">
                    <p>Pressure</p>
                    <h2>{current.pressure_mb}mB</h2>
                  </div>
                </div>
                <div className="card humidity">
                  <div className="icon">
                    <Humidity />
                  </div>
                  <div className="info">
                    <p>Humidity</p>
                    <h2>{current.humidity}</h2>
                  </div>
                </div>
                <div className="card uv desktop">
                  <div className="icon">
                    <Uv />
                  </div>
                  <div className="info">
                    <p>UV index</p>
                    <h2>{current.uv}</h2>
                  </div>
                </div>
              </div>
              <div className="info-row">
                <div className="card precip">
                  <div className="icon">
                    <Precipitation />
                  </div>
                  <div className="info">
                    <p>Precipitation</p>
                    <h2>{current.precip_mm}mm</h2>
                  </div>
                </div>
                <div className="card cloud desktop">
                  <div className="icon">
                    <Cloud />
                  </div>
                  <div className="info">
                    <p>Cloud</p>
                    <h2>{current.cloud}%</h2>
                  </div>
                </div>
                <div className="card visibility">
                  <div className="icon">
                    <Visibility />
                  </div>
                  <div className="info">
                    <p>Visibility</p>
                    <h2>{current.vis_km}km</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="condition-image">
              <img
                alt={current.condition.text}
                src={!!weather.current.is_day ? `${image?.day}` : `${image?.night}`}
              />
              <div className="condition">{current.condition.text}</div>
              <div className="feel">
                <span>feels like</span>
                {current.feelslike_c}&deg;C
              </div>
            </div>
          </div>
        ) : (
          <div className="note-input-wrapper">
            <textarea
              placeholder="Add Notes"
              value={notes}
              onChange={({ target: { value } }) => setNotes(value)}
              className={`note-input ${isEditing ? "" : "preview"}`}
              disabled={!isEditing}
            />
            <div className="actions">
              {notes && (
                <Button
                  onClick={() => {
                    setNotes("");
                    setIsEditing(false);
                    handleClearNote();
                  }}
                  textContent={"Delete"}
                />
              )}
              <Button
                onClick={() =>
                  !isEditing ? setIsEditing(true) : handleSaveNote()
                }
                textContent={isEditing ? "Save" : "Edit"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDetail;
