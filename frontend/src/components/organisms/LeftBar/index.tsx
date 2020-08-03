import React from "react";
import "./style.scss";

const LeftBar: React.FC = () => {
  // TODO: change to using react components
  return (
    <div id="sidebar-wrapper">
      <div>
        <p className="sidebar-status">1 UPDATE</p>
        <h1 className="exam-outline-heading">Sort</h1>
      </div>
      <div
        className="btn-group-vertical"
        role="group"
        id="exam-outline-button-group"
      >
        <button className="btn btn-primary exam-outline-button" type="button">
          Progress
        </button>
        <button
          className="btn btn-primary exam-outline-button-a active"
          type="button"
        >
          Course Title
        </button>
        <button className="btn btn-primary exam-outline-button" type="button">
          Course Code
        </button>
        <button className="btn btn-primary exam-outline-button" type="button">
          Term
        </button>
      </div>
    </div>
  );
};

export default LeftBar;
