import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ExamplePage from "components/templates/ExamplePage";
import LeftBar from "components/organisms/LeftBar";

interface StandardViewProps {
  pages: {
    name: string;
    path: string;
  }[];
  isToggled: boolean;
}

const StandardView: React.FC<StandardViewProps> = ({
  pages,
  isToggled,
}: StandardViewProps) => {
  const topBarRoutes = pages.map(({ name, path }) => (
    <Route path={path} key={name}>
      <ExamplePage name={name} />
    </Route>
  ));

  return (
    <div id="wrapper" className={isToggled ? "toggled" : ""}>
      <LeftBar />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/courses" />} />
        {topBarRoutes}
      </Switch>
    </div>
  );
};

export default StandardView;
