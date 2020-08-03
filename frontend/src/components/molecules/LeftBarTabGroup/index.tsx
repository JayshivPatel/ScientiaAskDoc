import React from "react";
import Button from "react-bootstrap/Button";
import styles from "./style.module.scss";

const LeftBarTabGroup: React.FC = () => {
  return (
    <>
      <h1 className={styles.moduleOutlineHeading}>Sort</h1>
      <div
        className={"btn-group-vertical " + styles.moduleOutlineButtonGroup}
        role="group"
      >
        <Button className={styles.moduleOutlineButton}>Progress</Button>
        <Button className={"active " + styles.moduleOutlineButton}>
          Module Title
        </Button>
        <Button className={styles.moduleOutlineButton}>Module Code</Button>
        <Button className={styles.moduleOutlineButton}>Term</Button>
      </div>
    </>
  );
};

export default LeftBarTabGroup;
