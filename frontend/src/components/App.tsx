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

  componentDidMount() {
    let interfaceSize = localStorage.getItem("interfaceSize");
    if (interfaceSize) {
      document.documentElement.style.fontSize = `${interfaceSize}%`;
		}
		
		window.addEventListener('resize', () => this.showOrHideSideBars());
		this.showOrHideSideBars();
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

	showOrHideSideBars(){
		if (window.innerWidth <= 1024) {
      this.setState({
				toggledLeft: false,
        toggledRight: false,
			});
		} else{
			this.setState({
				toggledLeft: true,
        toggledRight: true,
			});
		}
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
