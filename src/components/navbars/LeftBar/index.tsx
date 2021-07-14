import React from "react";
import styles from "./style.module.scss";
import { Route, Switch } from "react-router-dom";
import SideBarLinkGroup from "components/groups/SideBarLinkGroup";
import SideBarOutlineGroup from "components/groups/SideBarOutlineGroup";
import { OldTerm, TimelineEvent } from "constants/types";

interface LeftBarProps {
  modulesFilter: string;
  setModulesFilter: Function;
  timelineTerm: OldTerm;
  setTimelineTerm: React.Dispatch<React.SetStateAction<OldTerm>>;
  onEventClick: (e?: TimelineEvent) => void;
  year: string;
}

const LeftBar: React.FC<LeftBarProps> = ({
  modulesFilter,
  setModulesFilter,
  timelineTerm,
  setTimelineTerm,
  onEventClick,
  year,
}) => {
  const displayYear = `20${year.substring(0, 2)} - 20${year.substring(2, 4)}`;
  return (
    <div id={styles.leftbarWrapper}>
      <p className={styles.leftbarStatus}>{displayYear}</p>
      <Switch>
        <Route path="/modules/:id">
          <SideBarOutlineGroup />
        </Route>

        <Route exact path="/modules">
          {/*
						<SideBarFilterGroup
							modulesFilter={modulesFilter}
							setModulesFilter={setModulesFilter}
						/>
					*/}
          <SideBarLinkGroup />
        </Route>
        {/*
					<Route path="/exams">
					  <SideBarExamsGroup />
					</Route>

					<Route path="/timeline">
					  <SideBarTermsGroup term={timelineTerm} setTerm={setTimelineTerm} />
					</Route>
				 */}
        <Route path="/">
          <SideBarLinkGroup />
        </Route>
      </Switch>

      {/*<WorkDueGroup onEventClick={onEventClick} />*/}
    </div>
  );
};

export default LeftBar;
