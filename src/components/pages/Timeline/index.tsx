import React from "react";
import MyBreadcrumbs from "components/headings/MyBreadcrumbs";
import styles from "./style.module.scss";
import TermSwitcher from "./components/TermSwitcher";
import WeekRow from "./components/WeekRow";
import ModuleRows from "./components/ModuleRows";
import DayIndicatorGrid from "./components/DayIndicatorGrid";
import EventGrid from "./components/EventGrid";
import {
  Module,
  OldTerm,
  TimelineEvent,
  TimelineEventDict,
} from "constants/types";
import { addDays, toDayCount } from "utils/functions";
import TimelineMobile from "./components/TimelineMobile";

export type ModuleTracks = {
  [index: string]: TimelineEvent[][];
};

interface TimelineProps {
  initSideBar: () => void;
  revertSideBar: () => void;
  term: OldTerm;
  setTerm: React.Dispatch<React.SetStateAction<OldTerm>>;
  onEventClick: (e?: TimelineEvent) => void;
  modules: Module[];
  timelineEvents: TimelineEventDict;
  modulesTracks: ModuleTracks;
}

interface TimelineState {
  showMobileOnSmallScreens: boolean;
}

class Timeline extends React.Component<TimelineProps, TimelineState> {
  constructor(props: TimelineProps) {
    super(props);
    this.state = {
      showMobileOnSmallScreens: true,
    };
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

  handleEventClick(module: string, id: number) {
    const event = this.props.timelineEvents[module][id];
    this.props.onEventClick(event);
  }

  render() {
    const [termStart, numWeeks] = getTermDates(this.props.term);
    const activeDay = new Date();
    const trackHeight = 3.25;
    let currModules = this.props.modules.filter(({ terms }) =>
      terms.includes(this.props.term)
    );

    /* sort current modules by:
     *   1. comparing subscription level in inverse order (level 3 at the top)
     *   2. When (1) are the same, comparing module code
     */
    currModules.sort((a, b) => {
      const makeNumber = (code: string): number =>
        Number(code.replace(/^\D+/g, ""));
      return (
        b.subscriptionLevel - a.subscriptionLevel ||
        makeNumber(a.code) - makeNumber(b.code)
      );
    });

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
              modulesTracks={this.props.modulesTracks}
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
              modulesTracks={this.props.modulesTracks}
              dateToColumn={(date) => this.dateToColumn(date, termStart)}
              isInTerm={(date) => this.isInTerm(date, termStart, numWeeks)}
              onEventClick={(module, id) => this.handleEventClick(module, id)}
            />
          </div>
        </div>
      </>
    );
  }
}
function getTermDates(term: OldTerm): [Date, number] {
  switch (term) {
    case "Autumn":
      return [new Date("2020-10-05"), 11];
    case "Spring":
      return [new Date("2021-01-11"), 11];
    case "Summer":
      return [new Date("2021-04-26"), 9];
    case "Christmas":
      return [new Date("2021-12-21"), 3];
    case "Easter":
      return [new Date("2021-03-29"), 5];
    case "Jun-Sept":
      return [new Date("2021-06-28"), 14];
  }
}

export default Timeline;
