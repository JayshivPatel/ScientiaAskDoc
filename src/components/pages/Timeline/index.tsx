import React from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import styles from "./style.module.scss";
import TermSwitcher from "./components/TermSwitcher";
import { modulesList } from "../ModuleList/list";
import WeekRow from "./components/WeekRow";
import ModuleRows from "./components/ModuleRows";
import DayIndicatorGrid from "./components/DayIndicatorGrid";
import EventGrid from "./components/EventGrid";

interface TimelineProps {
  initSideBar: () => void;
  revertSideBar: () => void;
}

interface Event {
  title: string;
}

export type ModuleTracks = {
  [index: string]: Event[][];
};

interface TimelineState {
  moduleTracks: ModuleTracks;
}

class Timeline extends React.Component<TimelineProps, TimelineState> {
  constructor(props: TimelineProps) {
    super(props);
    this.state = { moduleTracks: {} };
  }

  componentDidMount() {
    this.props.initSideBar();
    let moduleTracks: ModuleTracks = {};
    modulesList.forEach(({ code }) => {
      moduleTracks[code] = [[], []];
    });
    this.setState({ moduleTracks: moduleTracks });
  }

  componentWillUnmount() {
    this.props.revertSideBar();
  }

  render() {
    const termStart = new Date("2020-09-28");
    const activeDay = new Date("2020-10-12");
    const numWeeks = 11;
    const trackHeight = 4;

    return (
      <div className={styles.timelineContainer}>
        <MyBreadcrumbs />
        <div className={styles.timelineGrid}>
          <TermSwitcher />
          <WeekRow
            numWeeks={numWeeks}
            termStart={termStart}
            activeDay={activeDay}
          />
          <ModuleRows
            numWeeks={numWeeks}
            trackHeight={trackHeight}
            modulesList={modulesList}
            moduleTracks={this.state.moduleTracks}
          />

          <DayIndicatorGrid
            numWeeks={numWeeks}
            activeDay={activeDay}
            termStart={termStart}
          />

          <EventGrid numWeeks={numWeeks} trackHeight={trackHeight} />
        </div>
      </div>
    );
  }
}

export default Timeline;
