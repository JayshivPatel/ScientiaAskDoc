import React from "react"
import SideBarTabGroup from "components/groups/SideBarTabGroup"
import {
  faList,
  faArchive,
  faHighlighter,
  faHome,
  faUpload,
} from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"

const SideBarOutlineGroup: React.FC = () => {
  let { id, feedbackID } = useParams()

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
      title: "Course Materials",
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
      activeURL: `/modules/${id}/feedback/${feedbackID}`,
      icon: faHighlighter,
    },
  ]

  return <SideBarTabGroup title="Outline" buttons={outlineButtons} />
}

export default SideBarOutlineGroup
