import React from "react";
import styles from "./style.module.scss";
import { Route, Switch } from "react-router-dom";
import LeftBarDashboard from "components/organisms/LeftBarDashboard";
import LeftBarModuleList from "components/organisms/LeftBarModuleList";
import LeftBarModule from "components/organisms/LeftBarModule";
import LeftBarExams from "components/organisms/LeftBarExams";
import LeftBarTimeline from "components/organisms/LeftBarTimeline";

interface LeftBarProps {
	modulesFilter: string;
	setModulesFilter: Function;
}

const LeftBar: React.FC<LeftBarProps> = ({modulesFilter, setModulesFilter}) => {
  return (
    <div id={styles.leftbarWrapper}>
      <p className={styles.leftbarStatus}>
        2020 - 2021
      </p>
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
          <LeftBarTimeline />
        </Route>

        <Route path="/">
          <LeftBarDashboard />
        </Route>
      </Switch>
    </div>
  );
};

export default LeftBar;
