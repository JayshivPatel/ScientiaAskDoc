import React from "react";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import WorkDueGroup from "components/molecules/WorkDueGroup";

export interface LeftBarModuleListProps {
  setModulesFilter: any;
  modulesFilter: String;
}

const LeftBarModuleList: React.FC<LeftBarModuleListProps> = ({
  modulesFilter,
  setModulesFilter
}: LeftBarModuleListProps) => {
  let sortButtons = [
    {
      title: "All",
      active: modulesFilter === "",
      onClick: () => {
        setModulesFilter("");
      }
    },
    {
      title: "In Progress",
      active: modulesFilter === "In Progress",
      onClick: () => {
        setModulesFilter("In Progress");
      }
    },
    {
      title: "Not Started",
      active: modulesFilter === "Not Started",
      onClick: () => {
        setModulesFilter("Not Started");
      }
    },
    {
      title: "Completed",
      active: modulesFilter === "Completed",
      onClick: () => {
        setModulesFilter("Completed");
      }
    }
  ];

  return (
    <>
      <SideBarTabGroup title="Filter" buttons={sortButtons} />
      <WorkDueGroup />
    </>
  );
};

export default LeftBarModuleList;
