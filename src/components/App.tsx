import React from "react";
import "./App.scss";
import TopBar from "./organisms/TopBar";
import BottomBar from "./organisms/BottomBar";
import {
  faBookOpen,
  faHome,
  faCalendarWeek,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import StandardView from "./pages/StandardView";
import { Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SettingsModal from "./pages/SettingsModal";

type AppState = {
  toggledLeft: boolean;
  toggledRight: boolean;
  showSettings: boolean;
  fileView: string;
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
      fileView: localStorage.getItem("fileView") || "card",
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

  render() {
    const horizontalBarPages = [
      { name: "Dashboard", path: "/dashboard", icon: faHome },
      { name: "Modules", path: "/modules", icon: faChalkboardTeacher },
      { name: "Timeline", path: "/timeline", icon: faCalendarWeek },
      { name: "Exams", path: "/exams", icon: faBookOpen },
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
        />

        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>

          <Route path="/">
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
              onSettingsClick={() => this.setState({ showSettings: true })}
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
            />

            <BottomBar pages={horizontalBarPages} />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
