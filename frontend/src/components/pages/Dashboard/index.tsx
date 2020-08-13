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

import PersonCard from "components/atoms/PersonCard";
import DashboardButtonGroup from "components/molecules/DashboardButtonGroup";
import TutorCard from "components/atoms/TutorCard";
import TutorCardGroup from "components/molecules/TutorCardGroup";

import tutorImage1 from "assets/images/tutor-1.png";
import tutorImage2 from "assets/images/tutor-2.png";
import tutorImage3 from "assets/images/tutor-3.png";


const Dashboard: React.FC = () => {
  return (
    <>
      <MyBreadcrumbs />
      <PersonCard />
      <DashboardButtonGroup />
      <Row style={{ marginTop: "30px" }}>
        <TutorCardGroup tutors={tutors} />
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

export default Dashboard;

const tutors = [
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
  }
];
