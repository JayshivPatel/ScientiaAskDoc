import React from "react"
import TutorCard from "components/cards/TutorCard"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/esm/Row"
import styles from "./style.module.scss"

export interface TutorCardGroupProps {
  title: string
  tutors: {
    name: string
    email: string
    address: string
    image: string
  }[]
}

const InsightCardGroup: React.FC<TutorCardGroupProps> = ({ title, tutors }) => {
  let cards = tutors.map(({ name, email, address, image }) => {
    return (
      <Col
        md={6}
        style={{ paddingRight: "0.625rem", paddingLeft: "0.625rem" }}
        key={email}>
        <TutorCard name={name} email={email} address={address} image={image} />
      </Col>
    )
  })

  return (
    <>
      <Row>{cards}</Row>
    </>
  )
}

export default InsightCardGroup
