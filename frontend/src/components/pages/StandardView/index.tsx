import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ExamplePage from "components/templates/ExamplePage";
import ModuleOverview from "components/pages/ModuleOverview";

import "./style.scss";
import RightBar from "components/organisms/RightBar";
import classNames from "classnames";
import ModuleList from "../ModuleList";
import ModuleMaterials from "../ModuleMaterials";
import ModuleCoursework from "../ModuleCoursework";
import LeftBarHome from "components/organisms/LeftBarHome";
import LeftBarModuleList from "components/organisms/LeftBarModuleList";
import LeftBarModule from "components/organisms/LeftBarModule";

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
  return (
    <div
      id="wrapper"
      className={classNames({
        toggledLeft: toggledLeft,
        toggledRight: toggledRight,
      })}
    >
      <RightBar />
      <div id="sidenav-overlay" onClick={(e) => onOverlayClick(e)}></div>
      <Switch>
        <Route path="/home">
					<LeftBarHome />
          <ExamplePage name="Home" />
        </Route>

				<Route exact path="/modules">
					<LeftBarModuleList />
          <ModuleList />
        </Route>

				<Route path="/modules/:id/overview">
					<LeftBarModule/>
          <ModuleOverview />
        </Route>

				<Route path="/modules/:id/materials">
					<LeftBarModule/>
          <ModuleMaterials />
        </Route>

				<Route path="/modules/:id/coursework">
					<LeftBarModule/>
          <ModuleCoursework />
        </Route>

        <Route path="/modules/:id" render={props => <Redirect to={`/modules/${props.match.params.id}/overview`} />} />
			
				<Route path="/timetable">
					<LeftBarHome />
          <ExamplePage name="Timetable" />
        </Route>

				<Route path="/exams">
					<LeftBarHome />
          <ExamplePage name="Exams" />
        </Route>

        <Route path="/" render={() => <Redirect to="/home" />} />
      </Switch>
    </div>
  );
};

export default StandardView;
