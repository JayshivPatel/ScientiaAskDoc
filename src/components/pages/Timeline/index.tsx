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
  Term,
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
  activeTerm: Term;
  setActiveTerm: React.Dispatch<React.SetStateAction<Term>>;
  terms: Term[];
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

  componentDidMount() {
    this.props.initSideBar();
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
    const { start, weeks } = this.props.activeTerm;
    const activeDay = new Date();
    const trackHeight = 3.25;
    let currModules = this.props.modules.filter(({ terms }) =>
      terms.includes(this.props.activeTerm.label)
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
          activeTerm={this.props.activeTerm}
          setActiveTerm={this.props.setActiveTerm}
          terms={this.props.terms}
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
            <TermSwitcher
              activeTerm={this.props.activeTerm}
              setActiveTerm={this.props.setActiveTerm}
              terms={this.props.terms}
            />
            <WeekRow numWeeks={weeks} termStart={start} activeDay={activeDay} />
            <ModuleRows
              numWeeks={weeks}
              trackHeight={trackHeight}
              modulesList={currModules}
              modulesTracks={this.props.modulesTracks}
            />

            <DayIndicatorGrid
              numWeeks={weeks}
              activeDay={activeDay}
              activeColumn={this.dateToColumn(activeDay, start)}
              isInTerm={(date) => this.isInTerm(date, start, weeks)}
            />

            <EventGrid
              numWeeks={weeks}
              trackHeight={trackHeight}
              modulesList={currModules}
              modulesTracks={this.props.modulesTracks}
              dateToColumn={(date) => this.dateToColumn(date, start)}
              isInTerm={(date) => this.isInTerm(date, start, weeks)}
              onEventClick={(module, id) => this.handleEventClick(module, id)}
            />
          </div>
        </div>
      </>
    );
  }
}
export default Timeline;
