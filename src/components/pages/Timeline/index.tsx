import React, { ReactElement } from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import styles from "./style.module.scss";
import TermSwitcher from "./components/TermSwitcher";
import ModuleHeading from "./components/ModuleHeading";
import WeekHeading from "./components/WeekHeading";
import { modulesList } from "../ModuleList/list";
import classNames from "classnames";
import { addDays } from "utils/functions";

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

  generateGridItems(numWeeks: number, trackHeight: number) {
    let timelineBackgrounds: ReactElement[] = [];
    let moduleHeadings: ReactElement[] = [];

    for (let i = 0; i < modulesList.length; i++) {
      const code = modulesList[i].code;
      const tracks = this.state.moduleTracks[code];
      if (tracks) {
        moduleHeadings.push(
          <ModuleHeading
            key={code}
            style={{ height: `${tracks.length * trackHeight}rem` }}
            moduleCode={code}
            title={modulesList[i].title}
          />
        );
        const timelineBackgroundsClass = classNames(
          i % 2 === 0
            ? styles.timelineBackgroundEven
            : styles.timelineBackgroundOdd,
          i === 0 ? styles.timelineBackgroundFirst : "",
          i === modulesList.length - 1 ? styles.timelineBackgroundLast : ""
        );
        const offset =
          i === modulesList.length - 1 || i === 0 ? 0.625 / 2 : 0.625;
        for (let j = 0; j < numWeeks; j++) {
          timelineBackgrounds.push(
            <div
              key={code + j}
              style={{ height: `${tracks.length * trackHeight + offset}rem` }}
              className={timelineBackgroundsClass}
            ></div>
          );
        }
      }
    }
    return [moduleHeadings, timelineBackgrounds];
  }

  render() {
    const termStart = new Date("2020-09-28");
    const activeDay = new Date("2020-10-23");
    const numWeeks = 11;
    const trackHeight = 4.25;
    const [moduleHeadings, timelineBackgrounds] = this.generateGridItems(
      numWeeks,
      trackHeight
    );
    const activeColumn =
      Math.ceil(
        ((activeDay.getTime() - termStart.getTime()) / 86400000 / 7) * 6
      ) + 1;
    console.log(activeColumn);
    return (
      <div className={styles.timelineContainer}>
        <MyBreadcrumbs />
        <div className={styles.timelineGrid}>
          <div className={styles.timelineTermSwitcher}>
            <TermSwitcher />
          </div>
          <div
            className={styles.timelineWeekRow}
            style={{ gridTemplateColumns: `repeat(${numWeeks}, 15rem)` }}
          >
            {[...Array(numWeeks)].map((_, i) => (
              <div className={styles.weekHeading} key={i}>
                <WeekHeading
                  weekNumber={i + 1}
                  dateRangeStart={addDays(termStart, i * 7)}
                  dateRangeEnd={addDays(termStart, i * 7 + 4)}
                  activeDay={activeDay}
                />
              </div>
            ))}
          </div>
          <div className={styles.timelineModuleColumn}>{moduleHeadings}</div>
          <div
            className={styles.timelineWeekBackground}
            style={{ gridTemplateColumns: `repeat(${numWeeks}, 15rem)` }}
          >
            {timelineBackgrounds}
          </div>
          <div
            className={styles.dayIndicatorGrid}
            style={{
              gridTemplateColumns: `repeat(${numWeeks}, 3rem 3rem 3rem 3rem 3rem 0.625rem`,
            }}
          >
            <div
              className={styles.dayIndicatorColumn}
              style={{
                visibility:
                  activeDay.getDay() === 6 || activeDay.getDay() == 0
                    ? "hidden"
                    : "visible",
                gridColumn: `${activeColumn} / ${activeColumn + 1}`,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
