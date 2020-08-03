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
  isToggled: boolean;
};

class App extends React.Component<{}, MyState> {
  constructor(props: {}) {
    super(props);
    this.state = { isToggled: false };
  }

  handleIconClick(e: React.MouseEvent<HTMLImageElement>) {
    e.preventDefault();
    this.setState((state) => ({
      isToggled: !state.isToggled,
    }));
  }

  render() {
    const horizontalBarPages = [
      { name: "Courses", path: "/courses", icon: faChalkboardTeacher },
      { name: "Timetable", path: "/timetable", icon: faCalendarWeek },
      { name: "Exams", path: "/exams", icon: faBookOpen },
      { name: "Other", path: "/other", icon: faEllipsisH },
    ];

    return (
      <>
        <TopBar
          pages={horizontalBarPages}
          onIconClick={(e) => this.handleIconClick(e)}
        />

        <StandardView
          pages={horizontalBarPages}
          isToggled={this.state.isToggled}
        />

        <BottomBar pages={horizontalBarPages} />
      </>
    );
  }
}

export default App;
