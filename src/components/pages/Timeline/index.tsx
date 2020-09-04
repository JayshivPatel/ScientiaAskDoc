import React from "react";
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

class Timeline extends React.Component<TimelineProps, {}> {
  componentDidMount() {
    this.props.initSideBar();
  }

  componentWillUnmount() {
    this.props.revertSideBar();
	}
	
	addDays(date: Date, days: number) {
		var result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

  render() {
    const termStart = new Date("2020-09-28");
    const activeDay = new Date("2020-10-07");
    const numWeeks = 12;
    return (
      <div className={styles.timelineContainer}>
        <MyBreadcrumbs />
        <div className={styles.timelineGrid}>
          <div className={styles.timelineTermSwitcher}>
            <TermSwitcher />
          </div>
          <div className={styles.timelineWeekRow}>
            {[...Array(numWeeks)].map((_, i) => (
              <div className={styles.weekHeading}>
                <WeekHeading
                  weekNumber={i + 1}
                  dateRangeStart={this.addDays(termStart, i * 7)}
                  dateRangeEnd={this.addDays(termStart, i * 7 + 4)}
                  activeDay={activeDay}
                />
              </div>
            ))}
          </div>
          <div className={styles.timelineModuleColumn}>
            {modulesList.map((module) => (
              <div className={styles.moduleHeading}>
                <ModuleHeading moduleCode={module.code} title={module.title} />
              </div>
            ))}
          </div>
          <div className={styles.timelineWeekBackground}>
            {[...Array(numWeeks)].map(() => {
              return <div className={styles.timelineBackground}>&nbsp;</div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
