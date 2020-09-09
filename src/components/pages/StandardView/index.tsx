import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Timeline from "components/pages/Timeline";
import ModuleDashboard from "components/pages/ModuleDashboard";
import Dashboard from "components/pages/Dashboard";
import Exams from "components/pages/Exams";
import ExamTimetable from "components/pages/Exams/Timetable";

import "./style.scss";
import RightBar from "components/organisms/RightBar";
import classNames from "classnames";
import ModuleList from "../ModuleList";
import ModuleResources from "../ModuleResources";
import ModuleFeedback from "../ModuleFeedback";
import Container from "react-bootstrap/esm/Container";
import ExamRubrics from "../Exams/Rubrics";
import ExamGrading from "../Exams/Grading";
import ExamPastPapers from "../Exams/PastPapers";
import ModuleOverview from "../ModuleOverview";
import LeftBar from "components/organisms/LeftBar";
import { Term, TimelineEvent } from "constants/types";
import ModuleSubmissions from "../ModuleSubmissions";

interface StandardViewProps {
  toggledLeft: boolean;
  toggledRight: boolean;
  fileView: string;
  initTimelineSideBar: () => void;
  revertTimelineSideBar: () => void;
  onOverlayClick: (event: React.MouseEvent<HTMLElement>) => void;
  onSettingsClick: (event: React.MouseEvent) => void;
  onEventClick: (e?: TimelineEvent) => void;
}

const StandardView: React.FC<StandardViewProps> = ({
  toggledLeft,
  toggledRight,
  onOverlayClick,
  onSettingsClick,
  fileView,
  revertTimelineSideBar,
  initTimelineSideBar,
  onEventClick,
}: StandardViewProps) => {
  const [modulesFilter, setModulesFilter] = useState("In Progress");
  const [timelineTerm, setTimelineTerm] = useState(Term.AUTUMN);

  return (
    <div
      id="wrapper"
      className={classNames({
        toggledLeft: toggledLeft,
        toggledRight: toggledRight,
      })}
    >
      <LeftBar
        modulesFilter={modulesFilter}
        setModulesFilter={setModulesFilter}
        timelineTerm={timelineTerm}
        setTimelineTerm={setTimelineTerm}
        onEventClick={onEventClick}
      />
      <RightBar onSettingsClick={onSettingsClick} />
      <div id="sidenav-overlay" onClick={(e) => onOverlayClick(e)}></div>
      <Switch>
        <Route path="/dashboard">
          <Container className={classNames("pageContainer")}>
            <Dashboard />
          </Container>
        </Route>

        <Route exact path="/modules">
          <Container className={classNames("pageContainer")}>
            <ModuleList modulesFilter={modulesFilter} />
          </Container>
        </Route>

        <Route path="/modules/:id/dashboard">
          <Container className={classNames("pageContainer")}>
            <ModuleDashboard />
          </Container>
        </Route>

        <Route
          path="/modules/:id/overview"
          render={(props) => (
            <Container className={classNames("pageContainer")}>
              <ModuleOverview year="2021" moduleID={props.match.params.id} />
            </Container>
          )}
        ></Route>

        <Route
          path="/modules/:id/resources/:scope?"
          render={(props) => (
            <Container className={classNames("pageContainer")}>
              <ModuleResources
                year="2021"
                moduleID={props.match.params.id}
                scope={props.match.params.scope}
                view={fileView}
              />
            </Container>
          )}
        />

        <Route
          path="/modules/:id/resources-staff"
          render={(props) => (
            <Container className={classNames("pageContainer")}>
              <ModuleResources
                year="2021"
                moduleID={props.match.params.id}
                scope={props.match.params.scope}
                view="staff"
              />
            </Container>
          )}
        />

        <Route
          path="/modules/:id/submissions"
          render={(props) => (
            <Container className={classNames("pageContainer")}>
              <ModuleSubmissions
                moduleID={props.match.params.id}
                onEventClick={onEventClick}
              />
            </Container>
          )}
        ></Route>

        <Route path="/modules/:id/feedback">
          <Container className={classNames("pageContainer")}>
            <ModuleFeedback />
          </Container>
        </Route>

        <Route path="/timeline">
          <Timeline
            initSideBar={initTimelineSideBar}
            revertSideBar={revertTimelineSideBar}
            term={timelineTerm}
            setTerm={setTimelineTerm}
            onEventClick={onEventClick}
          />
        </Route>

        <Route path="/exams/overview">
          <Container className={classNames("pageContainer")}>
            <Exams />
          </Container>
        </Route>

        <Route path="/exams/timetable">
          <Container className={classNames("pageContainer")}>
            <ExamTimetable />
          </Container>
        </Route>

        <Route path="/exams/grading">
          <Container className={classNames("pageContainer")}>
            <ExamGrading />
          </Container>
        </Route>

        <Route path="/exams/rubrics">
          <Container className={classNames("pageContainer")}>
            <ExamRubrics />
          </Container>
        </Route>

        <Route path="/exams/papers">
          <Container className={classNames("pageContainer")}>
            <ExamPastPapers />
          </Container>
        </Route>

        <Route
          path="/modules/:id"
          render={(props) => (
            <Redirect to={`/modules/${props.match.params.id}/dashboard`} />
          )}
        />
        <Route path="/exams" render={() => <Redirect to="/exams/overview" />} />
        <Route path="/" render={() => <Redirect to="/dashboard" />} />
      </Switch>
    </div>
  );
};

export default StandardView;
