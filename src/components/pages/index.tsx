import React, { useEffect, useState, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./style.scss";
import classNames from "classnames";
import { Term, TimelineEvent, ProgressStatus, Module } from "constants/types";
import Container from "react-bootstrap/esm/Container";
import LoadingScreen from "components/suspense/LoadingScreen";
import { request } from "utils/api";
import { api, methods } from "constants/routes";
import { modulesList } from "./ModuleList/list";

const Timeline = React.lazy(() => import("components/pages/Timeline"));
const ModuleDashboard = React.lazy(
  () => import("components/pages/modulePages/ModuleDashboard")
);
const Dashboard = React.lazy(() => import("components/pages/Dashboard"));
const Exams = React.lazy(() => import("components/pages/Exams"));
const ExamTimetable = React.lazy(
  () => import("components/pages/Exams/Timetable")
);
const RightBar = React.lazy(() => import("components/navbars/RightBar"));
const ModuleList = React.lazy(() => import("./ModuleList"));
const ModuleResources = React.lazy(() => import("./modulePages/ModuleResources"));
const ModuleFeedback = React.lazy(() => import("./modulePages/ModuleFeedback"));
const ExamRubrics = React.lazy(() => import("./Exams/Rubrics"));
const ExamGrading = React.lazy(() => import("./Exams/Grading"));
const ExamPastPapers = React.lazy(() => import("./Exams/PastPapers"));
const ModuleOverview = React.lazy(() => import("./modulePages/ModuleOverview"));
const LeftBar = React.lazy(() => import("components/navbars/LeftBar"));
const ModuleSubmissions = React.lazy(() => import("./modulePages/ModuleSubmissions"));

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
  const [modules, setModules] = useState<Module[]>(modulesList);
	// const modules : Module[] = modulesList;
  // useEffect(() => {
  //   const onSuccess = (data: { [k: string]: any }[]) => {
  //     setModules(data.map(({ title, code, has_materials, can_manage }) => ({
  //       title,
  //       code: `CO${code}`,
  //       can_manage,
  //       has_materials,
  //       // Hardcoded stuff, we don't have this data currently
  //       terms: [Term.AUTUMN],
  //       progressPercent: Math.floor(Math.random() * 100),
  //       progressStatus: ProgressStatus.IN_PROGRESS,
  //       content: "",
  //     })))
  //   };

  //  request({
  //    url: api.MATERIALS_COURSES(year),
  //    method: methods.GET,
  //    onSuccess: onSuccess,
  //    onError: (message) => console.log(`Failed to obtain modules: ${message}`),
  //  });
  // }, [year]);

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
              <ModuleList modules={modules} modulesFilter={modulesFilter}/>
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
            render={(props) => {
              let can_manage = modules.find(module => module.code === props.match.params.id)?.can_manage || false;
              return (
                <Container className={classNames("pageContainer")}>
                  <ModuleResources
                    year={year}
                    moduleID={props.match.params.id}
                    scope={props.match.params.scope}
                    view={fileView}
                    can_manage={can_manage}
                  />
                </Container>
              );
            }}
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
              modules={modules}
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

          <Route
            path="/exams/papers/:scope?"
            render={(props) => (
              <Container className={classNames("pageContainer")}>
                <ExamPastPapers
                  view={fileView}
                  scope={props.match.params.scope}
                />
              </Container>
            )}
          />

          <Route
            path="/modules/:id"
            render={(props) => (
              <Redirect to={`/modules/${props.match.params.id}/dashboard`} />
            )}
          />
          <Route
            path="/exams"
            render={() => <Redirect to="/exams/papers" />}
          />
          <Route path="/" render={() => <Redirect to="/dashboard" />} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default StandardView;
