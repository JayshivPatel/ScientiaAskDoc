import React from "react";
import LeftBar from "components/organisms/LeftBar";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";
import { faFlask, faAward, faDatabase, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import WorkDueGroup from "components/molecules/WorkDueGroup";

const LeftBarDashboard: React.FC = () => {
  let linkButtons = [
    {
			title: "GitLab",
			icon: faGitlab,
			externalURL: "https://gitlab.doc.ic.ac.uk/",
    },
    {
			title: "Outlook",
			icon: faEnvelopeOpen,
			externalURL: "https://outlook.office.com/",
    },
    {
			title: "DocPA",
			icon: faAward,
			externalURL: "https://docpa.doc.ic.ac.uk/",
		},
		{
			title: "LabTS",
			icon: faFlask,
			externalURL: "https://teaching.doc.ic.ac.uk/labts",
    },
    {
			title: "teachDB",
			icon: faDatabase,
			externalURL: "https://teachdb.doc.ic.ac.uk/db/",
    },
	];

  return (
    <LeftBar>
			<SideBarTabGroup title="Links" buttons={linkButtons} />
			<WorkDueGroup/>
		</LeftBar>
  );
};

export default LeftBarDashboard;
