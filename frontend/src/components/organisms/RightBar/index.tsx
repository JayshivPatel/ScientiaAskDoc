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
          date: new Date()
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
        icon: faCog
      },
      {
        title: "Sign Out",
        icon: faSignOutAlt
      }
    ];

    let timeOptions = {
      timeZone: "Europe/London",
      dateStyle: "long",
      hourCycle: "h23",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "short",
      day: "2-digit",
      month: "short"
    };
    return (
      <div id={styles.rightbarWrapper}>
        <p className={styles.rightbarStatus}>
          {this.state.date.toLocaleString("en-GB", timeOptions)}
        </p>
        <CalendarGroup />
        <SideBarTabGroup title="Account" buttons={buttons} />
      </div>
    );
  }
}
export default RightBar;
