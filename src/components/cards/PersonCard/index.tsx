import React from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import styles from "./style.module.scss";
import { PersonInfo } from "constants/types";

interface Props {
  info: PersonInfo;
}

const PersonCard: React.FC<Props> = ({
  info: { name, email, id, cid, dep, extra },
}) => {
  return (
    <>
      <Container className={styles.userCardContainer}>
        <Image className={styles.userImage} src="/images/user.png" />
        <div className={styles.userInfoBlock}>
          <p className={styles.userName}>{name}</p>
          <p className={styles.userEmail}>{email}</p>
          <p className={styles.userIdentifier}>
            {id}
            <span className={styles.dot}></span>
            {cid}
          </p>
          {extra.kind === "student" ? (
            <>
              <p className={styles.userYear}>{extra.year + ","}</p>
              <p className={styles.userDepartment}>{dep}</p>
              <p className={styles.userCourse}>{extra.course}</p>
            </>
          ) : (
            <>
              <p className={styles.userCourse}>{extra.title}</p>
              <p className={styles.userDepartment}>{dep}</p>
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default PersonCard;
