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
      <Switch>
        <Route path="/modules/:id">
          <LeftBarModule />
        </Route>

        <Route exact path="/modules">
          <LeftBarModuleList />
        </Route>

        <Route path="/">
          <LeftBarHome />
        </Route>
      </Switch>

      <RightBar />
      <div id="sidenav-overlay" onClick={(e) => onOverlayClick(e)}></div>

      <Switch>
        <Route path="/home">
          <ExamplePage name="Home" />
        </Route>

        <Route exact path="/modules">
          <ModuleList />
        </Route>

        <Route path="/modules/:id/overview">
          <ModuleOverview />
        </Route>

        <Route path="/modules/:id/materials">
          <ModuleMaterials />
        </Route>

        <Route path="/modules/:id/coursework">
          <ModuleCoursework />
        </Route>

        <Route path="/timeline">
          <ExamplePage name="Timeline" />
        </Route>

        <Route path="/exams">
          <ExamplePage name="Exams" />
        </Route>

        <Route
          path="/modules/:id"
          render={(props) => (
            <Redirect to={`/modules/${props.match.params.id}/overview`} />
          )}
        />
        <Route path="/" render={() => <Redirect to="/home" />} />
      </Switch>
    </div>
  );
};

export default StandardView;
