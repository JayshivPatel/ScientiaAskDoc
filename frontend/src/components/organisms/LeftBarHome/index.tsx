import React from "react";
import LeftBar from "components/organisms/LeftBar";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";
import { faFlask, faAward, faDatabase } from "@fortawesome/free-solid-svg-icons";

const LeftBarHome: React.FC = () => {
  let linkButtons = [
    {
			title: "GitLab",
			icon: faGitlab,
    },
    {
			title: "LabTS",
			icon: faFlask,
    },
    {
			title: "DocPA",
			icon: faAward,
    },
    {
			title: "teachDB",
			icon: faDatabase,
    },
	];

  return (
    <LeftBar>
			<SideBarTabGroup title="Links" buttons={linkButtons} />
		</LeftBar>
  );
};

export default LeftBarHome;
