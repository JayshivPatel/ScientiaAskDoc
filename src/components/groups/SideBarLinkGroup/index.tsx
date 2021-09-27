import React from "react"
import SideBarTabGroup from "components/groups/SideBarTabGroup"
import { faGitlab } from "@fortawesome/free-brands-svg-icons"
import {
  faFlask,
  faEnvelopeOpen,
  faUserFriends,
  faPlay,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons"

const LeftBarDashboard: React.FC = () => {
  let linkButtons = [
    {
      title: "GitLab",
      icon: faGitlab,
      externalURL: "https://gitlab.doc.ic.ac.uk/",
    },
    {
      title: "Outlook",
      icon: faEnvelopeOpen,
      externalURL: "https://outlook.office.com/",
    },
    {
      title: "EdStem",
      icon: faUserFriends,
      externalURL: "https://edstem.org/us/dashboard",
    },
    {
      title: "Panopto",
      icon: faPlay,
      externalURL: "https://imperial.cloud.panopto.eu/Panopto/",
    },
    {
      title: "Peer Assessment",
      icon: faStarHalfAlt,
      externalURL: "https://peer-assessment.doc.ic.ac.uk/",
    },
    {
      title: "LabTS",
      icon: faFlask,
      externalURL: "https://teaching.doc.ic.ac.uk/labts",
    },
  ]

  return <SideBarTabGroup title="Links" buttons={linkButtons} />
}

export default LeftBarDashboard
