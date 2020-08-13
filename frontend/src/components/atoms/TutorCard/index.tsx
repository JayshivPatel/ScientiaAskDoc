import React, { useEffect } from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import styles from "./style.module.scss";

export interface TutorCardProp {
  name: string;
  email: string;
  address: string;
  image: string;
}

const TutorCard: React.FC<TutorCardProp> = ({
  name, 
  email,
  address, 
  image,
}: TutorCardProp) => {

  return (
    <>
      <Container
        style={{
          display: "flex",
          padding: 0,
          marginTop: "20px",
          alignItems: "center"
        }}
      >
        <span>
          <Image className={styles.tutorImage} src={image} />
        </span>
        <span style={{ height: "72px" }}>
          <p className={styles.tutorName}>{name}</p>
          <p className={styles.tutorEmail}>{email}</p>
          <p className={styles.tutorAddress}>{address}</p>
        </span>
      </Container>
    </>
  );
};

export default TutorCard;
