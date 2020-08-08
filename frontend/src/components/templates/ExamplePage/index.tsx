import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";

import ButtonsShowcase from "components/templates/ExamplePage/ExampleButtons";
import ToastsShowcase from "components/templates/ExamplePage/ExampleToasts";

export interface ExamplePageProps {
  name: string;
}


const ExamplePage: React.FC<ExamplePageProps> = ({name} : ExamplePageProps) => {
  return (
    <>
      <Jumbotron>
        <h1 className="header">
          Welcome To {name}
        </h1>
      </Jumbotron>
      <h2>Buttons</h2>
      <ButtonsShowcase />
      <h2>Toasts</h2>
      <ToastsShowcase />
    </>
  );
};

export default ExamplePage;
