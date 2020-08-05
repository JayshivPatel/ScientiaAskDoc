import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ExamplePage from "components/templates/ExamplePage";
import LeftBar from "components/organisms/LeftBar";
import "./style.scss";
import RightBar from "components/organisms/RightBar";
import classNames from "classnames";

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
  pages,
  toggledLeft,
  toggledRight,
  onOverlayClick,
}: StandardViewProps) => {
  const topBarRoutes = pages.map(({ name, path }) => (
    <Route path={path} key={name}>
      <ExamplePage name={name} />
    </Route>
  ));

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
        <Route exact path="/" render={() => <Redirect to="/modules" />} />
        {topBarRoutes}
      </Switch>
    </div>
  );
};

export default StandardView;
