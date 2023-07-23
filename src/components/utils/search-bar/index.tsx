import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { IWeather } from "../../../interfaces/IWeather";
import { getWeather } from "../../../services/weather";
import { getDayandTime, logError } from "../../../utils/functions";
import useUnFocus from "../../../hooks/use-unfocus";
import { pageurl } from "../../../utils/constants";

const SearchBar = () => {
  const [weatherSearchQuery, setWeatherSearchQuery] = useState("");
  const [weatherResult, setWeatherResult] = useState<IWeather>();
  const [showResult, setshowResult] = useState(true);

  const searchRef = useRef(null);
  useUnFocus([searchRef], () => setshowResult(false));

  let searchTimeout: number;

  const handleSearch = (query: string) => {
    clearTimeout(searchTimeout);
    if (!query) return setWeatherResult({} as IWeather);

    searchTimeout = setTimeout(() => {
      getWeather(query)
        .then(setWeatherResult)
        .catch((err: any) => logError(err));
    }, 500);
  };

  const { day: getDay } = getDayandTime();

  return (
    <div
      className={`weather-search-input-wrapper ${
        !!weatherResult?.location ? "with-result" : ""
      }`}
      ref={searchRef}
      onClick={() => setshowResult(true)}
    >
      <input
        type="search"
        name="weather-search"
        id="weather-search"
        className={`weather-search-input ${
          !!weatherResult?.location ? "with-result" : ""
        }`}
        placeholder="Search Cities..."
        value={weatherSearchQuery}
        onChange={({ target: { value } }) => {
          setWeatherSearchQuery(value);
          handleSearch(value);
        }}
      />

      {showResult && !!weatherResult?.location && (
        <Link
          to={`${pageurl.WEATHER_DETAIL}?q=${weatherResult?.location.lat},${weatherResult?.location.lon}`}
          className="search-results"
        >
          <div className="country-time-wrapper">
            <p>
              weather near{" "}
              <span className="country">{weatherResult.location.name}</span>
            </p>
            <div className="day-location-wrapper">
              <span className="day">
                {getDay(weatherResult)} <span className="dash">-</span>
              </span>
              <span className="location">
                {" "}
                {`${weatherResult.location.region}`},{" "}
                {weatherResult.location.country}
              </span>
            </div>
            <p className="time">
              {weatherResult.location.localtime.split(" ")[1]}
            </p>
          </div>
          <div className="temp-condition-wrapper">
            <h3 className="temperature">
              {weatherResult.current.temp_c}&deg;C
            </h3>
            <p className="condition">{weatherResult.current.condition.text}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default SearchBar;
