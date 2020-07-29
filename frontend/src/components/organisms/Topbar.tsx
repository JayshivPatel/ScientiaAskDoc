import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";

const Topbar: React.FC = () => {
  return (
    <>
      <Jumbotron>
        <h1 className="header">
          Welcome To React-Bootstrap TypeScript Example
        </h1>
      </Jumbotron>
    </>
  );
};

export default Topbar;
