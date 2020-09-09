import React from "react";
import Spinner from "react-bootstrap/Spinner";

import WarningJumbotron from "components/atoms/WarningJumbotron";

export interface LoadingScreenProps {
	isLoaded?: Boolean;
	error?: string;
	successful: JSX.Element;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoaded, error, successful }) => {
  if (!isLoaded)
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Spinner animation="border" variant={document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"} />
      </div>
    );
  if (error) return <WarningJumbotron message={`Error retrieving data: ${error}`} />;
  return successful;
};

export default LoadingScreen;
