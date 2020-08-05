import React from "react";
import styles from "./style.module.scss";
import Card from "react-bootstrap/Card";

const CalendarGroup: React.FC = () => {
  return (
    <>
      <h1 className={styles.tabGroupHeading}>Today</h1>
      <div
        className={"btn-group-vertical " + styles.tabGroupButtonGroup}
        role="group"
      >
        <Card>
          <Card.Body>
            <Card.Title>Lecture: CO142</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default CalendarGroup;
