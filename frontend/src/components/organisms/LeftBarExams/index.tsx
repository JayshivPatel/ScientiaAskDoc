import React from "react";
import LeftBar from "components/organisms/LeftBar";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import { faCalendarAlt, faList, faUpload, faArchive, faGavel, faTable, faFont } from "@fortawesome/free-solid-svg-icons";

const LeftBarExams: React.FC = () => {

  let examButtons = [
    {
      title: "Overview",
      icon: faList,
      activeURL: `/exams`,
    },
    {
      title: "Past Papers",
      icon: faArchive,
      activeURL: `/exams/papers`,
    },
    {
      title: "Submissions",
      icon: faUpload,
      activeURL: `/exams/submissions`,
    },
    {
      title: "Exam Timetable",
      icon: faCalendarAlt,
      activeURL: `/exams/timetable`,
    },
    {
      title: "Regulations",
      icon: faGavel,
      activeURL: `/exams/regulations`,
    },
    {
      title: "Grading",
      icon: faFont,
      activeURL: `/exams/grading`,
    },
    {
      title: "Rubrics",
			icon: faTable,
      activeURL: `/exams/rubrics`,
    },
  ];

  return (
    <LeftBar>
      <SideBarTabGroup title="Links" buttons={examButtons} />
    </LeftBar>
  );
};

export default LeftBarExams;
