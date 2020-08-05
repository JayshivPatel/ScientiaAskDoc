import React from "react";
import styles from "./style.module.scss";
import CalendarGroup from "components/molecules/CalendarGroup";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


const RightBar: React.FC = () => {
	let buttons = [
    {
			title: "Settings",
			icon: faCog,
    },
    {
			title: "Sign Out",
			icon: faSignOutAlt,
    },
	];
	
  return (
    <div id={styles.rightbarWrapper}>
      <p className={styles.rightbarStatus}>2020-08-05 15:08</p>
			<CalendarGroup/>
			<SideBarTabGroup title="Account" buttons={buttons}/>
    </div>
  );
};

export default RightBar;
