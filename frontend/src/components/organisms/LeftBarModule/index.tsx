import React from "react";
import LeftBar from "components/organisms/LeftBar";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import { faDiscourse } from "@fortawesome/free-brands-svg-icons";

const LeftBarModule: React.FC = () => {
	let outlineButtons = [
    {
			title: "Overview",
      activeURL: "overview",
    },
    {
			title: "Coursework",
      activeURL: "coursework",
    },
    {
			title: "Materials",
      activeURL: "materials",
    },
    {
			title: "Piazza",
			icon: faDiscourse,
		},
  ];

  return (
    <LeftBar>
			<SideBarTabGroup title="Outline" buttons={outlineButtons} />
		</LeftBar>
  );
};

export default LeftBarModule;
