import React from "react";
import styles from "./style.module.scss";
import CalendarGroup from "components/molecules/CalendarGroup";

const RightBar: React.FC = () => {
  return (
    <div id={styles.rightbarWrapper}>
      <p className={styles.rightbarStatus}>2020-08-05 15:08</p>
			<CalendarGroup/>
    </div>
  );
};

export default RightBar;
