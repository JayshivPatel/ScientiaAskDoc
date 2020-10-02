import React from "react"
import MyBreadcrumbs from "components/headings/MyBreadcrumbs"
import PersonCard from "components/cards/PersonCard"
import PageButtonGroup from "components/groups/PageButtonGroup"
import TutorCardGroup from "components/groups/TutorCardGroup"

import {
  faGlobe,
  faFileAlt,
  faPrint,
  faFileInvoice,
  faDatabase,
  faQuestionCircle,
  faBug,
} from "@fortawesome/free-solid-svg-icons"

const Dashboard: React.FC = () => {
  return (
    <>
      <MyBreadcrumbs />
      <PersonCard />
      <PageButtonGroup buttons={buttons} style={{ marginTop: "2.8rem" }} />
      <div
        style={{
          marginTop: "1.875rem",
        }}>
        <TutorCardGroup title="Tutors" tutors={tutors} />
      </div>
    </>
  )
}

const buttons = [
  {
    title: "My Record",
    icon: faFileInvoice,
    url: "https://cate.doc.ic.ac.uk/student.cgi?key=2019",
  },
  {
    title: "My Website",
    icon: faGlobe,
    url: `https://www.doc.ic.ac.uk/~br819/`,
  },
  {
    title: "My Imperial",
    icon: faFileAlt,
    url: "https://my.imperial.ac.uk/HomeScreen.aspx",
  },
  {
    title: "TeachDB",
    icon: faDatabase,
    url: "https://teachdb.doc.ic.ac.uk/db/",
  },
  {
    title: "ICT Guides",
    icon: faQuestionCircle,
    url: "https://www.imperial.ac.uk/admin-services/ict/self-service/",
  },
  {
    title: "CSG Guides",
    icon: faQuestionCircle,
    url: "https://www.imperial.ac.uk/computing/csg/guides/",
  },
  {
    title: "Printing",
    icon: faPrint,
    url: "https://ictprintservice.imperial.ac.uk/safecom/webuser.dll/login",
  },
  {
    title: "Report Bugs",
    icon: faBug,
    url: "https://gitlab.doc.ic.ac.uk/edtech/scientia/-/issues/new",
  },
]

const tutors: {
  name: string
  email: string
  address: string
  image: string
}[] = [
  {
    name: "Dr. Zahid Barr",
    email: "zahid.barr@imperial.ac.uk",
    address: "373, Huxley Building",
    image: "/images/tutors/tutor-1.png",
  },
  {
    name: "Dr. Rosalind Baker",
    email: "rosalind.baker@imperial.ac.uk",
    address: "590, Huxley Building",
    image: "/images/tutors/tutor-2.png",
  },
  {
    name: "Mr. Subhaan Wicks",
    email: "subhaan.wicks16@imperial.ac.uk",
    address: "Huxley Building",
    image: "/images/tutors/tutor-3.png",
  },
  {
    name: "Mr. Jack Wu",
    email: "jack.wu16@imperial.ac.uk",
    address: "Huxley Building",
    image: "/images/tutors/tutor-4.jpeg",
  },
  {
    name: "Ms. Sarah Park",
    email: "sarah.park16@imperial.ac.uk",
    address: "Huxley Building",
    image: "/images/tutors/tutor-5.jpeg",
  },
]
export default Dashboard
