import React from "react";
import { pageurl } from "../../utils/constants";
import "./Page404.scss";
import "./index.scss";
import Button from "../../components/utils/button";

const Page404: React.FC = () => {
  return (
    <div className="404-page error-page">
      <h2>This is not the page you are looking for...</h2>
      <Button
        onClick={() => (window.location.href = pageurl.HOMEPAGE)}
        textContent={"Go back to Home"}
      />
    </div>
  );
};

export default Page404;
