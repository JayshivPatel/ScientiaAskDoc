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

type MyState = {
  isToggled: boolean;
};

class App extends React.Component<{}, MyState> {
  constructor(props: {}) {
    super(props);
    this.state = { isToggled: false };
  }

  toggleLeftBar(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.setState((state) => ({
      isToggled: !state.isToggled,
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
          onIconClick={(e) => this.toggleLeftBar(e)}
        />

        <StandardView
          pages={horizontalBarPages}
					isToggled={this.state.isToggled}
					onOverlayClick={(e) => this.toggleLeftBar(e)}
        />

        <BottomBar pages={horizontalBarPages} />
      </>
    );
  }
}

export default App;
