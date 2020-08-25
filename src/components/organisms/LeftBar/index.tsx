import React from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

export interface LeftBarProps {
  children: React.ReactNode;
}

const LeftBar: React.FC<LeftBarProps> = ({ children }: LeftBarProps) => {
  return (
    <div id={styles.leftbarWrapper}>
      <p className={styles.leftbarStatus}>
        <Link to="/Dashboard">1 NOTICE</Link>
      </p>
      {children}
    </div>
  );
};

export default LeftBar;
