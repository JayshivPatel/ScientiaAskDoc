import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./style.module.scss";
import { faGlobe, faFileAlt, faPrint, faFileInvoice, faDatabase, faBullhorn, faUserFriends, faBug } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardButtonGroup: React.FC = () => {

	// @ts-ignore
	useEffect(() => {window.Holder.run()});

  return (
    <>
      <Row style={{ marginTop: "45px" }}>
        {buttons.map(({title, icon}, i) => (
          <Col xs={6} sm={6} md={3} key={i}>
            <Button className={styles.dashboardButton}>
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
    title: "Student Record",
    icon: faFileInvoice,
  },
  {
    title: "Personal Website",
    icon: faGlobe,
  },
  {
    title: "TeachDB",
    icon: faDatabase,
  },
  {
    title: "Notice Board",
    icon: faBullhorn,
  },
  {
    title: "Documents",
    icon: faFileAlt,
  },
  {
    title: "Printing",
    icon: faPrint,
  },
  {
    title: "DoCSoc",
    icon: faUserFriends,
  },
  {
    title: "Report Bugs",
    icon: faBug,
  }
]
