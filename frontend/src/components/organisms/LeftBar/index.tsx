import React from "react";
import LeftBarTabGroup from "components/molecules/LeftBarTabGroup";
import styles from "./style.module.scss"

const LeftBar: React.FC = () => {
  return (
    <div id={styles.leftbarWrapper}>
      <p className={styles.leftbarStatus}>1 UPDATE</p>
      <LeftBarTabGroup />
    </div>
  );
};

export default LeftBar;
