import React from "react";
import LeftBar from "components/organisms/LeftBar";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import WorkDueGroup from "components/molecules/WorkDueGroup";

const LeftBarModuleList: React.FC = () => {
  let sortButtons = [
    {
			title: "Progress",
    },
    {
			title: "Module Title",
      active: true,
    },
    {
			title: "Module Code",
    },
    {
      title: "Term",
    },
	];

  return (
    <LeftBar>
			<SideBarTabGroup title="Sort" buttons={sortButtons} />
		</LeftBar>
  );
};

export default LeftBarModuleList;
