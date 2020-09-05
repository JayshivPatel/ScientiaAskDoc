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

interface TimelineProps {
  initSideBar: () => void;
  revertSideBar: () => void;
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
  moduleTracks: ModuleTracks;
  isLoaded: boolean;
}

class Timeline extends React.Component<TimelineProps, TimelineState> {
  constructor(props: TimelineProps) {
    super(props);
    this.state = { moduleTracks: {}, isLoaded: false };
  }

  componentDidMount() {
    this.props.initSideBar();
    let moduleTracks: ModuleTracks = {};
    modulesList.forEach(({ code }) => {
      moduleTracks[code] = [[], []];
    });

    let timelineEvents = eventsData;
    for (let i = 0; i < timelineEvents.length; i++) {
      const event = timelineEvents[i];
      let tracks: TimelineEvent[][] = moduleTracks[event.moduleCode];
      let isPlaced = false;
      for (const track of tracks) {
        if (track.every((te) => !eventsOverlaps(te, event))) {
          isPlaced = true;
          track.push(event);
          break;
        }
			}
			if (!isPlaced){
				tracks.push([event]);
			}
		}
		
    this.setState({
      moduleTracks: moduleTracks,
      isLoaded: true,
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

  render() {
    const termStart = new Date("2020-09-28");
    const activeDay = new Date("2020-10-12");
    const numWeeks = 11;
    const trackHeight = 4;
    if (!this.state.isLoaded) {
      return <LoadingScreen successful={<></>} />;
    }
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
            activeColumn={this.dateToColumn(activeDay, termStart)}
          />

          <EventGrid
            numWeeks={numWeeks}
            trackHeight={trackHeight}
            modulesList={modulesList}
            moduleTracks={this.state.moduleTracks}
          />
        </div>
      </div>
    );
  }
}

function eventsOverlaps(e1: TimelineEvent, e2: TimelineEvent) {
  return e1.startDate <= e2.endDate && e1.endDate >= e2.startDate;
}

export default Timeline;
