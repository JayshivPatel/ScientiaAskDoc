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
                return (
                  <div className={styles.weekHeading}>
                    <WeekHeading />
                  </div>
                );
              })}
            </div>
            <div className={styles.timelineModuleColumn}>
              <div className={styles.moduleHeading}>
                <ModuleHeading
                  moduleCode="CO112"
                  title="Introduction to Computer Systems"
                />
              </div>
              <div className={styles.moduleHeading}>
                <ModuleHeading
                  moduleCode="CO120.1"
                  title="Programming I (Haskell)"
                />
              </div>
              <div className={styles.moduleHeading}>
                <ModuleHeading
                  moduleCode="CO120.2"
                  title="Programming II (Java)"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Timeline;
