import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./style.module.scss";
import classnames from "classnames";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModuleOverview: React.FC = () => {

	// @ts-ignore
	useEffect(() => {window.Holder.run()});

  return (
    <>
      <MyBreadcrumbs />
      <Container style={{ display: "flex", padding: 0 }}>
        <span>
          <Image className={styles.dashboardImage} src="holder.js/180x180" />
        </span>
        <span style={{ height: "180px" }}>
          <p className={styles.userName}>Sudarshan Sreeram</p>
          <p className={styles.userEmail}>sudarshan.sreeram19@imperial.ac.uk</p>
          <p className={styles.userIdentifier}>
            SS8119
            <span className={styles.dot}></span>
            CID 01721552
          </p>
          <p className={styles.userYear}>First Year Undergraduate,</p>
          <p className={styles.userDepartment}>Department of Computing</p>
          <p className={styles.userCourse}>MEng Computing (IP)</p>
        </span>
      </Container>
      <Row style={{ marginTop: "30px" }}>
        {[...Array(8)].map((e, i) => (
          <Col xs={6} sm={6} md={3} key={i}>
            <Button className={styles.dashboardButton}>
              Button {i}
                <FontAwesomeIcon
                  style={{ fontSize: "1.125rem" }}
                  icon={faFile}
                  className={styles.dashboardButtonSvg}
                />
            </Button>
          </Col>
        ))}
      </Row>
      <Row style={{marginTop: "30px"}}>
      <Col>
        <h4>Tutors</h4>
        </Col>
        <Col>
          <h4>Notice Board</h4>
        </Col>
      </Row>
    </>
  );
};

export default ModuleOverview;
