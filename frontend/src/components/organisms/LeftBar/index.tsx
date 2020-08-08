import React from "react";
import styles from "./style.module.scss";

export interface LeftBarProps{
	children: React.ReactNode;
}

const LeftBar: React.FC<LeftBarProps> = ({children}: LeftBarProps) => {
  return (
    <div id={styles.leftbarWrapper}>
      <p className={styles.leftbarStatus}>1 DEADLINE</p>
			{children}
    </div>
  );
};

export default LeftBar;
