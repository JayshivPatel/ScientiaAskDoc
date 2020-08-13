import React, { useEffect } from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./style.module.scss";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModuleOverview: React.FC = () => {

	// @ts-ignore
	useEffect(() => {window.Holder.run()});

  return (
    <>
      <MyBreadcrumbs />

      {/* User Card */}

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

      {/* User Buttons */}

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

      {/* Tutors and Notice Board */}

      <Row style={{ marginTop: "30px" }}>
        <Col>
          <h4>Tutors</h4>

          {/* Tutor 1 */}

          <Container
            style={{
              display: "flex",
              padding: 0,
              marginTop: "20px",
              alignItems: "center"
            }}
          >
            <span>
              <Image className={styles.tutorImage} src="holder.js/60x60" />
            </span>
            <span style={{ height: "72px" }}>
              <p className={styles.tutorName}>Dr. Nicolas Wu</p>
              <p className={styles.tutorEmail}>n.wu@imperial.ac.uk</p>
              <p className={styles.tutorAddress}>374, Huxley Building</p>
            </span>
          </Container>

          {/* Tutor 2 */}

          <Container
            style={{
              display: "flex",
              padding: 0,
              marginTop: "15px",
              alignItems: "center"
            }}
          >
            <span>
              <Image className={styles.tutorImage} src="holder.js/60x60" />
            </span>
            <span style={{ height: "72px" }}>
              <p className={styles.tutorName}>Dr. Sophia Drossopoulou</p>
              <p className={styles.tutorEmail}>s.drossopoulou@imperial.ac.uk</p>
              <p className={styles.tutorAddress}>559, Huxley Building</p>
            </span>
          </Container>

          {/* Tutor 3 */}

          <Container
            style={{
              display: "flex",
              padding: 0,
              marginTop: "15px",
              alignItems: "center"
            }}
          >
            <span>
              <Image className={styles.tutorImage} src="holder.js/60x60" />
            </span>
            <span style={{ height: "72px" }}>
              <p className={styles.tutorName}>Mr. Evangelos Ververas</p>
              <p className={styles.tutorEmail}>e.ververas16@imperial.ac.uk</p>
              <p className={styles.tutorAddress}>Huxley Building</p>
            </span>
          </Container>
        </Col>
        <Col>
          <h4>Notice Board</h4>

          {/* Notice 1 */}
          <div style={{ marginTop: "20px" }} className={styles.noticeContainer}>
            <p className={styles.noticeHeading}>Lab Closure Information</p>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <p className={styles.noticeUser}>Konstantinos Gkotuzis</p>
              <p className={styles.noticeTime}>1 Minute Ago</p>
            </span>
            <p className={styles.noticeBody}>
              Computing lab rooms 209, 208, and 210 would be closed for the year
              one haskell exams on Friday 20th of April.
            </p>
          </div>

          {/* Notice 2 */}

          <div style={{ marginTop: "15px" }} className={styles.noticeContainer}>
            <p className={styles.noticeHeading}>Lab Closure Information</p>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <p className={styles.noticeUser}>Konstantinos Gkotuzis</p>
              <p className={styles.noticeTime}>1 Minute Ago</p>
            </span>
            <p className={styles.noticeBody}>
              Computing lab rooms 209, 208, and 210 would be closed for the year
              one haskell exams on Friday 20th of April.
            </p>
          </div>

          {/* Notice 3 */}

          <div style={{ marginTop: "15px" }} className={styles.noticeContainer}>
            <p className={styles.noticeHeading}>Lab Closure Information</p>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <p className={styles.noticeUser}>Konstantinos Gkotuzis</p>
              <p className={styles.noticeTime}>1 Minute Ago</p>
            </span>
            <p className={styles.noticeBody}>
              Computing lab rooms 209, 208, and 210 would be closed for the year
              one haskell exams on Friday 20th of April.
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ModuleOverview;
