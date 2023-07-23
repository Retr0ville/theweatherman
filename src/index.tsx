import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import ErrorLogger from "./utils/error-logging";
import "./reset.scss";
import "./index.scss";
import { localStorageKeys, topCitiesLocationCoords } from "./utils/constants";
import { router } from "./routes";
import {
  localstorageGet,
  localstorageSet,
} from "./utils/local-storage-helpers";
import { RouterProvider } from "react-router-dom";

const Site = (props: any) => {
  const topCitiesHasBeenSet = localstorageGet<string>(
    localStorageKeys.hasSetInitialTopCities
  );

  if (!topCitiesHasBeenSet){
    localstorageSet(localStorageKeys.topCities, topCitiesLocationCoords);
    localstorageSet(localStorageKeys.hasSetInitialTopCities, "true");
  }

  return props.children;
};

ReactDOM.render(
  <ErrorLogger>
    <Site>
      <RouterProvider router={router} />
    </Site>
  </ErrorLogger>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
