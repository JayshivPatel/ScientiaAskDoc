import React, { Suspense, useEffect, useState } from "react"
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
  TimelineEventDict,
} from "constants/types"
import Container from "react-bootstrap/esm/Container"
import LoadingScreen from "components/suspense/LoadingScreen"
import RightBar from "components/navbars/RightBar"
import LeftBar from "components/navbars/LeftBar"
import { request } from "../../utils/api"
import { api, methods } from "../../constants/routes"
import { YEAR_OF_NEW_CODES } from "../../constants/doc"
import { ModuleTracks } from "./Timeline"
import { dateNeutralized, toDayCount } from "../../utils/functions"
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
const ModuleFeedback = React.lazy(() => import("./modulePages/ModuleFeedback"))
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
  const [timelineEvents, setTimelineEvents] = useState<TimelineEventDict>({})
  const [modulesTracks, setModulesTracks] = useState<ModuleTracks>({})
  useEffect(() => {
    const onSuccess = (data: { [k: string]: any }[]) => {
      setModules(
        data.map((module) => ({
          title: module.title,
          code: year < YEAR_OF_NEW_CODES ? `CO${module.code}` : module.code,
          canManage: module.can_manage,
          hasMaterials: module.has_materials,
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
      url: api.MATERIALS_COURSES(year),
      method: methods.GET,
      onSuccess: onSuccess,
      onError: (message) => console.log(`Failed to obtain modules: ${message}`),
    })
  }, [year])

  const KNOWN_NUMBER_OF_TERMS = 6
  const [activeTerm, setActiveTerm] = useState<Term>(getDefaultTerm())
  const [terms, setTerms] = useState<Term[]>([])

  const [pdfURL, setPdfURL] = useState("")

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
      url: api.DBC_TERMS(year),
      method: methods.GET,
      onSuccess: onSuccess,
      onError: (message) => console.log(`Failed to obtain terms: ${message}`),
    })
  }, [year])

  const eventsOverlaps = (e1: TimelineEvent, e2: TimelineEvent) => {
    return (
      toDayCount(e1.startDate) <= toDayCount(e2.endDate) &&
      toDayCount(e1.endDate) >= toDayCount(e2.startDate)
    )
  }

  function applyExercisesToTimeline(
    newEvents: { [pair: string]: TimelineEvent[] },
    moduleCode: string
  ) {
    return (exercises: TimelineEvent[]) => {
      if (exercises) {
        newEvents[moduleCode] = []
        exercises.forEach((exercise) => {
          newEvents[moduleCode][exercise.id] = dateNeutralized<TimelineEvent>(
            exercise,
            "startDate",
            "endDate"
          )
        })
        setTimelineEvents({ ...newEvents })
      }
    }
  }

  useEffect(() => {
    const newEvents: { [pair: string]: TimelineEvent[] } = {}
    for (const module of modules) {
      request({
        url: api.DOC_MY_EXERCISES(year, module.code),
        method: methods.GET,
        onSuccess: applyExercisesToTimeline(newEvents, module.code),
        onError: (message) =>
          console.log(`Failed to obtain exercises: ${message}`),
      })
    }
  }, [modules])

  useEffect(() => {
    let moduleTracks: ModuleTracks = {}
    modules.forEach(({ code }) => {
      moduleTracks[code] = [[], []]
    })

    for (const key in timelineEvents) {
      for (const id in timelineEvents[key]) {
        const event = timelineEvents[key][id]
        const tracks: TimelineEvent[][] = moduleTracks[event.moduleCode] ?? []
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
    setModulesTracks(moduleTracks)
  }, [timelineEvents])

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
        year={year}
      />
      <RightBar
        onSettingsClick={onSettingsClick}
        onCalendarClick={onCalendarClick}
      />
      <div id="sidenav-overlay" onClick={(e) => onOverlayClick(e)}></div>
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
            path="/modules/:id/resources/:category/:resourceIndex"
            render={(props) => {

              const onSuccessGetResource = (blob: any) => {
                setPdfURL(URL.createObjectURL(blob))
              }

              const onSuccessGetResources = (data: { [k: string]: any }[]) => {
                const resource = data.find(r => r.index == props.match.params.resourceIndex)
                const resourceId = resource?.id || -1

                request({
                  url: api.MATERIALS_RESOURCES_FILE(resourceId),
                  method: methods.GET,
                  onSuccess: onSuccessGetResource,
                  onError: (message) => console.log(`Failed to get resource: ${message}`),
                  returnBlob: true
                })
              }
              
              if (pdfURL === "") {
                request({
                  url: api.MATERIALS_RESOURCES,
                  method: methods.GET,
                  body: {
                      "year": year,
                      "course": props.match.params.id,
                      "category": props.match.params.category
                  },
                  onSuccess: onSuccessGetResources,
                  onError: (message) => console.log(`Failed to obtain modules: ${message}`),
                })
              }

              return (
                <Container className={classNames("pageContainer")} style={{display: "flex", justifyContent: "center"}}>
                  <iframe
                    title="lol"
                    src={pdfURL}
                    style={{
                      height: "85vh",
                      width: "65vw",
                      overflow: "hidden",
                      border: "none",
                    }}>
                  </iframe>
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
                  ?.canManage || false
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

          <Route path="/modules/:id/feedback">
            <Container className={classNames("pageContainer")}>
              <ModuleFeedback />
            </Container>
          </Route>

          <Route path="/timeline">
            <Timeline
              initSideBar={initTimelineSideBar}
              revertSideBar={revertTimelineSideBar}
              activeTerm={activeTerm}
              setActiveTerm={setActiveTerm}
              terms={terms}
              onEventClick={onEventClick}
              modules={modules}
              timelineEvents={timelineEvents}
              modulesTracks={modulesTracks}
            />
          </Route>
        </Switch>
      </Suspense>
    </div>
  )
}

export default StandardView
