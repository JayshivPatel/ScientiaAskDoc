import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./style.module.scss";

const WeekHeading: React.FC = () => {
  return (
    <>
      <Card className={styles.weekCard}>
        <Card.Header>
          <div className={styles.weekHeading}>Week 1</div>
          <div className={styles.weekDateRange}>06/10 - 10/10</div>
        </Card.Header>
        <Card.Body>
          <div className={styles.dayIndicator}>Mon</div>
          <div className={styles.dayIndicator}>Tue</div>
          <div className={styles.dayIndicator}>Wed</div>
          <div className={styles.dayIndicator}>Thu</div>
          <div className={styles.dayIndicator}>Fri</div>
        </Card.Body>
      </Card>
    </>
  );
};

export default WeekHeading;
