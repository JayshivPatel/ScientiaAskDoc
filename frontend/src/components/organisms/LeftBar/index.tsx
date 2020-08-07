import React from "react";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import styles from "./style.module.scss";
import { Route , Switch} from "react-router-dom";

const LeftBar: React.FC = () => {
  let sortButtons = [
    {
			title: "Progress",
    },
    {
			title: "Module Title",
      active: true,
    },
    {
			title: "Module Code",
    },
    {
      title: "Term",
    },
	];
	
	let outlineButtons = [
    {
			title: "Overview",
      active: true,
    },
    {
			title: "Coursework",
    },
    {
			title: "Materials",
    },
    {
      title: "Piazza",
		},
		{
      title: "Policies",
		},
		{
      title: "FAQs",
    },
  ];

  return (
    <div id={styles.leftbarWrapper}>
      <p className={styles.leftbarStatus}>1 UPDATE</p>

			<Switch>

				<Route path="/modules/:id">
					<SideBarTabGroup title="Outline" buttons={outlineButtons}/>
        </Route>

				<Route path="/">
					<SideBarTabGroup title="Sort" buttons={sortButtons}/>
        </Route>

      </Switch>

    </div>
  );
};

export default LeftBar;
