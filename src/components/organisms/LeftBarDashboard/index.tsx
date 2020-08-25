import React from "react";
import LeftBar from "components/organisms/LeftBar";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";
import {
  faFlask,
  faEnvelopeOpen,
  faUserFriends,
  faPlay,
  faStarHalfAlt
} from "@fortawesome/free-solid-svg-icons";
import WorkDueGroup from "components/molecules/WorkDueGroup";

const LeftBarDashboard: React.FC = () => {
  let linkButtons = [
    {
      title: "GitLab",
      icon: faGitlab,
      externalURL: "https://gitlab.doc.ic.ac.uk/"
    },
    {
      title: "Outlook",
      icon: faEnvelopeOpen,
      externalURL: "https://outlook.office.com/"
    },
    {
      title: "Piazza",
      icon: faUserFriends,
      externalURL: "https://piazza.com/"
    },
    {
      title: "Panopto",
      icon: faPlay,
      externalURL: "https://imperial.cloud.panopto.eu/Panopto/"
    },
    {
      title: "DocPA",
      icon: faStarHalfAlt,
      externalURL: "https://docpa.doc.ic.ac.uk/"
    },
    {
      title: "LabTS",
      icon: faFlask,
      externalURL: "https://teaching.doc.ic.ac.uk/labts"
    }
  ];

  return (
    <LeftBar>
      <SideBarTabGroup title="Links" buttons={linkButtons} />
      <WorkDueGroup />
    </LeftBar>
  );
};

export default LeftBarDashboard;
