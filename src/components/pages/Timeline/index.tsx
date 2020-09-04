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
          <div className={styles.timeline}>
          <Table className={styles.timelineTable} bordered striped hover>
            <thead>
              <tr className={styles.tableRow}>
                <th className={styles.tableHeading}>
                  <TermSwitcher />
                </th>
                <th className={styles.tableWeekRow}>
                {[...Array(12)].map((e, i) => {
                  return (
                    <div className={styles.weekHeading}>
                      <WeekHeading />
                    </div>
                  );
                })}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className={styles.moduleHeading}>
                  <ModuleHeading
                    moduleCode="CO112"
                    title="Introduction to Computer Systems"
                  />
                </th>
                <td className={styles.rowContent}>
                {[...Array(12)].map((e, i) => {
                  return (
                    <div className={styles.dummy}>
                      some text
                    </div>
                  );
                })}
                </td>
              </tr>
              <tr>
                <th className={styles.moduleHeading}>
                  <ModuleHeading
                    moduleCode="CO120.1"
                    title="Programming I (Haskell)"
                  />
                </th>
                <td className={styles.rowContent}>
                {[...Array(12)].map((e, i) => {
                  return (
                    <div className={styles.dummy}>
                      some text
                    </div>
                  );
                })}
                </td>
              </tr>
              <tr>
                <th className={styles.moduleHeading}>
                  <ModuleHeading
                    moduleCode="CO120.2"
                    title="Programming II (Java)"
                  />
                </th>
                <td className={styles.rowContent}>
                {[...Array(12)].map((e, i) => {
                  return (
                    <div className={styles.dummy}>
                      some text
                    </div>
                  );
                })}
                </td>
              </tr>
            </tbody>
          </Table>
          </div>
        </div>
      </>
    );
  }
}

export default Timeline;
