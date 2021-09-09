import React from "react"
import SideBarTabGroup from "components/groups/SideBarTabGroup"
import {
  faArchive,
  faHighlighter,
  faHome,
} from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"

const SideBarOutlineGroup: React.FC = () => {
  let { year, id } = useParams()

  let outlineButtons = [
    {
      title: "Overview",
      activeURL: `/${year}/modules/${id}/dashboard`,
      icon: faHome,
    },
    // {
    // 	title: "Overview",
    // 	activeURL: `/modules/${id}/overview`,
    // 	icon: faList,
    // },
    {
      title: "Materials",
      activeURL: `/${year}/modules/${id}/resources`,
      icon: faArchive,
    },
    // {
    //   title: "Submissions",
    //   activeURL: `/modules/${id}/submissions`,
    //   icon: faUpload,
    // },
    {
      title: "Feedback",
      activeURL: `/${year}/modules/${id}/feedback`,
      icon: faHighlighter,
    },
  ]

  return <SideBarTabGroup title="Outline" buttons={outlineButtons} />
}

export default SideBarOutlineGroup
