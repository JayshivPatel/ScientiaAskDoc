import React from "react";
import LeftBar from "components/organisms/LeftBar";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import { faCalendarAlt, faList, faUpload, faArchive, faGavel, faTable, faFont } from "@fortawesome/free-solid-svg-icons";

const LeftBarExams: React.FC = () => {

  let examButtons = [
    {
      title: "Overview",
      icon: faList,
      activeURL: `/exams/overview`,
    },
    {
      title: "Past Papers",
      icon: faArchive,
      activeURL: `/exams/papers`,
    },
    {
      title: "Exam Timetable",
      icon: faCalendarAlt,
      activeURL: `/exams/timetable`,
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
		{
      title: "Regulations",
      icon: faGavel,
      externalURL: `https://www.imperial.ac.uk/computing/current-students/course-admin/regulations/meng-comp/`,
    },
  ];

  return (
    <LeftBar>
      <SideBarTabGroup title="Pages" buttons={examButtons} />
    </LeftBar>
  );
};

export default LeftBarExams;
