import React, { Component, ErrorInfo } from "react";
import { ILog } from "../../interfaces/ILog";
import { pageurl } from "../constants";
import "./index.scss";
import { logError } from "../functions";

type ErrorState = {
  hasError: boolean;
};

class ErrorLogger extends Component<{}, ErrorState> {
  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const log: ILog = {
      message: error.message,
      url: window.location.href,
      stackTrace: errorInfo.componentStack,
    };
    logError(JSON.stringify(log))
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-logging">
          <h2>Sorry, something went wrong!</h2>
          <p>An error occured, Try reloading the page</p>
          <div className="buttons">
            <button onClick={() => window.location.reload()}>Reload</button>
            <button onClick={() => (window.location.href = pageurl.HOMEPAGE)}>
              Go Home
            </button> 
          </div>
        </div>
      );
    }
    return (
      this.props as Readonly<{}> &
        Readonly<{
          children?: React.ReactNode;
        }>
    ).children;
  }
}

export default ErrorLogger;
