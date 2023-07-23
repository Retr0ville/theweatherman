import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./index.scss";
import { getDayandTime } from "../../../utils/functions";
import { ActiveBackgroundEnum } from "../../../enums/ActiveBackgroundEnum";

const Layout: React.FC = (props) => {
  const { isDay } = getDayandTime();
  const [activeBackground, setActiveBackground] =
    useState<ActiveBackgroundEnum>(
      isDay() ? ActiveBackgroundEnum.DAY : ActiveBackgroundEnum.NIGHT
    );

  return (
    <div
      className={`page-background ${
        activeBackground === ActiveBackgroundEnum.DAY ? "light" : "dark"
      }`}
    >
      <Outlet context={{ setActiveBackground }} />
    </div>
  );
};

export default Layout;
