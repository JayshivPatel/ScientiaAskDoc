import React from "react";

interface TimelineProps {
	initSideBar: () => void;
	revertSideBar: () => void;
}

class Timeline extends React.Component<TimelineProps, {}> {

  componentDidMount() {;
		this.props.initSideBar();
  }

  componentWillUnmount() {
    this.props.revertSideBar();
  }

  render() {
		
    return <></>;
  }
}

export default Timeline;
