import React from "react";
import "./App.scss";
import ExampleCourses from "./pages/ExampleCourses";
import ExampleExams from "./pages/ExampleExams";
import ExampleOther from "./pages/ExampleOther";
import ExampleTimetable from "./pages/ExampleTimetable";

import TopBar from "./organisms/TopBar/TopBar";
import BottomBar from "./organisms/BottomBar/BottomBar";
import { Redirect, Switch, Route } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App: React.FC = () => {
  return (
    <>
      <TopBar />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/courses" />} />

        <Route path="/courses">
          <ExampleCourses />
        </Route>
        <Route path="/timetable">
          <ExampleTimetable />
        </Route>
        <Route path="/exams">
          <ExampleExams />
        </Route>
        <Route path="/other">
          <ExampleOther />
        </Route>
      </Switch>
      <BottomBar />
    </>
  );
};

export default App;
