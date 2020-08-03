import React from "react";
import LeftBarTabGroup from "components/molecules/LeftBarTabGroup";
import styles from "./style.module.scss"

const LeftBar: React.FC = () => {
  return (
    <div id={styles.sidebarWrapper}>
      <p className={styles.sidebarStatus}>1 UPDATE</p>
      <LeftBarTabGroup />
    </div>
  );
};

export default LeftBar;
