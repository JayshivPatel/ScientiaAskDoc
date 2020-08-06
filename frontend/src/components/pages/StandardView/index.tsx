import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ExamplePage from "components/templates/ExamplePage";
import LeftBar from "components/organisms/LeftBar";
import "./style.scss";
import RightBar from "components/organisms/RightBar";
import classNames from "classnames";
import ModulePage from "../ModulePage";

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
      <LeftBar />
      <RightBar />
      <div id="sidenav-overlay" onClick={(e) => onOverlayClick(e)}></div>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" key="Home">
          <ExamplePage name="Home" />
        </Route>

				<Route path="/modules" key="Modules">
          <ModulePage />
        </Route>

				<Route path="/timetable" key="Timetable">
          <ExamplePage name="Timetable" />
        </Route>

				<Route path="/exams" key="Exams">
          <ExamplePage name="Exams" />
        </Route>
      </Switch>
    </div>
  );
};

export default StandardView;
