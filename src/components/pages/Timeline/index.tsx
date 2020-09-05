import React, { ReactElement } from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import styles from "./style.module.scss";
import TermSwitcher from "./components/TermSwitcher";
import ModuleHeading from "./components/ModuleHeading";
import WeekHeading from "./components/WeekHeading";
import { modulesList } from "../ModuleList/list";

interface TimelineProps {
  initSideBar: () => void;
  revertSideBar: () => void;
}

interface Event {
  title: string;
}

type ModuleTracks = {
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

  addDays(date: Date, days: number) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  render() {
    const termStart = new Date("2020-09-28");
    const activeDay = new Date("2020-10-07");
    const numWeeks = 12;
    const trackHeight = 4.25;

    let timelineBackgrounds: ReactElement[] = [];
    let moduleHeadings: ReactElement[] = [];

    for (let i = 0; i < modulesList.length; i++) {
      const code = modulesList[i].code;
      const tracks = this.state.moduleTracks[code];
      if (tracks) {
        const height = tracks.length * trackHeight;
        for (let j = 0; j < numWeeks; j++) {
          timelineBackgrounds.push(
            <div
							key={code + j}
              style={{ height: `${height}rem` }}
              className={styles.timelineBackground}
            >
              &nbsp;
            </div>
          );
        }
        moduleHeadings.push(
          <div
						key={code}
            className={styles.moduleHeading}
            style={{ height: `${height}rem` }}
          >
            <ModuleHeading moduleCode={code} title={modulesList[i].title} />
          </div>
        );
      }
    }
    return (
      <div className={styles.timelineContainer}>
        <MyBreadcrumbs />
        <div className={styles.timelineGrid}>
          <div className={styles.timelineTermSwitcher}>
            <TermSwitcher />
          </div>
          <div className={styles.timelineWeekRow}>
            {[...Array(numWeeks)].map((_, i) => (
              <div className={styles.weekHeading} key={i}>
                <WeekHeading
                  weekNumber={i + 1}
                  dateRangeStart={this.addDays(termStart, i * 7)}
                  dateRangeEnd={this.addDays(termStart, i * 7 + 4)}
                  activeDay={activeDay}
                />
              </div>
            ))}
          </div>
          <div className={styles.timelineModuleColumn}>{moduleHeadings}</div>
          <div className={styles.timelineWeekBackground}>
            {timelineBackgrounds}
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
