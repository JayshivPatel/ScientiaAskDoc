import React from "react";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import styles from "./style.module.scss";
import { faSpinner, faSortNumericDown, faSortAlphaDown, faSnowflake } from "@fortawesome/free-solid-svg-icons";

const LeftBar: React.FC = () => {
  let buttons = [
    {
			title: "Progress",
			icon: faSpinner,
    },
    {
			title: "Module Title",
			icon: faSortAlphaDown,
      active: true,
    },
    {
			title: "Module Code",
			icon: faSortNumericDown,
    },
    {
			icon: faSnowflake,
      title: "Term",
    },
  ];

  return (
    <div id={styles.leftbarWrapper}>
      <p className={styles.leftbarStatus}>1 UPDATE</p>
      <SideBarTabGroup title="Sort" buttons={buttons}/>
    </div>
  );
};

export default LeftBar;
