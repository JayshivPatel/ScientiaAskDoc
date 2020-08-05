import React from "react";
import Button from "react-bootstrap/Button";
import styles from "./style.module.scss";
import Card from "react-bootstrap/Card";

const CalendarGroup: React.FC = () => {
  return (
    <>
      <h1 className={styles.moduleOutlineHeading}>Today</h1>
      <div
        className={"btn-group-vertical " + styles.moduleOutlineButtonGroup}
        role="group"
      >
        {/* <Button className={styles.moduleOutlineButton}>Progress</Button>
        <Button className={"active " + styles.moduleOutlineButton}>
          Module Title
        </Button> */}

      </div>
    </>
  );
};

export default CalendarGroup;
