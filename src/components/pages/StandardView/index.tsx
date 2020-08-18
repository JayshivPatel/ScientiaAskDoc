import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Timeline from "components/pages/Timeline";
import ModuleOverview from "components/pages/ModuleOverview";
import Dashboard from "components/pages/Dashboard";
import Exams from "components/pages/Exams";

import "./style.scss";
import RightBar from "components/organisms/RightBar";
import classNames from "classnames";
import ModuleList from "../ModuleList";
import ModuleResources from "../ModuleResources";
import ModuleFeedback from "../ModuleFeedback";
import LeftBarDashboard from "components/organisms/LeftBarDashboard";
import LeftBarModuleList from "components/organisms/LeftBarModuleList";
import LeftBarModule from "components/organisms/LeftBarModule";
import LeftBarExams from "components/organisms/LeftBarExams";
import Container from "react-bootstrap/esm/Container";

interface StandardViewProps {
  pages: {
    name: string;
    path: string;
  }[];
  toggledLeft: boolean;
  toggledRight: boolean;
  onOverlayClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const StandardView: React.FC<StandardViewProps> = ({
  toggledLeft,
  toggledRight,
  onOverlayClick,
}: StandardViewProps) => { 
	const [modulesFilter, setModulesFilter] = useState("In Progress");

  return (
    <div
      id="wrapper"
      className={classNames({
        toggledLeft: toggledLeft,
        toggledRight: toggledRight,
      })}
    >
      <Switch>
        <Route path="/modules/:id">
          <LeftBarModule />
        </Route>

        <Route exact path="/modules">
          <LeftBarModuleList modulesFilter={modulesFilter} setModulesFilter={setModulesFilter}/>
        </Route>

        <Route path="/exams">
          <LeftBarExams />
        </Route>

        <Route path="/">
          <LeftBarDashboard />
        </Route>
      </Switch>

      <div id="sidenav-overlay" onClick={(e) => onOverlayClick(e)}></div>
      <Container className={classNames("pageContainer")}>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route exact path="/modules">
            <ModuleList modulesFilter={modulesFilter}/>
          </Route>

          <Route path="/modules/:id/overview">
            <ModuleOverview />
          </Route>

          <Route path="/modules/:id/resources/:scope?">
            <ModuleResources year="2021"/>
          </Route>

          <Route path="/modules/:id/feedback" component={ModuleFeedback} />

          <Route path="/timeline">
            <Timeline/>
          </Route>

          <Route path="/exams/overview">
            <Exams />
          </Route>

          <Route
            path="/modules/:id"
            render={(props) => (
              <Redirect to={`/modules/${props.match.params.id}/overview`} />
            )}
          />
					<Route path="/exams" render={() => <Redirect to="/exams/overview" />} />
          <Route path="/" render={() => <Redirect to="/dashboard" />} />
        </Switch>
      </Container>
      <RightBar />
    </div>
  );
};

export default StandardView;
