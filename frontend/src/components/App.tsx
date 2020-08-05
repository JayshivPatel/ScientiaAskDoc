import React from "react";
import "./App.scss";

import TopBar from "./organisms/TopBar";
import BottomBar from "./organisms/BottomBar";
import {
  faBookOpen,
  faEllipsisH,
  faCalendarWeek,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import StandardView from "./pages/StandardView";

type MyState = {
  toggledLeft: boolean;
};

class App extends React.Component<{}, MyState> {
  constructor(props: {}) {
    super(props);
    this.state = { toggledLeft: false };
  }

  toggleLeftBar(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.setState((state) => ({
      toggledLeft: !state.toggledLeft,
    }));
  }

  render() {
    const horizontalBarPages = [
      { name: "Modules", path: "/modules", icon: faChalkboardTeacher },
      { name: "Timetable", path: "/timetable", icon: faCalendarWeek },
      { name: "Exams", path: "/exams", icon: faBookOpen },
      { name: "Other", path: "/other", icon: faEllipsisH },
    ];

    return (
      <>
        <TopBar
          pages={horizontalBarPages}
          onIconClick={(e) => this.toggleLeftBar(e)}
        />

        <StandardView
          pages={horizontalBarPages}
					toggledLeft={this.state.toggledLeft}
					onOverlayClick={(e) => this.toggleLeftBar(e)}
        />

        <BottomBar pages={horizontalBarPages} />
      </>
    );
  }
}

export default App;
