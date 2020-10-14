import React from "react"
import MyBreadcrumbs from "components/headings/MyBreadcrumbs"
import styles from "./style.module.scss"
import TermSwitcher from "./components/TermSwitcher"
import WeekRow from "./components/WeekRow"
import ModuleRows from "./components/ModuleRows"
import DayIndicatorGrid from "./components/DayIndicatorGrid"
import EventGrid from "./components/EventGrid"
import { eventsData } from "./eventsData"
import LoadingScreen from "components/suspense/LoadingScreen"
import { Term, Module, TimelineEvent } from "constants/types"
import { addDays, toDayCount } from "utils/functions"
import TimelineMobile from "./components/TimelineMobile"
import { TIMELINE_ACTIVE } from "constants/global"

export type ModuleTracks = {
  [index: string]: TimelineEvent[][]
}

interface TimelineProps {
  initSideBar: () => void
  revertSideBar: () => void
  term: Term
  setTerm: React.Dispatch<React.SetStateAction<Term>>
  onEventClick: (e?: TimelineEvent) => void
  modules: Module[]
}

interface TimelineState {
  modulesTracks: ModuleTracks
  isLoaded: boolean
  showMobileOnSmallScreens: boolean
  eventsData: TimelineEvent[]
}

class Timeline extends React.Component<TimelineProps, TimelineState> {
  constructor(props: TimelineProps) {
    super(props)
    this.state = {
      modulesTracks: {},
      isLoaded: false,
      showMobileOnSmallScreens: true,
      eventsData: [],
    }
  }

  componentDidMount() {
    this.props.initSideBar()
    let modulesTracks: ModuleTracks = {}

    this.props.modules.forEach(({ code }) => {
      modulesTracks[code] = [[], []]
    })

    const timelineEvents = eventsData // for future api calls
    for (let i = 0; i < timelineEvents.length; i++) {
      const event = timelineEvents[i]
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

    this.setState({
      modulesTracks: modulesTracks,
      isLoaded: true,
      eventsData: eventsData,
    })
  }

  componentWillUnmount() {
    this.props.revertSideBar()
    document.documentElement.style.fontSize = `${
      localStorage.getItem("interfaceSize") || "90"
    }%`
  }

  dateToColumn(day: Date, termStart: Date) {
    const dayTime = toDayCount(day)
    const termStartTime = toDayCount(termStart)
    return Math.ceil(((dayTime - termStartTime) / 7) * 6) + 1
  }

  isInTerm(date: Date, termStart: Date, numWeeks: number) {
    return (
      termStart.getTime() < date.getTime() &&
      date.getTime() < addDays(termStart, numWeeks * 7).getTime()
    )
  }

  handleEventClick(id: number) {
    const event = this.state.eventsData.find((e) => e.id === id)
    this.props.onEventClick(event)
  }

  render() {
    const [termStart, numWeeks] = getTermDates(this.props.term)
    const activeDay = TIMELINE_ACTIVE
    const trackHeight = 3.25
    if (!this.state.isLoaded) {
      return <LoadingScreen successful={<></>} />
    }
    let currModules = this.props.modules.filter(({ terms }) =>
      terms.includes(this.props.term)
    )

    /* sort current modules by:
     *   1. comparing subscription level in inverse order (level 3 at the top)
     *   2. When (1) are the same, comparing module code
     */
    currModules.sort((a, b) => {
      const makeNumber = (code: string): number => Number(code.replace( /^\D+/g, ''))
      return b.subscriptionLevel - a.subscriptionLevel 
        || (makeNumber(a.code) - makeNumber(b.code))
    })

    if (
      window.innerWidth <= 550 &&
      window.innerHeight <= 900 &&
      this.state.showMobileOnSmallScreens
    ) {
      return (
        <TimelineMobile
          term={this.props.term}
          setTerm={this.props.setTerm}
          modulesList={currModules}
          openDesktopSite={() => {
            this.setState({ showMobileOnSmallScreens: false })
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
            <TermSwitcher term={this.props.term} setTerm={this.props.setTerm} />
            <WeekRow
              numWeeks={numWeeks}
              termStart={termStart}
              activeDay={activeDay}
            />
            <ModuleRows
              numWeeks={numWeeks}
              trackHeight={trackHeight}
              modulesList={currModules}
              modulesTracks={this.state.modulesTracks}
            />

            <DayIndicatorGrid
              numWeeks={numWeeks}
              activeDay={activeDay}
              activeColumn={this.dateToColumn(activeDay, termStart)}
              isInTerm={(date) => this.isInTerm(date, termStart, numWeeks)}
            />

            <EventGrid
              numWeeks={numWeeks}
              trackHeight={trackHeight}
              modulesList={currModules}
              modulesTracks={this.state.modulesTracks}
              dateToColumn={(date) => this.dateToColumn(date, termStart)}
              isInTerm={(date) => this.isInTerm(date, termStart, numWeeks)}
              onEventClick={(id) => this.handleEventClick(id)}
            />
          </div>
        </div>
      </>
    )
  }
}

function eventsOverlaps(e1: TimelineEvent, e2: TimelineEvent) {
  return (
    toDayCount(e1.startDate) <= toDayCount(e2.endDate) &&
    toDayCount(e1.endDate) >= toDayCount(e2.startDate)
  )
}

function getTermDates(term: Term): [Date, number] {
  switch (term) {
    case "Autumn":
      return [new Date("2020-10-05"), 11]
    case "Spring":
      return [new Date("2021-01-11"), 11]
    case "Summer":
      return [new Date("2021-04-26"), 9]
    case "Christmas":
      return [new Date("2021-12-21"), 3]
    case "Easter":
      return [new Date("2021-03-29"), 5]
    case "Jun-Jul":
      return [new Date("2021-06-28"), 5]
    case "Aug-Sept":
      return [new Date("2021-08-02"), 9]
  }
}

export default Timeline
