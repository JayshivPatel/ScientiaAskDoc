import React from "react";
import TutorCard from "components/atoms/TutorCard";
import Col from "react-bootstrap/Col";
import tutorImage1 from "assets/images/tutor-1.png";
import tutorImage2 from "assets/images/tutor-2.png";
import tutorImage3 from "assets/images/tutor-3.png";
import Row from "react-bootstrap/esm/Row";

const TutorCardGroup: React.FC = () => {
  let tutorCards = tutors.map(({ name, email, address, image }) => {
    return (
			<Col md={6}>
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
      <h4>Tutors</h4>
			<Row>
      {tutorCards}
			</Row>
    </>
  );
};

export default TutorCardGroup;

const tutors: {
  name: string;
  email: string;
  address: string;
  image: string;
}[] = [
  {
    name: "Dr. Zahid Barr",
    email: "zahid.barr@imperial.ac.uk",
    address: "373, Huxley Building",
    image: tutorImage1
  },
  {
    name: "Dr. Rosalind Baker",
    email: "rosalind.baker@imperial.ac.uk",
    address: "590, Huxley Building",
    image: tutorImage2
  },
  {
    name: "Mr. Subhaan Wicks",
    email: "subhaan.wicks16@imperial.ac.uk",
    address: "Huxley Building",
    image: tutorImage3
  }
];
