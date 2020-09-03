import React from "react";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import { faSun, faLeaf, faSeedling } from "@fortawesome/free-solid-svg-icons";
import WorkDueGroup from "components/molecules/WorkDueGroup";

const LeftBarTimeline: React.FC = () => {
  let termButtons = [
    {
      title: "Autumn",
      icon: faLeaf,
    },
    {
      title: "Spring",
      icon: faSeedling,
    },
    {
      title: "Summer",
      icon: faSun,
    },
  ];

  return (
    <>
      <SideBarTabGroup title="Terms" buttons={termButtons} />
      <WorkDueGroup />
    </>
  );
};

export default LeftBarTimeline;
