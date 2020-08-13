import React, { useEffect } from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import styles from "./style.module.scss";
import TutorCard from "components/atoms/TutorCard";
import Col from "react-bootstrap/Col";

export interface TutorCardGroupProp {
  tutors: {
    name: string;
    email: string;
    address: string;
    image: string;
  }[];
}

const TutorCardGroup: React.FC<TutorCardGroupProp> = ({
  tutors,
}: TutorCardGroupProp) => {
  let tutorCards = tutors.map(
    ({name, email, address, image}) => {
      return <TutorCard name={name} email={email} address={address} image={image} />
    })

  return (
    <>
      <Col>
      <h4>Tutors</h4>
        {tutorCards}
      </Col>
    </>
  );
};

export default TutorCardGroup;
