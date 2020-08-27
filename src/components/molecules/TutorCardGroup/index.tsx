import React from "react";
import TutorCard from "components/atoms/TutorCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";

export interface TutorCardGroupProps {
	title: string;
	tutors: {
		name: string;
		email: string;
		address: string;
		image: string;
	}[];
}

const TutorCardGroup: React.FC<TutorCardGroupProps> = ({title
	,tutors}) => {
  let tutorCards = tutors.map(({ name, email, address, image }) => {
    return (
      <Col md={6} style={{ paddingRight: "0.625rem", paddingLeft: "0.625rem" }}>
        <TutorCard
          key={email}
          name={name}
          email={email}
          address={address}
          image={image}
        />
      </Col>
    );
  });

  return (
    <>
      <h4>{title}</h4>
      <Row>{tutorCards}</Row>
    </>
  );
};

export default TutorCardGroup;