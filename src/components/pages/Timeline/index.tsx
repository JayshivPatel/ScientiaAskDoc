import React from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import styles from "./style.module.scss";
import TermSwitcher from "./components/TermSwitcher";
import WeekRow from "./components/WeekRow";
import ModuleRows from "./components/ModuleRows";
import DayIndicatorGrid from "./components/DayIndicatorGrid";
import EventGrid from "./components/EventGrid";
import { eventsData } from "./eventsData";
import LoadingScreen from "components/molecules/LoadingScreen";
import { Term, Module, TimelineEvent } from "constants/types";
import { addDays, toDayCount } from "utils/functions";
import TimelineMobile from "./components/TimelineMobile";

export type ModuleTracks = {
  [index: string]: TimelineEvent[][];
};

interface TimelineProps {
  initSideBar: () => void;
  revertSideBar: () => void;
  term: Term;
  setTerm: React.Dispatch<React.SetStateAction<Term>>;
  onEventClick: (e?: TimelineEvent) => void;
  modules: Module[];
}

interface TimelineState {
  modulesTracks: ModuleTracks;
  modulesList: Module[];
  isLoaded: boolean;
  showMobileOnSmallScreens: boolean;
  eventsData: TimelineEvent[];
}

class Timeline extends React.Component<TimelineProps, TimelineState> {
  constructor(props: TimelineProps) {
    super(props);
    this.state = {
      modulesTracks: {},
      isLoaded: false,
      modulesList: [],
      showMobileOnSmallScreens: true,
      eventsData: [],
    };
  }

  componentDidMount() {
    this.props.initSideBar();
    let modulesTracks: ModuleTracks = {};

    this.props.modules.forEach(({ code }) => {
      modulesTracks[code] = [[], []];
    });

    let timelineEvents = eventsData;
    for (let i = 0; i < timelineEvents.length; i++) {
      const event = timelineEvents[i];
      let tracks: TimelineEvent[][] = modulesTracks[event.moduleCode];
      let isPlaced = false;
      for (const track of tracks) {
        if (track.every((te) => !eventsOverlaps(te, event))) {
          isPlaced = true;
          track.push(event);
          break;
        }
      }
      if (!isPlaced) {
        tracks.push([event]);
      }
    }

    this.setState({
      modulesTracks: modulesTracks,
      isLoaded: true,
      modulesList: this.props.modules,
      eventsData: eventsData,
    });
  }

  componentWillUnmount() {
    this.props.revertSideBar();
    document.documentElement.style.fontSize = `${
      localStorage.getItem("interfaceSize") || "90"
    }%`;
  }

  dateToColumn(day: Date, termStart: Date) {
    const dayTime = toDayCount(day);
    const termStartTime = toDayCount(termStart);
    return Math.ceil(((dayTime - termStartTime) / 7) * 6) + 1;
  }

  isInTerm(date: Date, termStart: Date, numWeeks: number) {
    return (
      termStart.getTime() < date.getTime() &&
      date.getTime() < addDays(termStart, numWeeks * 7).getTime()
    );
  }

  handleEventClick(id: number) {
    const event = this.state.eventsData.find((e) => e.id === id);
    this.props.onEventClick(event);
  }

  render() {
    const [termStart, numWeeks] = getTermDates(this.props.term);
    const activeDay = new Date("2020-10-21");
    const trackHeight = 3.25;
    if (!this.state.isLoaded) {
      return <LoadingScreen successful={<></>} />;
    }
    let currModules = this.state.modulesList.filter(({ terms }) =>
      terms.includes(this.props.term)
    );

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
            this.setState({ showMobileOnSmallScreens: false });
            document.documentElement.style.fontSize = "40%";
          }}
        />
      );
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
    );
  }
}

function eventsOverlaps(e1: TimelineEvent, e2: TimelineEvent) {
  return (
    toDayCount(e1.startDate) <= toDayCount(e2.endDate) &&
    toDayCount(e1.endDate) >= toDayCount(e2.startDate)
  );
}

function getTermDates(term: Term): [Date, number] {
  switch (term) {
    case Term.AUTUMN:
      return [new Date("2020-10-05"), 11];
    case Term.SPRING:
      return [new Date("2021-01-11"), 11];
    case Term.SUMMER:
      return [new Date("2021-04-26"), 9];
  }
}

export default Timeline;
