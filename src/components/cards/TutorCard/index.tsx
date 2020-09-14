import React from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import styles from "./style.module.scss";
import {openExternal} from "utils/functions";

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
  image
}: TutorCardProp) => {
  return (
    <>
      <Container
				className={styles.tutorContainer}
				onClick={() => openExternal(`mailto:${email}`)}
      >
        <Image className={styles.tutorImage} src={image} />
        <div>
          <h5 className={styles.tutorName}>{name}</h5>
          <p className={styles.tutorEmail}>{email}</p>
          <p className={styles.tutorAddress}>{address}</p>
        </div>
      </Container>
    </>
  );
};

export default TutorCard;
