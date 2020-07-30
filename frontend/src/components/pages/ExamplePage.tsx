import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

import ButtonsShowcase from "../molecules/Buttons";
import ToastsShowcase from "../molecules/Toasts";

const ExamplePage: React.FC = () => {
  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">
          Welcome To React-Bootstrap TypeScript Example
        </h1>
      </Jumbotron>
      <h2>Buttons</h2>
      <ButtonsShowcase />
      <h2>Toasts</h2>
      <ToastsShowcase />
    </Container>
  );
};

export default ExamplePage;
