import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  faGlobe,
  faFileAlt,
  faPrint,
  faFileInvoice,
  faDatabase,
  faQuestionCircle,
  faBug,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ButtonGroupProps {
	loginShort: string;
}

const DashboardButtonGroup: React.FC<ButtonGroupProps> = ({loginShort}: ButtonGroupProps) => {
	const buttons = [
		{
			title: "My Record",
			icon: faFileInvoice,
			url: "https://cate.doc.ic.ac.uk/student.cgi?key=2019",
		},
		{
			title: "My Website",
			icon: faGlobe,
			url: `https://www.doc.ic.ac.uk/~${loginShort}/`,
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
	
  return (
    <>
      <Row style={{ marginTop: "45px" }}>
        {buttons.map(({ title, icon, url }, i) => (
          <Col xs={6} sm={6} md={4} lg={4} xl={3} key={i} style={{ paddingRight: "10px", paddingLeft:"10px"}}>
            <Button
              href={url}
              target="_blank"
            >
              {title}
              <FontAwesomeIcon
                style={{ fontSize: "1.125rem" }}
                icon={icon}
              />
            </Button>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default DashboardButtonGroup;