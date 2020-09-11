import React from "react";
import SideBarTabGroup from "components/groups/SideBarTabGroup";
import {
  // faCalendarAlt,
  // faList,
  faArchive,
  faGavel,
  // faTable,
  faFont,
  faPrint,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

const SideBarExamsGroup: React.FC = () => {
  let examButtons = [
    // {
    //   title: "Overview",
    //   icon: faList,
    //   activeURL: `/exams/overview`
    // },
    {
      title: "Past Papers",
      icon: faPrint,
      activeURL: `/exams/papers`,
    },
    // {
    //   title: "Exam Timetable",
    //   icon: faCalendarAlt,
    //   activeURL: `/exams/timetable`
    // },
    {
      title: "Grading",
      icon: faFont,
      activeURL: `/exams/grading`,
    },
    // {
    //   title: "Rubrics",
    //   icon: faTable,
    //   activeURL: `/exams/rubrics`
    // },
    {
      title: "Archive",
      icon: faArchive,
      externalURL: `https://exams.doc.ic.ac.uk/archive.html`,
    },
    {
      title: "Regulations",
      icon: faGavel,
      externalURL: `https://www.imperial.ac.uk/computing/current-students/course-admin/regulations/`,
    },
    {
      title: "More",
      icon: faEllipsisH,
      externalURL: `https://exams.doc.ic.ac.uk`,
    },
  ];

  return (
      <SideBarTabGroup title="Pages" buttons={examButtons} />
  );
};

export default SideBarExamsGroup;
