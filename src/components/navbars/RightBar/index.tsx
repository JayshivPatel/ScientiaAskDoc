import React from "react"
import {Redirect} from "react-router-dom"
import styles from "./style.module.scss"
import SideBarTabGroup from "components/groups/SideBarTabGroup"
import {faCog, faSignOutAlt} from "@fortawesome/free-solid-svg-icons"
import authenticationService from "utils/auth"
import {CalendarEvent} from "constants/types"

export interface RightBarState {
  date: Date
  redirect: string | null
}

export interface RightBarProps {
  onSettingsClick: (event?: React.MouseEvent) => void
  onCalendarClick: (e?: CalendarEvent) => void
}

class RightBar extends React.Component<RightBarProps, RightBarState> {
  private timerID: number = 0

  constructor(props: RightBarProps) {
    super(props)
    this.state = { date: new Date(), redirect: null }
  }

  componentDidMount() {
    this.timerID = window.setInterval(
      () =>
        this.setState({
          date: new Date(),
        }),
      1000
    )
  }

  componentWillUnmount() {
    window.clearInterval(this.timerID)
  }

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    let buttons = [
      {
        title: "Settings",
        icon: faCog,
        onClick: this.props.onSettingsClick,
      },
      {
        title: "Sign Out",
        icon: faSignOutAlt,
        onClick: () => {
          authenticationService.logout()
          this.setState({ redirect: "/signin" })
        },
      },
    ]

    let timeOptions = {
      timeZone: "Europe/London",
      hourCycle: "h23",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "short",
      day: "2-digit",
      month: "short",
    }
    return (
      <div id={styles.rightbarWrapper}>
        <p className={styles.rightbarStatus}>
          {this.state.date.toLocaleString("en-GB", timeOptions)}
        </p>
        {/* <CalendarGroup onCalendarClick={this.props.onCalendarClick} onSettingsClick={this.props.onSettingsClick} /> */}
        <SideBarTabGroup title="Account" buttons={buttons} />
      </div>
    )
  }
}
export default RightBar
