import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ExamplePage from "components/templates/ExamplePage";
import LeftBar from "components/organisms/LeftBar";
import "./style.scss"

interface StandardViewProps {
  pages: {
    name: string;
    path: string;
  }[];
	toggledLeft: boolean;
  onOverlayClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const StandardView: React.FC<StandardViewProps> = ({
  pages,
	toggledLeft,
	onOverlayClick,
}: StandardViewProps) => {
  const topBarRoutes = pages.map(({ name, path }) => (
    <Route path={path} key={name}>
      <ExamplePage name={name} />
    </Route>
  ));

  return (
    <div id="wrapper" className={toggledLeft ? "toggledLeft" : ""}>
      <LeftBar />
			<div id="sidenav-overlay" onClick={e => onOverlayClick(e)}></div>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/modules" />} />
        {topBarRoutes}
      </Switch>
    </div>
  );
};

export default StandardView;
