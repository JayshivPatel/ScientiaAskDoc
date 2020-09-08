import React from "react";
import styles from "./style.module.scss";
import { Route, Switch } from "react-router-dom";
import LeftBarDashboard from "components/organisms/LeftBarDashboard";
import LeftBarModuleList from "components/organisms/LeftBarModuleList";
import LeftBarModule from "components/organisms/LeftBarModule";
import LeftBarExams from "components/organisms/LeftBarExams";
import LeftBarTimeline from "components/organisms/LeftBarTimeline";
import { Term, TimelineEvent } from "constants/types";
import WorkDueGroup from "components/molecules/WorkDueGroup";

interface LeftBarProps {
  modulesFilter: string;
  setModulesFilter: Function;
  timelineTerm: Term;
	setTimelineTerm: React.Dispatch<React.SetStateAction<Term>>;
	onEventClick: (e?: TimelineEvent) => void;
}

const LeftBar: React.FC<LeftBarProps> = ({
  modulesFilter,
	setModulesFilter,
	timelineTerm,
	setTimelineTerm,
	onEventClick,
}) => {
  return (
    <div id={styles.leftbarWrapper}>
      <p className={styles.leftbarStatus}>2020 - 2021</p>
      <Switch>
        <Route path="/modules/:id">
          <LeftBarModule />
        </Route>

        <Route exact path="/modules">
          <LeftBarModuleList
            modulesFilter={modulesFilter}
            setModulesFilter={setModulesFilter}
          />
        </Route>

        <Route path="/exams">
          <LeftBarExams />
        </Route>

        <Route path="/timeline">
          <LeftBarTimeline
            term={timelineTerm}
            setTerm={setTimelineTerm}
          />
        </Route>

        <Route path="/">
          <LeftBarDashboard />
        </Route>
      </Switch>

			<WorkDueGroup onEventClick={onEventClick}/>
    </div>
  );
};

export default LeftBar;
