import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./style.module.scss";
import {
  faGlobe,
  faFileAlt,
  faPrint,
  faFileInvoice,
  faDatabase,
  faBullhorn,
  faUserFriends,
  faBug,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardButtonGroup: React.FC = () => {
  return (
    <>
      <Row style={{ marginTop: "45px" }}>
        {buttons.map(({ title, icon, url }, i) => (
          <Col xs={6} sm={6} md={3} key={i}>
            <Button
              className={styles.dashboardButton}
              href={url}
              target="_blank"
            >
              {title}
              <FontAwesomeIcon
                style={{ fontSize: "1.125rem" }}
                icon={icon}
                className={styles.dashboardButtonSvg}
              />
            </Button>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default DashboardButtonGroup;

const buttons = [
  {
    title: "Record",
    icon: faFileInvoice,
    url: "https://cate.doc.ic.ac.uk/student.cgi?key=2019",
  },
  {
    title: "Website",
    icon: faGlobe,
    url: "https://www.doc.ic.ac.uk/~js4416/",
  },
  {
    title: "TeachDB",
    icon: faDatabase,
    url: "https://teachdb.doc.ic.ac.uk/db/",
  },
  {
    title: "Notice Board",
    icon: faBullhorn,
  },
  {
    title: "Documents",
    icon: faFileAlt,
    url: "https://my.imperial.ac.uk/HomeScreen.aspx",
  },
  {
    title: "Printing",
    icon: faPrint,
    url: "https://ictprintservice.imperial.ac.uk/safecom/webuser.dll/login",
  },
  {
    title: "DoCSoc",
    icon: faUserFriends,
    url: "https://docsoc.co.uk/",
  },
  {
    title: "Report Bugs",
    icon: faBug,
    url: "https://gitlab.doc.ic.ac.uk/edtech/scientia/-/issues/new",
  },
];
