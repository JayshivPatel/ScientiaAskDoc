import React from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PersonCard from "components/atoms/PersonCard";
import PageButtonGroup from "components/molecules/PageButtonGroup";
import TutorCardGroup from "components/molecules/TutorCardGroup";
import NoticeBoard from "components/organisms/NoticeBoard";
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
      <PageButtonGroup buttons={buttons} style={{ marginTop: "2.8rem" }}/>
      <Row>
        <Col xs={12} sm={12} md={12} lg={6} style={{ marginTop: "30px", paddingRight: "10px", paddingLeft: "10px"}}>
          <TutorCardGroup />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} style={{ marginTop: "30px", paddingRight: "10px", paddingLeft: "10px"}}>
          <NoticeBoard />
        </Col>
      </Row>
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

export default Dashboard;
