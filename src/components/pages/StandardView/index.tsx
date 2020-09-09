import React, { useState, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./style.scss";
import classNames from "classnames";
import { Term, TimelineEvent } from "constants/types";
import Container from "react-bootstrap/esm/Container";
import LoadingScreen from "components/molecules/LoadingScreen";

const Timeline = React.lazy(() => import("components/pages/Timeline"));
const ModuleDashboard = React.lazy(
  () => import("components/pages/ModuleDashboard")
);
const Dashboard = React.lazy(() => import("components/pages/Dashboard"));
const Exams = React.lazy(() => import("components/pages/Exams"));
const ExamTimetable = React.lazy(
  () => import("components/pages/Exams/Timetable")
);
const RightBar = React.lazy(() => import("components/organisms/RightBar"));
const ModuleList = React.lazy(() => import("../ModuleList"));
const ModuleResources = React.lazy(() => import("../ModuleResources"));
const ModuleFeedback = React.lazy(() => import("../ModuleFeedback"));
const ExamRubrics = React.lazy(() => import("../Exams/Rubrics"));
const ExamGrading = React.lazy(() => import("../Exams/Grading"));
const ExamPastPapers = React.lazy(() => import("../Exams/PastPapers"));
const ModuleOverview = React.lazy(() => import("../ModuleOverview"));
const LeftBar = React.lazy(() => import("components/organisms/LeftBar"));
const ModuleSubmissions = React.lazy(() => import("../ModuleSubmissions"));

interface StandardViewProps {
  toggledLeft: boolean;
  toggledRight: boolean;
  fileView: string;
  initTimelineSideBar: () => void;
  revertTimelineSideBar: () => void;
  onOverlayClick: (event: React.MouseEvent<HTMLElement>) => void;
  onSettingsClick: (event: React.MouseEvent) => void;
  onEventClick: (e?: TimelineEvent) => void;
  year: string;
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
  year,
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
      <Suspense fallback={<LoadingScreen successful={<></>} />}>
        <LeftBar
          modulesFilter={modulesFilter}
          setModulesFilter={setModulesFilter}
          timelineTerm={timelineTerm}
          setTimelineTerm={setTimelineTerm}
          onEventClick={onEventClick}
          year={year}
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

          <Route
            path="/modules/:id/dashboard"
            render={(props) => (
              <Container className={classNames("pageContainer")}>
                <ModuleDashboard year={year} moduleID={props.match.params.id} />
              </Container>
            )}
          />

          <Route
            path="/modules/:id/overview"
            render={(props) => (
              <Container className={classNames("pageContainer")}>
                <ModuleOverview year={year} moduleID={props.match.params.id} />
              </Container>
            )}
          />

          <Route
            path="/modules/:id/resources/:scope?"
            render={(props) => (
              <Container className={classNames("pageContainer")}>
                <ModuleResources
                  year={year}
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
                  year={year}
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
          />

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
          <Route
            path="/exams"
            render={() => <Redirect to="/exams/overview" />}
          />
          <Route path="/" render={() => <Redirect to="/dashboard" />} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default StandardView;
