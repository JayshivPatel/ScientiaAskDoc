import React from "react";
import styles from "./style.module.scss";
import CalendarGroup from "components/molecules/CalendarGroup";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
export interface RightBarState {
  date: Date;
}

class RightBar extends React.Component<{}, RightBarState> {
  private timerID: number = 0;

  constructor(props: {}) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = window.setInterval(
      () =>
        this.setState({
          date: new Date(),
        }),
      1000
    );
  }

  componentWillUnmount() {
    window.clearInterval(this.timerID);
  }

  render() {
    let buttons = [
      {
        title: "Settings",
        icon: faCog,
      },
      {
        title: "Sign Out",
        icon: faSignOutAlt,
      },
    ];

    let timeOptions = { timeZone: "Europe/London", hourCycle: "h23" };
    return (
      <div id={styles.rightbarWrapper}>
        <p className={styles.rightbarStatus}>
          {/* yyyy-MM-dd HH:mm:ss, we have the duty to promote the spread of ISO8601 */}
          {this.state.date.toLocaleString("en-CA", timeOptions)}
        </p>
        <CalendarGroup />
        <SideBarTabGroup title="Account" buttons={buttons} />
      </div>
    );
  }
}
export default RightBar;
