import React, { useEffect } from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userImage from "assets/images/user.png";

const PersonCard: React.FC = () => {

	// @ts-ignore
	useEffect(() => {window.Holder.run()});

  return (
    <>
      <Container style={{ display: "flex", padding: 0 }}>
        <span>
          <Image className={styles.userImage} src={userImage} />
        </span>
        <span style={{ height: "180px" }}>
          <p className={styles.userName}>{userInfo.name}</p>
          <p className={styles.userEmail}>{userInfo.email}</p>
          <p className={styles.userIdentifier}>
            {userInfo.id}
            <span className={styles.dot}></span>
            {userInfo.cid}
          </p>
          <p className={styles.userYear}>{userInfo.year + ','}</p>
          <p className={styles.userDepartment}>{userInfo.dep}</p>
          <p className={styles.userCourse}>{userInfo.course}</p>
        </span>
      </Container>
    </>
  );
};

export default PersonCard;

const userInfo = {
  name: "Branden Ritter",
  email: "branden.ritter20@imperial.ac.uk",
  id: "BR819",
  cid: "01343896",
  year: "First Year Undergraduate",
  dep: "Department of Computing",
  course: "MEng Computing (AI)"
}
