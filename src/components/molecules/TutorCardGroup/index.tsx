import React from "react";
import TutorCard from "components/atoms/TutorCard";

import tutorImage1 from "assets/images/tutor-1.png";
import tutorImage2 from "assets/images/tutor-2.png";
import tutorImage3 from "assets/images/tutor-3.png";

const TutorCardGroup: React.FC = () => {
  let tutorCards = tutors.map(({ name, email, address, image }) => {
    return (
      <TutorCard
        key={email}
        name={name}
        email={email}
        address={address}
        image={image}
      />
    );
  });

  return (
    <>
      <h4>Tutors</h4>
      {tutorCards}
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
