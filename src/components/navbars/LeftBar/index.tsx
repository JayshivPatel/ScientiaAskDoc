import React from "react";
import styles from "./style.module.scss";
import { Route, Switch } from "react-router-dom";
import LeftBarDashboard from "components/groups/LeftBarDashboard";
import LeftBarModuleList from "components/groups/LeftBarModuleList";
import LeftBarModule from "components/groups/LeftBarModule";
import LeftBarExams from "components/groups/LeftBarExams";
import LeftBarTimeline from "components/groups/LeftBarTimeline";
import { Term, TimelineEvent } from "constants/types";
import WorkDueGroup from "components/groups/WorkDueGroup";

interface LeftBarProps {
  modulesFilter: string;
  setModulesFilter: Function;
  timelineTerm: Term;
  setTimelineTerm: React.Dispatch<React.SetStateAction<Term>>;
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
          <LeftBarTimeline term={timelineTerm} setTerm={setTimelineTerm} />
        </Route>

        <Route path="/">
          <LeftBarDashboard />
        </Route>
      </Switch>

      <WorkDueGroup onEventClick={onEventClick} />
    </div>
  );
};

export default LeftBar;
