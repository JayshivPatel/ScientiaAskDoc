import React from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import PersonCard from "components/atoms/PersonCard";
import PageButtonGroup from "components/molecules/PageButtonGroup";
import TutorCardGroup from "components/molecules/TutorCardGroup";
import tutorImage1 from "assets/images/tutor-1.png";
import tutorImage2 from "assets/images/tutor-2.png";
import tutorImage3 from "assets/images/tutor-3.png";
import tutorImage4 from "assets/images/tutor-4.jpeg";
import tutorImage5 from "assets/images/tutor-5.jpeg";
import {
  faGlobe,
  faFileAlt,
  faPrint,
  faFileInvoice,
  faDatabase,
  faQuestionCircle,
  faBug,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard: React.FC = () => {
  return (
    <>
      <MyBreadcrumbs />
      <PersonCard />
      <PageButtonGroup buttons={buttons} style={{ marginTop: "2.8rem" }} />
      <div
        style={{
          marginTop: "1.875rem",
        }}
      >
        <TutorCardGroup title="Tutors" tutors={tutors}/>
      </div>
    </>
  );
};

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
];

const tutors: {
  name: string;
  email: string;
  address: string;
  image: string;
}[] = [
  {
    name: "Dr. Zahid Barr",
    email: "zahid.barr@imperial.ac.uk",
    address: "373, Huxley Building",
    image: tutorImage1,
  },
  {
    name: "Dr. Rosalind Baker",
    email: "rosalind.baker@imperial.ac.uk",
    address: "590, Huxley Building",
    image: tutorImage2,
  },
  {
    name: "Mr. Subhaan Wicks",
    email: "subhaan.wicks16@imperial.ac.uk",
    address: "Huxley Building",
    image: tutorImage3,
	},
	{
    name: "Mr. Jack Wu",
    email: "jack.wu16@imperial.ac.uk",
    address: "Huxley Building",
    image: tutorImage4,
  },
  {
    name: "Ms. Sarah Park",
    email: "sarah.park16@imperial.ac.uk",
    address: "Huxley Building",
    image: tutorImage5,
  },
];
export default Dashboard;
