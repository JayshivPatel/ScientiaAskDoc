import React, { Suspense, useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"
import "./style.scss"
import classNames from "classnames"
import { CalendarEvent, Module, TimelineEvent } from "constants/types"
import LoadingScreen from "components/suspense/LoadingScreen"
import RightBar from "components/navbars/RightBar"
import LeftBar from "components/navbars/LeftBar"
import { request } from "../../utils/api"
import { api, methods } from "../../constants/routes"
import { YEAR_OF_NEW_CODES } from "../../constants/doc"
import ModulesSubRouter from "./subrouters/ModulesSubRouter"
import { TimelineSubRoute } from "./subrouters/TimelineSubRoute"

const Timeline = React.lazy(() => import("components/pages/Timeline"))
const ModuleDashboard = React.lazy(
  () => import("components/pages/modulePages/ModuleDashboard")
)
const Dashboard = React.lazy(() => import("components/pages/Dashboard"))
const ModuleResources = React.lazy(
  () => import("./modulePages/ModuleResources")
)
const ModuleResource = React.lazy(() => import("./modulePages/ModuleResource"))
const ModuleFeedbackResources = React.lazy(
  () => import("./modulePages/ModuleFeedbackResources")
)
const ModuleFeedbackResource = React.lazy(
  () => import("./modulePages/ModuleFeedbackResource")
)
const ExamGrading = React.lazy(() => import("./exams/Grading"))
const ExamPastPapers = React.lazy(() => import("./exams/PastPapers"))
const ModuleSubmissions = React.lazy(
  () => import("./modulePages/ModuleSubmissions")
)

interface StandardViewProps {
  toggledLeft: boolean
  toggledRight: boolean
  initTimelineSideBar: () => void
  revertTimelineSideBar: () => void
  onOverlayClick: (event: React.MouseEvent<HTMLElement>) => void
  onSettingsClick: (event?: React.MouseEvent) => void
  onEventClick: (e?: TimelineEvent) => void
  onCalendarClick: (e?: CalendarEvent) => void
  year: string
}

interface YearDependentRoutesProps {
  year: string
  timelineConfig: {
    onEventClick: (e?: TimelineEvent) => void
    initSideBar: () => void
    revertSideBar: () => void
  }
}

const YearDependentSubRoutes: React.FC<YearDependentRoutesProps> = ({
  year,
  timelineConfig,
}: YearDependentRoutesProps) => {
  let { path, url } = useRouteMatch()
  const [modules, setModules] = useState<Module[]>([])
  useEffect(() => {
    const onSuccess = (modules: Module[]) => {
      setModules(
        modules.map((module) => ({
          title: module.title,
          code: year < YEAR_OF_NEW_CODES ? `CO${module.code}` : module.code,
          can_manage: module.can_manage,
          has_materials: module.has_materials,
          // Hardcoded stuff, we don't have this data currently
          terms: ["Autumn", "Spring", "Summer"],
          content: "",
          subscriptionLevel: (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3,
        }))
      )
    }

    request({
      endpoint: api.MATERIALS_COURSES(year),
      method: methods.GET,
      onSuccess: onSuccess,
      onError: (message) => console.log(`Failed to obtain modules: ${message}`),
    })
  }, [year])

  return (
    <Switch>
      <Route path={`${path}/modules`}>
        <ModulesSubRouter year={year} modules={modules} />
      </Route>

      <Route
        path={`${path}/timeline`}
        render={(props) => {
          return (
            <TimelineSubRoute
              timelineConfig={timelineConfig}
              modules={modules}
              year={props.match.params.year}
            />
          )
        }}
      />
    </Switch>
  )
}

const StandardView: React.FC<StandardViewProps> = ({
  toggledLeft,
  toggledRight,
  onOverlayClick,
  onSettingsClick,
  revertTimelineSideBar,
  initTimelineSideBar,
  onEventClick,
  onCalendarClick,
  year,
}: StandardViewProps) => {
  const timelineConfig = {
    onEventClick: onEventClick,
    initSideBar: initTimelineSideBar,
    revertSideBar: revertTimelineSideBar,
  }

  return (
    <div
      id="wrapper"
      className={classNames({
        toggledLeft: toggledLeft,
        toggledRight: toggledRight,
      })}
    >
      <LeftBar year={year} />
      <RightBar
        onSettingsClick={onSettingsClick}
        onCalendarClick={onCalendarClick}
      />
      <div id="sidenav-overlay" onClick={(e) => onOverlayClick(e)} />
      <Suspense fallback={<LoadingScreen successful={<></>} />}>
        <Switch>
          <Redirect exact from="/" to={`/${year}/modules`} />
          <Redirect exact from={`/${year}`} to={`/${year}/modules`} />
          <Redirect
            exact
            from={`/${year}/modules/:id`}
            to={`/${year}/modules/:id/resources`}
          />

          <Route path="/dashboard">
            <Container className={classNames("pageContainer")}>
              <Dashboard />
            </Container>
          </Route>

          <Route
            path="/:year"
            render={(props) => {
              return (
                <YearDependentSubRoutes
                  year={props.match.params.year}
                  timelineConfig={timelineConfig}
                />
              )
            }}
          />
        </Switch>
      </Suspense>
    </div>
  )
}

export default StandardView
