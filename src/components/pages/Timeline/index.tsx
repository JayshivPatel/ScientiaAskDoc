import React, { useEffect, useState } from "react"
import MyBreadcrumbs from "components/headings/MyBreadcrumbs"
import styles from "./style.module.scss"
import TermSwitcher from "./components/TermSwitcher"
import WeekRow from "./components/WeekRow"
import ModuleRows from "./components/ModuleRows"
import DayIndicatorGrid from "./components/DayIndicatorGrid"
import EventGrid from "./components/EventGrid"
import { Module, Term, TimelineEvent, TimelineEventDict } from "constants/types"
import { addDays, dateNeutralized, toDayCount } from "utils/functions"
import TimelineMobile from "./components/TimelineMobile"
import { request } from "../../../utils/api"
import { api, methods } from "../../../constants/routes"

export type ModuleTracks = {
  [index: string]: TimelineEvent[][]
}

interface TimelineProps {
  initSideBar: () => void
  revertSideBar: () => void
  activeTerm: Term
  setActiveTerm: React.Dispatch<React.SetStateAction<Term>>
  terms: Term[]
  onEventClick: (e?: TimelineEvent) => void
  modules: Module[]
  year: string
}

function dateToColumn(day: Date, termStart: Date) {
  const dayTime = toDayCount(day)
  const termStartTime = toDayCount(termStart)
  return Math.ceil(((dayTime - termStartTime) / 7) * 6) + 1
}

function isInTerm(date: Date, termStart: Date, numWeeks: number) {
  return (
    termStart.getTime() < date.getTime() &&
    date.getTime() < addDays(termStart, numWeeks * 7).getTime()
  )
}

const eventsOverlaps = (e1: TimelineEvent, e2: TimelineEvent) => {
  return (
    toDayCount(e1.startDate) <= toDayCount(e2.endDate) &&
    toDayCount(e1.endDate) >= toDayCount(e2.startDate)
  )
}

const Timeline: React.FC<TimelineProps> = ({
  initSideBar,
  revertSideBar,
  activeTerm,
  setActiveTerm,
  terms,
  onEventClick,
  modules,
  year,
}: TimelineProps) => {
  useEffect(() => {
    initSideBar()

    return function cleanup() {
      revertSideBar()
      document.documentElement.style.fontSize = `${
        localStorage.getItem("interfaceSize") || "90"
      }%`
    }
  }, [])

  function handleEventClick(module: string, id: number) {
    const event = timelineEvents[module][id]
    onEventClick(event)
  }

  const [showMobileOnSmallScreens, setShowMobileOnSmallScreens] = useState(true)
  const [timelineEvents, setTimelineEvents] = useState<TimelineEventDict>({})
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

  const [modulesTracks, setModulesTracks] = useState<ModuleTracks>({})
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

  const { start, weeks, label } = activeTerm
  const activeDay = new Date()
  const trackHeight = 3.25
  let currModules = modules.filter(({ terms }) => terms.includes(label))

  /* sort current modules by:
   *   1. comparing subscription level in inverse order (level 3 at the top)
   *   2. When (1) are the same, comparing module code
   */
  currModules.sort((a, b) => {
    const makeNumber = (code: string): number =>
      Number(code.replace(/^\D+/g, ""))
    return (
      b.subscriptionLevel - a.subscriptionLevel ||
      makeNumber(a.code) - makeNumber(b.code)
    )
  })

  if (
    window.innerWidth <= 550 &&
    window.innerHeight <= 900 &&
    showMobileOnSmallScreens
  ) {
    return (
      <TimelineMobile
        activeTerm={activeTerm}
        setActiveTerm={setActiveTerm}
        terms={terms}
        modulesList={currModules}
        openDesktopSite={() => {
          setShowMobileOnSmallScreens(false)
          document.documentElement.style.fontSize = "40%"
        }}
      />
    )
  }
  return (
    <>
      <div className={styles.timelineContainer}>
        <MyBreadcrumbs />
        <div className={styles.timelineGrid}>
          <TermSwitcher
            activeTerm={activeTerm}
            setActiveTerm={setActiveTerm}
            terms={terms}
          />
          <WeekRow numWeeks={weeks} termStart={start} activeDay={activeDay} />
          <ModuleRows
            numWeeks={weeks}
            trackHeight={trackHeight}
            modulesList={currModules}
            modulesTracks={modulesTracks}
          />

          <DayIndicatorGrid
            numWeeks={weeks}
            activeDay={activeDay}
            activeColumn={dateToColumn(activeDay, start)}
            isInTerm={(date) => isInTerm(date, start, weeks)}
          />

          <EventGrid
            numWeeks={weeks}
            trackHeight={trackHeight}
            modulesList={currModules}
            modulesTracks={modulesTracks}
            dateToColumn={(date) => dateToColumn(date, start)}
            isInTerm={(date) => isInTerm(date, start, weeks)}
            onEventClick={(module, id) => handleEventClick(module, id)}
          />
        </div>
      </div>
    </>
  )
}

export default Timeline
