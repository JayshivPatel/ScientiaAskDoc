import React from "react";
import LeftBar from "components/organisms/LeftBar";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import { faDiscourse } from "@fortawesome/free-brands-svg-icons";
import { useParams } from "react-router-dom";

const LeftBarModule: React.FC = () => {
  let { id } = useParams();

  let piazzaClasses: {
    [index: string]: string;
  } = {
    CO140: "k0r3c04qwhj3e",
    CO142: "k0r3c156mj35b",
    CO112: "k0r3by316kp6",
    CO145: "k0r3c1h4zik5y",
  };

  let piazzaLink = "https://piazza.com/class/";
  if (piazzaClasses[id] !== undefined && piazzaClasses[id]) {
    piazzaLink += piazzaClasses[id];
  }

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
			externalURL: piazzaLink,
    },
  ];

  return (
    <LeftBar>
      <SideBarTabGroup title="Outline" buttons={outlineButtons} />
    </LeftBar>
  );
};

export default LeftBarModule;
