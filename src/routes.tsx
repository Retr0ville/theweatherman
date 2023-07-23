import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/utils/layout";
import { pageurl } from "./utils/constants";
import Page404 from "./utils/error-logging/Page404";
import Home from "./components/home-view";
import WeatherDetail from "./components/weather-detail";
import { weatherLoader } from "./components/weather-detail/weatherLoader";
import { homeLoader } from "./components/home-view/homeLoader";
import PageNoWeather from "./utils/error-logging/PageNoWeather";

export const router = createBrowserRouter(([
    {
      path: pageurl.HOMEPAGE,
      errorElement: <PageNoWeather />,
      element: <Layout />,
      children: [
        { index: true, loader: homeLoader, element: <Home /> },
        {
          path: pageurl.WEATHER_DETAIL,
          errorElement: <PageNoWeather />,
          loader: weatherLoader,
          element: <WeatherDetail />,
        },
        { path: "*", element: <Page404 /> },
      ],
    },
  ]));
