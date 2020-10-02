import React from "react"
import SideBarTabGroup from "components/groups/SideBarTabGroup"
import {
  faArchive,
  faGavel,
  faFont,
  faPrint,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons"

const SideBarExamsGroup: React.FC = () => {
  let examButtons = [
    {
      title: "Past Papers",
      icon: faPrint,
      activeURL: `/exams/papers`,
    },
    {
      title: "Grading",
      icon: faFont,
      activeURL: `/exams/grading`,
    },
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
  ]

  return <SideBarTabGroup title="Pages" buttons={examButtons} />
}

export default SideBarExamsGroup
