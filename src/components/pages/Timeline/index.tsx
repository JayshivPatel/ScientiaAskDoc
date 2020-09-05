import React from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import styles from "./style.module.scss";
import TermSwitcher from "./components/TermSwitcher";
import { modulesList } from "../ModuleList/list";
import WeekRow from "./components/WeekRow";
import ModuleRows from "./components/ModuleRows";
import DayIndicatorGrid from "./components/DayIndicatorGrid";
import EventGrid from "./components/EventGrid";
import { eventsData } from "./eventsData";
import LoadingScreen from "components/molecules/LoadingScreen";
import { Term, Module } from "constants/types";
import { addDays } from "utils/functions";

interface TimelineProps {
  initSideBar: () => void;
  revertSideBar: () => void;
  term: Term;
  setTerm: React.Dispatch<React.SetStateAction<Term>>;
}

export interface TimelineEvent {
  title: string;
  id: number;
  moduleCode: string;
  startDate: Date;
  endDate: Date;
}

export type ModuleTracks = {
  [index: string]: TimelineEvent[][];
};

interface TimelineState {
  modulesTracks: ModuleTracks;
  modulesList: Module[];
  isLoaded: boolean;
}

class Timeline extends React.Component<TimelineProps, TimelineState> {
  constructor(props: TimelineProps) {
    super(props);
    this.state = {
      modulesTracks: {},
      isLoaded: false,
      modulesList: [],
    };
  }

  componentDidMount() {
    this.props.initSideBar();
    let modulesTracks: ModuleTracks = {};

    modulesList.forEach(({ code }) => {
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
      modulesList: modulesList,
    });
  }

  componentWillUnmount() {
    this.props.revertSideBar();
  }

  dateToColumn(day: Date, termStart: Date) {
    return (
      Math.ceil(((day.getTime() - termStart.getTime()) / 86400000 / 7) * 6) + 1
    );
  }

  isInTerm(date: Date, termStart: Date, numWeeks: number) {
    return (
      termStart.getTime() < date.getTime() &&
      date.getTime() < addDays(termStart, numWeeks * 7).getTime()
    );
  }

  render() {
    const [termStart, numWeeks] = getTermDates(this.props.term);
    const activeDay = new Date("2020-10-12");
    const trackHeight = 4;
    if (!this.state.isLoaded) {
      return <LoadingScreen successful={<></>} />;
    }
    let currModules = this.state.modulesList.filter(({ terms }) =>
      terms.includes(this.props.term)
    );
    // currModules = this.state.modulesList;
    return (
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
            dateToColumn={(date) => this.dateToColumn(date, termStart) + 1}
            isInTerm={(date) => this.isInTerm(date, termStart, numWeeks)}
          />
        </div>
      </div>
    );
  }
}

function eventsOverlaps(e1: TimelineEvent, e2: TimelineEvent) {
  return e1.startDate <= e2.endDate && e1.endDate >= e2.startDate;
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
