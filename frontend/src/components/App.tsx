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

type AppState = {
  toggledLeft: boolean;
  toggledRight: boolean;
};

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { toggledLeft: false, toggledRight: false };
  }

  toggleLeftBar() {
    this.setState((state) => ({
      toggledLeft: !state.toggledLeft,
    }));
  }

  toggleRightBar() {
    this.setState((state) => ({
      toggledRight: !state.toggledRight,
    }));
  }

  render() {
    const horizontalBarPages = [
      { name: "Home", path: "/home", icon: faHome },
      { name: "Modules", path: "/modules", icon: faChalkboardTeacher },
      { name: "Timetable", path: "/timetable", icon: faCalendarWeek },
      { name: "Exams", path: "/exams", icon: faBookOpen },
    ];

    return (
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
          pages={horizontalBarPages}
					toggledLeft={this.state.toggledLeft}
          toggledRight={this.state.toggledRight}
          onOverlayClick={(e) => {
            e.preventDefault();
            this.setState({ toggledLeft: false, toggledRight: false });
          }}
        />

        <BottomBar pages={horizontalBarPages} />
      </>
    );
  }
}

export default App;
