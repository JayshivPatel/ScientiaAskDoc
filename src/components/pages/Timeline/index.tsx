import React from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import styles from "./style.module.scss";
import TermSwitcher from "./components/TermSwitcher";
import ModuleHeading from "./components/ModuleHeading";
import WeekHeading from "./components/WeekHeading";

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
            {modules.map((module) => (
              <div className={styles.moduleHeading}>
                <ModuleHeading moduleCode={module.code} title={module.title} />
              </div>
            ))}
          </div>
          <div className={styles.timelineWeekBackground}>
            {[...Array(12)].map((e, i) => {
              return <div className={styles.timelineBackground}>&nbsp;</div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

let modules = [
  {
    title: "Introduction to Computer Systems",
    code: "CO112",
  },
  {
    title: "Programming I (Haskell)",
    code: "CO120.1",
  },
  {
    title: "Programming II (Java)",
    code: "CO120.2",
  },
  {
    title: "Introduction to Logic",
    code: "CO140",
  },
  {
    title: "Discrete Mathematics",
    code: "CO142",
  },
  {
    title: "Mathematical Methods",
    code: "CO145",
  },
  {
    title: "Computing Practical I",
    code: "CO161",
  },
  {
    title: "Professional Issues",
    code: "CO166",
  },
];

export default Timeline;
