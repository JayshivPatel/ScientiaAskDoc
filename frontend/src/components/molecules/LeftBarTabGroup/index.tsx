import React from "react";
import Button from "react-bootstrap/Button";

const LeftBarTabGroup: React.FC = () => {
  return (
    <>
      <h1 className="exam-outline-heading">Sort</h1>
      <div
        className="btn-group-vertical"
        role="group"
        id="exam-outline-button-group"
      >
        <Button className="exam-outline-button">Progress</Button>
        <Button className="exam-outline-button-a active" type="button">
          Course Title
        </Button>
        <Button className="exam-outline-button">Course Code</Button>
        <Button className="exam-outline-button">Term</Button>
      </div>
    </>
  );
};

export default LeftBarTabGroup;
