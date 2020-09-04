import React from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import styles from "./style.module.scss";
import TermSwitcher from "./components/TermSwitcher";
import ModuleHeading from "./components/ModuleHeading";
import WeekHeading from "./components/WeekHeading";
import Table from "react-bootstrap/table";

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

  render() {
    return (
      <>
        <div className={styles.timelineContainer}>
          <MyBreadcrumbs />
          <div className={styles.timelineGrid}>
            <div className={styles.timelineTermSwitcher}>
              <TermSwitcher />
            </div>
            <div className={styles.timelineWeekRow}>
              {[...Array(12)].map((e, i) => {
                if (i == 1) {
                  return (
                    <div className={styles.weekHeading}>
                      <WeekHeading
                        weekNumber={`${i + 1}`}
                        dateRangeStart={"06/10"}
                        dateRangeEnd={"10/10"}
                        activeDay={3}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div className={styles.weekHeading}>
                      <WeekHeading
                        weekNumber={`${i + 1}`}
                        dateRangeStart={"06/10"}
                        dateRangeEnd={"10/10"}
                        activeDay={0}
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div className={styles.timelineModuleColumn}>
              {modules.map(module => (  
              <div className={styles.moduleHeading}>
                <ModuleHeading
                  moduleCode={module.code}
                  title={module.title}
                />
              </div>
              ))}
            </div>
            <div className={styles.timelineWeekBackground}> 
              {[...Array(12)].map((e, i) => {
                return <div className={styles.timelineBackground}>&nbsp;</div>
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

let modules = [
  {
    title: "Introduction to Computer Systems",
    code: "CO112"
  },
  {
    title: "Programming I (Haskell)",
    code: "CO120.1"
  },
  {
    title: "Programming II (Java)",
    code: "CO120.2"
  },
  {
    title: "Introduction to Logic",
    code: "CO140"
  },
  {
    title: "Discrete Mathematics",
    code: "CO142"
  },
  {
    title: "Mathematical Methods",
    code: "CO145"
  },
  {
    title: "Computing Practical I",
    code: "CO161"
  },
  {
    title: "Professional Issues",
    code: "CO166"
  }
];

export default Timeline;
