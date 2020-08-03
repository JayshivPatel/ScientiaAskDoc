import React from "react";
import Button from "react-bootstrap/Button";

const LeftBarTabGroup: React.FC = () => {
  return (
    <>
      <h1 className="module-outline-heading">Sort</h1>
      <div
        className="btn-group-vertical"
        role="group"
        id="module-outline-button-group"
      >
        <Button className="module-outline-button">Progress</Button>
        <Button className="module-outline-button-a active" type="button">
          Module Title
        </Button>
        <Button className="module-outline-button">Module Code</Button>
        <Button className="module-outline-button">Term</Button>
      </div>
    </>
  );
};

export default LeftBarTabGroup;
