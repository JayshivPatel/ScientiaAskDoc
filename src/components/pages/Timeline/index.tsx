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

  render() {
    return (
      <div className={styles.timelineContainer}>
        <MyBreadcrumbs />
				{/* <TermSwitcher/> */}
				<ModuleHeading
					moduleCode="CO112"
					title="Introduction to Computer Systems"
				/>
        <WeekHeading />
      </div>
    );
  }
}

export default Timeline;
