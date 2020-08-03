import React from "react";
import "./App.scss";
import ExamplePage from "./templates/ExamplePage";

import TopBar from "./organisms/TopBar";
import BottomBar from "./organisms/BottomBar";
import { Redirect, Switch, Route } from "react-router-dom";
import {
  faBookOpen,
  faEllipsisH,
  faCalendarWeek,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import LeftBar from "./organisms/LeftBar";

type MyState = {
	isToggled: boolean;
};

class App extends React.Component<{}, MyState> {
	constructor(props: {}) {
    super(props);
    this.state = {isToggled: false};
	}
	
  handleIconClick(e: React.MouseEvent<HTMLImageElement>) {
		e.preventDefault();
		this.setState(state => ({
      isToggled: !state.isToggled
		}));
  }

  render() {
    const horizontalBarPages = [
      { name: "Courses", path: "/courses", icon: faChalkboardTeacher },
      { name: "Timetable", path: "/timetable", icon: faCalendarWeek },
      { name: "Exams", path: "/exams", icon: faBookOpen },
      { name: "Other", path: "/other", icon: faEllipsisH },
    ];

    const topBarRoutes = horizontalBarPages.map(({ name, path }) => (
      <Route path={path} key={name}>
        <ExamplePage name={name} />
      </Route>
    ));

    return (
      <>
        <TopBar pages={horizontalBarPages} onIconClick={e => this.handleIconClick(e)}/>

        <div id="wrapper" className={this.state.isToggled ? "toggled" : ""}>
          <LeftBar />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/courses" />} />
            {topBarRoutes}
          </Switch>
        </div>

        <BottomBar pages={horizontalBarPages} />
      </>
    );
  }
}

export default App;
