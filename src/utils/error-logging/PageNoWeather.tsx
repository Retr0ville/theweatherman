import React from "react";
import "./PageNoWeather.scss";
import "./index.scss";
import Button from "../../components/utils/button";
import { pageurl } from "../constants";

const PageNoWeather: React.FC = () => {
  return (
    <div className="no-weather-page error-page">
      <h2>Sorry, No Weather information was found</h2>
      <div className="actions">
        <Button
          onClick={() => window.location.reload()}
          textContent={"Reload Page"}
        />
        <Button
          onClick={() => (window.location.href = pageurl.HOMEPAGE)}
          textContent={"Go Home"}
        />
      </div>
    </div>
  );
};

export default PageNoWeather;
