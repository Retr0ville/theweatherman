import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { ICoords } from "../../../interfaces/ICoords";
import { localStorageKeys, pageurl } from "../../../utils/constants";
import { getUserLocationCoords } from "../../../utils/functions";
import {
  localstorageSet,
  localstorageGet,
} from "../../../utils/local-storage-helpers";
import Button from "../button";

interface IProps {
  handleClose: () => void;
}

const Modal: React.FC<IProps> = ({ handleClose }) => {
  const navigate = useNavigate();

  const requestLocationPerms = () => {
    const onSuccess = (coords: ICoords) => {
      const loc = `${coords?.latitude},${coords?.longitude}`;
      localstorageSet(localStorageKeys.userLocation, loc);

      navigate(`${pageurl.WEATHER_DETAIL}?q=${loc}`);
    };

    const onError = (err: GeolocationPositionError) => {
      if (err.code === err.PERMISSION_DENIED) {
        return;
      }

      const localLocation = localstorageGet<string>(
        localStorageKeys.userLocation
      );
      if (!localLocation) {
        return;
      }
      navigate(`${pageurl.WEATHER_DETAIL}?q=${localLocation}`);
    };

    getUserLocationCoords(onSuccess, onError);
  };
  return (
    <>
      <div className="modal active" id="modal">
        <div className="modal-header">
          <button
            data-close-button
            className="close-button"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div>
            <h3 className="info">
              The application needs your location information in order to
              display your weather details.
            </h3>
            <div className="allow">
              <Button
                onClick={() => requestLocationPerms()}
                textContent={"Enable Location Services"}
              />
            </div>
            <p className="sub-text">
              *this information is not stored by us or any third party and can
              be revoked at any time.
            </p>
          </div>
        </div>
      </div>
      <div id="overlay" className="active"></div>
    </>
  );
};

export default Modal;
