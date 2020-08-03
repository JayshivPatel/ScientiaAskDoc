import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

import ButtonsShowcase from "components/templates/ExampleButtons";
import ToastsShowcase from "components/templates/ExampleToasts";

export interface ExamplePageProps {
  name: string;
}


const ExamplePage: React.FC<ExamplePageProps> = ({name} : ExamplePageProps) => {
  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">
          Welcome To {name}
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
