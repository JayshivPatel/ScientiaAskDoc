import React, { Suspense, useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import { Helmet } from "react-helmet"
import { Redirect, Route, Switch } from "react-router-dom"
import moment from "moment"
import "./style.scss"
import classNames from "classnames"
import {
  CalendarEvent,
  Module,
  OldTerm,
  ProgressStatus,
  Term,
  TimelineEvent,
} from "constants/types"
import LoadingScreen from "components/suspense/LoadingScreen"
import RightBar from "components/navbars/RightBar"
import LeftBar from "components/navbars/LeftBar"
import { request } from "../../utils/api"
import { api, methods } from "../../constants/routes"
import { YEAR_OF_NEW_CODES } from "../../constants/doc"
import getDefaultTerm from "./Timeline/defaultTerms"

const Timeline = React.lazy(() => import("components/pages/Timeline"))
const ModuleDashboard = React.lazy(
  () => import("components/pages/modulePages/ModuleDashboard")
)
const Dashboard = React.lazy(() => import("components/pages/Dashboard"))
const ModuleList = React.lazy(() => import("./ModuleList"))
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
  fileView: string
  initTimelineSideBar: () => void
  revertTimelineSideBar: () => void
  onOverlayClick: (event: React.MouseEvent<HTMLElement>) => void
  onSettingsClick: (event?: React.MouseEvent) => void
  onEventClick: (e?: TimelineEvent) => void
  onCalendarClick: (e?: CalendarEvent) => void
  year: string
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
  onCalendarClick,
  year,
}: StandardViewProps) => {
  const [modulesFilter, setModulesFilter] = useState("In Progress")
  const [timelineTerm, setTimelineTerm] = useState<OldTerm>("Autumn")
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
          progressPercent: Math.floor(Math.random() * 100),
          progressStatus: ProgressStatus.IN_PROGRESS,
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

  const KNOWN_NUMBER_OF_TERMS = 6
  const [activeTerm, setActiveTerm] = useState<Term>(getDefaultTerm())
  const [terms, setTerms] = useState<Term[]>([])

  useEffect(() => {
    function getCurrentTerm(terms: Term[]): Term {
      const today = new Date().getTime()
      return terms.find(
        (term) => term.start.getTime() <= today && today <= term.end.getTime()
      ) as Term
    }

    function adjustToNextMonday(date: Date): Date {
      const MONDAY = 1
      if (moment(date).isoWeekday() <= MONDAY)
        return moment(date).isoWeekday(MONDAY).toDate()
      return moment(date).add(1, "weeks").isoWeekday(MONDAY).toDate()
    }

    const onSuccess = (data: Term[]) => {
      let terms = data
        .map((t) => {
          return {
            ...t,
            start: adjustToNextMonday(new Date(t.start)),
            end: new Date(t.end),
          }
        })
        .sort((t1, t2) => (t1.end < t2.end ? -1 : 1))
      if (terms.length === KNOWN_NUMBER_OF_TERMS) {
        setActiveTerm(getCurrentTerm(terms))
        setTerms(terms)
      } else console.error(`Invalid number of terms received: ${terms}`)
    }

    request({
      endpoint: api.DBC_TERMS(year),
      method: methods.GET,
      onSuccess: onSuccess,
      onError: (message) => console.log(`Failed to obtain terms: ${message}`),
    })
  }, [year])

  return (
    <div
      id="wrapper"
      className={classNames({
        toggledLeft: toggledLeft,
        toggledRight: toggledRight,
      })}>
      <LeftBar
        modulesFilter={modulesFilter}
        setModulesFilter={setModulesFilter}
        timelineTerm={timelineTerm}
        setTimelineTerm={setTimelineTerm}
        onEventClick={onEventClick}
        year={year}
      />
      <RightBar
        onSettingsClick={onSettingsClick}
        onCalendarClick={onCalendarClick}
      />
      <div id="sidenav-overlay" onClick={(e) => onOverlayClick(e)} />
      <Suspense fallback={<LoadingScreen successful={<></>} />}>
        <Switch>
          <Redirect exact from="/" to="/modules" />
          <Redirect exact from="/modules/:id" to="/modules/:id/resources" />

          <Route path="/dashboard">
            <Container className={classNames("pageContainer")}>
              <Dashboard />
            </Container>
          </Route>

          <Route exact path="/modules">
            <Container className={classNames("pageContainer")}>
              <ModuleList modules={modules} modulesFilter={modulesFilter} />
            </Container>
          </Route>

          <Route
            path="/modules/:id/dashboard"
            render={(props) => {
              let moduleTitle =
                modules.find((module) => module.code === props.match.params.id)
                  ?.title || ""
              return (
                <Container className={classNames("pageContainer")}>
                  <ModuleDashboard
                    year={year}
                    moduleTitle={moduleTitle}
                    moduleID={props.match.params.id}
                  />
                </Container>
              )
            }}
          />

          <Route
            path="/modules/:id/resources/:category/:index"
            render={(props) => {
              let moduleTitle =
                modules.find((module) => module.code === props.match.params.id)
                  ?.title || ""
              return (
                <Container
                  className={classNames("pageContainer centerContents")}>
                  <ModuleResource
                    moduleTitle={moduleTitle}
                    year={year}
                    course={props.match.params.id}
                    category={props.match.params.category}
                    index={+props.match.params.index}
                  />
                </Container>
              )
            }}
          />

          <Route
            path="/modules/:id/resources/:scope?"
            render={(props) => {
              let moduleTitle =
                modules.find((module) => module.code === props.match.params.id)
                  ?.title || ""
              let canManage =
                modules.find((module) => module.code === props.match.params.id)
                  ?.can_manage || false
              return (
                <Container className={classNames("pageContainer")}>
                  <ModuleResources
                    year={year}
                    moduleTitle={moduleTitle}
                    moduleID={props.match.params.id}
                    scope={props.match.params.scope}
                    view={fileView}
                    canManage={canManage}
                  />
                </Container>
              )
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

          <Route
            path="/modules/:id/feedback/:exercise"
            render={(props) => {
              let moduleTitle =
                modules.find((module) => module.code === props.match.params.id)
                  ?.title || ""
              return (
                <Container
                  className={classNames("pageContainer centerContents")}>
                  <ModuleFeedbackResource
                    moduleTitle={moduleTitle}
                    year={year}
                    course={props.match.params.id}
                    exercise={parseInt(props.match.params.exercise)}
                  />
                </Container>
              )
            }}
          />

          <Route
            path="/modules/:id/feedback"
            render={(props) => {
              let moduleTitle =
                modules.find((module) => module.code === props.match.params.id)
                  ?.title || ""
              return (
                <Container className={classNames("pageContainer")}>
                  <ModuleFeedbackResources
                    year={year}
                    moduleTitle={moduleTitle}
                    moduleID={props.match.params.id}
                  />
                </Container>
              )
            }}
          />

          <Route path="/timeline">
            <Timeline
              initSideBar={initTimelineSideBar}
              revertSideBar={revertTimelineSideBar}
              activeTerm={activeTerm}
              setActiveTerm={setActiveTerm}
              terms={terms}
              onEventClick={onEventClick}
              modules={modules}
              year={year}
            />
          </Route>
        </Switch>
      </Suspense>
    </div>
  )
}

export default StandardView
