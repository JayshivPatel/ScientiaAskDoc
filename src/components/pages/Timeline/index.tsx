import React, { useEffect, useState } from "react"
import MyBreadcrumbs from "components/headings/MyBreadcrumbs"
import styles from "./style.module.scss"
import TermSwitcher from "./components/TermSwitcher"
import WeekRow from "./components/WeekRow"
import ModuleRows from "./components/ModuleRows"
import DayIndicatorGrid from "./components/DayIndicatorGrid"
import EventGrid from "./components/EventGrid"
import { Module, Term, TimelineEvent, TimelineEventDict } from "constants/types"
import { addDays, toDayCount } from "utils/functions"
import TimelineMobile from "./components/TimelineMobile"

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
  timelineEvents: TimelineEventDict
  modulesTracks: ModuleTracks
}

const Timeline: React.FC<TimelineProps> = ({
  initSideBar,
  revertSideBar,
  activeTerm,
  setActiveTerm,
  terms,
  onEventClick,
  modules,
  timelineEvents,
  modulesTracks,
}: TimelineProps) => {
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

  function handleEventClick(module: string, id: number) {
    const event = timelineEvents[module][id]
    onEventClick(event)
  }

  useEffect(() => {
    initSideBar()

    return function cleanup() {
      revertSideBar()
      document.documentElement.style.fontSize = `${
        localStorage.getItem("interfaceSize") || "90"
      }%`
    }
  }, [])

  const [showMobileOnSmallScreens, setShowMobileOnSmallScreens] = useState(true)

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
