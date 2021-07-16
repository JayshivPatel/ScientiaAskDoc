import React from "react";
import {
  faCalendarWeek,
  faChalkboardTeacher,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import TopBar from "./navbars/TopBar";
import BottomBar from "./navbars/BottomBar";
import StandardView from "./pages";
import { Router, Redirect, Route, Switch } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SettingsModal from "./modals/SettingsModal";
import EventModal from "./modals/EventModal";
import { CalendarEvent, TimelineEvent } from "constants/types";
import authenticationService from "../utils/auth";
import CalendarModal from "./modals/CalendarModal";
import { TIMELINE_ACTIVE } from "constants/global";
import history from 'history.js'

type AppState = {
  toggledLeft: boolean;
  toggledRight: boolean;
  showSettings: boolean;
  fileView: string;
  showEventModal: boolean;
  showCalendarModal: boolean;
  activeModalEvent?: TimelineEvent;
  activeCalendarEvent?: CalendarEvent;
  year: string;
};

class App extends React.Component<{}, AppState> {
  width = window.innerWidth;
  isTimelineView = false;

  constructor(props: {}) {
    super(props);
    this.state = {
      toggledLeft: false,
      toggledRight: false,
      showSettings: false,
      showEventModal: false,
      showCalendarModal: false,
      activeModalEvent: undefined,
      fileView: localStorage.getItem("fileView") || "card",
      year: "2021",
    };
  }

  componentDidMount() {
    document.documentElement.style.fontSize = `${
      localStorage.getItem("interfaceSize") || "90"
    }%`;

    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light" || currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", currentTheme);
    } else {
      let mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addListener((mq) => this.setDarkTheme(mq.matches));
      this.setDarkTheme(mq.matches);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth !== this.width) {
        this.width = window.innerWidth;
        this.showOrHideSideBars();
      }
    });
    this.showOrHideSideBars();
  }

  setDarkTheme(toSet: boolean) {
    document.documentElement.setAttribute(
      "data-theme",
      toSet ? "dark" : "light"
    );
  }

  toggleLeftBar() {
    if (window.innerWidth <= 1024) {
      this.setState({
        toggledRight: false,
      });
    }
    this.setState((state) => ({
      toggledLeft: !state.toggledLeft,
    }));
  }

  toggleRightBar() {
    if (window.innerWidth <= 1024) {
      this.setState({
        toggledLeft: false,
      });
    }
    this.setState((state) => ({
      toggledRight: !state.toggledRight,
    }));
  }

  showOrHideSideBars() {
    if (window.innerWidth <= 1024 || this.isTimelineView) {
      this.setState({
        toggledLeft: false,
        toggledRight: false,
      });
    } else {
      this.setState({
        toggledLeft: true,
        toggledRight: true,
      });
    }
  }

  setFileView(view: string) {
    this.setState({ fileView: view });
    localStorage.setItem("fileView", view);
  }

  showEventModal(e?: TimelineEvent) {
    this.setState({ showEventModal: true, activeModalEvent: e });
  }

  showCalendarModal(e?: CalendarEvent) {
    this.setState({ showCalendarModal: true, activeCalendarEvent: e });
  }

  render() {
    const horizontalBarPages: {
      name: string;
      path: string;
      icon: IconDefinition;
    }[] = [
      /* { name: "Dashboard", path: "/dashboard", icon: faHome }, */
      { name: "Modules", path: "/modules", icon: faChalkboardTeacher },
      { name: "Timeline", path: "/timeline", icon: faCalendarWeek },
      /* { name: "Exams", path: "/exams", icon: faBookOpen }, */
    ];

    return (
      <>
        <SettingsModal
          show={this.state.showSettings}
          onHide={() => this.setState({ showSettings: false })}
          fileView={this.state.fileView}
          onCardViewClick={() => this.setFileView("card")}
          onListViewClick={() => this.setFileView("list")}
          setDarkTheme={(b) => this.setDarkTheme(b)}
          year={this.state.year}
          setYear={(year: string) => this.setState({ year: year })}
        />

        <CalendarModal
          show={this.state.showCalendarModal}
          onHide={() => this.setState({ showCalendarModal: false })}
          event={this.state.activeCalendarEvent}
        />

        <EventModal
          show={this.state.showEventModal}
          onHide={() => this.setState({ showEventModal: false })}
          event={this.state.activeModalEvent}
          activeDay={TIMELINE_ACTIVE}
        />
        <Router history={history}>
          <Switch>
            <Route path="/signin" component={SignIn} />

            <Route
              path="/"
              render={(props) =>
                authenticationService.userIsLoggedIn() ? (
                  <>
                    <TopBar
                      pages={horizontalBarPages}
                      onFavIconClick={(e) => {
                        e.preventDefault();
                        this.toggleLeftBar();
                      }}
                      onUserIconClick={(e) => {
                        e.preventDefault();
                        this.toggleRightBar();
                      }}
                    />

                    <StandardView
                      onSettingsClick={() =>
                        this.setState({ showSettings: true })
                      }
                      onEventClick={(e?: TimelineEvent) =>
                        this.showEventModal(e)
                      }
                      onCalendarClick={(e?: CalendarEvent) =>
                        this.showCalendarModal(e)
                      }
                      toggledLeft={this.state.toggledLeft}
                      toggledRight={this.state.toggledRight}
                      initTimelineSideBar={() => {
                        this.isTimelineView = true;
                        this.showOrHideSideBars();
                      }}
                      revertTimelineSideBar={() => {
                        this.isTimelineView = false;
                        this.showOrHideSideBars();
                      }}
                      onOverlayClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          toggledLeft: false,
                          toggledRight: false,
                        });
                      }}
                      fileView={this.state.fileView}
                      year={this.state.year}
                    />

                    <BottomBar pages={horizontalBarPages} />
                  </>
                ) : (
                  <Redirect
                    to={{
                      pathname: "/signin",
                      state: { from: props.location },
                    }}
                  />
                )
              }
            />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
