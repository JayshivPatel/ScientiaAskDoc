import React, { useState, useEffect, Suspense } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import "./style.scss"
import classNames from "classnames"
import {
  Term,
  TimelineEvent,
  Module,
  CalendarEvent,
  ProgressStatus,
  SubscriptionLevel,
  TimelineEventDict,
} from "constants/types"
import Container from "react-bootstrap/Container"
import LoadingScreen from "components/suspense/LoadingScreen"
// import { request } from "utils/api";
import authenticationService from "utils/auth"
import { modulesList } from "./ModuleList/list"
import RightBar from "components/navbars/RightBar"
import LeftBar from "components/navbars/LeftBar"
import { request } from "../../utils/api"
import { api, methods } from "../../constants/routes"
import { YEAR_OF_NEW_CODES } from "../../constants/doc"
import {ModuleTracks} from "./Timeline";
import {dateNeutralized, toDayCount} from "../../utils/functions";
import moment from "moment"

const Timeline = React.lazy(() => import("components/pages/Timeline"))
const ModuleDashboard = React.lazy(() =>
  import("components/pages/modulePages/ModuleDashboard")
)
const Dashboard = React.lazy(() => import("components/pages/Dashboard"))
const ModuleList = React.lazy(() => import("./ModuleList"))
const ModuleResources = React.lazy(() =>
  import("./modulePages/ModuleResources")
)
const ModuleFeedback = React.lazy(() => import("./modulePages/ModuleFeedback"))
const ExamGrading = React.lazy(() => import("./exams/Grading"))
const ExamPastPapers = React.lazy(() => import("./exams/PastPapers"))
const ModuleOverview = React.lazy(() => import("./modulePages/ModuleOverview"))
const ModuleSubmissions = React.lazy(() =>
  import("./modulePages/ModuleSubmissions")
)
const HandIns = React.lazy(() => 
  import("./HandIns")
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
  const [timelineTerm, setTimelineTerm] = useState<Term>("Autumn")
  const [modules, setModules] = useState<Module[]>([])
  const [timelineEvents, setTimelineEvents] = useState<TimelineEventDict>({})
  const [modulesTracks, setModulesTracks] = useState<ModuleTracks>({})
  const currentUser = authenticationService.getUserInfo()["username"]
  useEffect(() => {
    const onSuccess = (data: { [k: string]: any }[]) => {
      setModules(
        data.map((module) => ({
          title: module.title,
          code: year < YEAR_OF_NEW_CODES ? `CO${module.code}` : module.code,
          canManage: module.can_manage,
          hasMaterials: module.has_materials,
          // Hardcoded stuff, we don't have this data currently
          terms: ["Autumn"],
          progressPercent: Math.floor(Math.random() * 100),
          progressStatus: ProgressStatus.IN_PROGRESS,
          content: "",
          subscriptionLevel: Math.floor(Math.random() * 3) + 1 as SubscriptionLevel,
        }))
      )
    }

    request<{ [k: string]: any }[]>({
      api: api.MATERIALS_COURSES(year),
      method: methods.GET,
    })
    .then(onSuccess)
    .catch(message => console.log(`Failed to obtain modules: ${message}`))
  }, [year])

  const eventsOverlaps = (e1: TimelineEvent, e2: TimelineEvent) => {
    return (
      toDayCount(e1.startDate) <= toDayCount(e2.endDate) &&
      toDayCount(e1.endDate) >= toDayCount(e2.startDate)
    )
  }

  useEffect(() => {
    const newEvents: { [pair: string]: TimelineEvent[] } = {}
    for (const module of modules) {
      request<TimelineEvent[]>({
        api: api.CATE_COURSE_EXERCISES(module.code, currentUser),
        method: methods.GET, 
      })
      .then(data => {
        if (data) {
          newEvents[module.code] = []
          data.forEach((exercise) => {
            newEvents[module.code][exercise.id] = dateNeutralized(exercise, 'startDate', 'endDate')
          })
          setTimelineEvents({ ...newEvents })
        }
      })
      .catch(message => console.log(`Failed to obtain exercises: ${message}`))
    }
  }, [modules])

  useEffect(() => {    
    let modulesTracks: ModuleTracks = {}
    modules.forEach(({ code }) => {
      modulesTracks[code] = [[], []]
    })

    for (const key in timelineEvents) {
      for (const id in timelineEvents[key]) {
        const event = timelineEvents[key][id]
        const tracks: TimelineEvent[][] = modulesTracks[event.moduleCode] ?? []
        let isPlaced = false
        for (const track of tracks) {
          if (track.every((te) => !eventsOverlaps(te, event))) {
            isPlaced = true
            track.push(event)
            break
          }
        }
        if (!isPlaced) {
          tracks.push([event])
        }
      }
    }
    setModulesTracks(modulesTracks)
  }, [timelineEvents])

  useEffect(() => {
    console.log(modulesList.length)
  }, [modulesList])

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
      <div id="sidenav-overlay" onClick={(e) => onOverlayClick(e)}></div>
      <Suspense fallback={<LoadingScreen successful={<></>} />}>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Redirect exact from="/modules/:id" to="/modules/:id/dashboard" />
          
					  <Route path="/dashboard">
						<Container className={classNames("pageContainer")}>
						  <Dashboard onEventClick={onEventClick}/>
						</Container>
					  </Route>
					
          <Route exact path="/modules">
            <Container className={classNames("pageContainer")}>
              <ModuleList modules={modules} modulesFilter={modulesFilter} />
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
              let canManage =
                modules.find((module) => module.code === props.match.params.id)
                  ?.canManage || false
              return (
                <Container className={classNames("pageContainer")}>
                  <ModuleResources
                    year={year}
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
                  timelineEvents={timelineEvents}
                />
              </Container>
            )}
          />

          <Route
            path="/modules/:id/feedback"
            render={(props) => (
              <Container className={classNames("pageContainer")}>
                <ModuleFeedback
                  courseCode={props.match.params.id}
                />
              </Container>
            )}
          />

          <Route path="/timeline">
            <Timeline
              initSideBar={initTimelineSideBar}
              revertSideBar={revertTimelineSideBar}
              term={timelineTerm}
              setTerm={setTimelineTerm}
              onEventClick={onEventClick}
              modules={modules}
              timelineEvents={timelineEvents}
              modulesTracks={modulesTracks}
            />
          </Route>

          <Route path="/exams/grading">
            <Container className={classNames("pageContainer")}>
              <ExamGrading />
            </Container>
          </Route>

            <Route path="/handins">
              <Container className={classNames("pageContainer")}>
                <HandIns studentID="zy7218" courseID="144" exerciseID={123} />
              </Container>
            </Route>

					  <Route
						path="/exams/papers/:scope?"
						render={(props) => (
						  <Container className={classNames("pageContainer")}>
							<ExamPastPapers
							  view={fileView}
												scope={props.match.params.scope}
												modules={modules}
							/>
						  </Container>
						)}
					  />
					  <Route path="/exams" render={() => <Redirect to="/exams/papers" />} />
        		
        </Switch>
      </Suspense>
    </div>
  )
}

export default StandardView
