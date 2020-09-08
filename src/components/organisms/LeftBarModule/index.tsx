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
  ];

  return (
    <>
      <SideBarTabGroup title="Outline" buttons={outlineButtons} />
    </>
  );
};

export default LeftBarModule;
