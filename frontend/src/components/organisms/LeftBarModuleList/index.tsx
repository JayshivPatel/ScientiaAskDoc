import React from "react";
import LeftBar from "components/organisms/LeftBar";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import WorkDueGroup from "components/molecules/WorkDueGroup";

const LeftBarModuleList: React.FC = () => {
  let sortButtons = [
    {
			title: "All",
      active: true,
    },
    {
			title: "In Progress",
    },
    {
			title: "Not Started",
    },
    {
      title: "Completed",
    },
	];

  return (
    <LeftBar>
			<SideBarTabGroup title="Filter" buttons={sortButtons} />
			<WorkDueGroup/>
		</LeftBar>
  );
};

export default LeftBarModuleList;
