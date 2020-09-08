import React from "react";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import {
  faUserFriends,
  faList,
  faArchive,
  faHighlighter,
  faHome,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
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
    "CO120.2": "k0r3bzfpcno23",
    CO150: "k0r3c1t4x8k6l",
    CO113: "k0r3byq0f68t",
    CO141: "k0r3c0t7dak4o",
    CO130: "k0r3bzsith2r",
  };

  let piazzaLink = "https://piazza.com/class/";
  if (piazzaClasses[id] !== undefined && piazzaClasses[id]) {
    piazzaLink += piazzaClasses[id];
  }

  let outlineButtons = [
    {
      title: "Dashboard",
      activeURL: `/modules/${id}/dashboard`,
      icon: faHome,
    },
    {
      title: "Overview",
      activeURL: `/modules/${id}/overview`,
      icon: faList,
    },
    {
      title: "Resources",
      activeURL: `/modules/${id}/resources`,
      icon: faArchive,
    },
    {
      title: "Submissions",
      activeURL: `/modules/${id}/submissions`,
      icon: faUpload,
    },
    {
      title: "Feedback",
      activeURL: `/modules/${id}/feedback`,
      icon: faHighlighter,
    },
    {
      title: "Piazza",
      icon: faUserFriends,
      externalURL: piazzaLink,
    },
  ];

  return (
    <>
      <SideBarTabGroup title="Outline" buttons={outlineButtons} />
    </>
  );
};

export default LeftBarModule;
