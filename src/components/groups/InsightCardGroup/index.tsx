import React, { useContext } from "react"
import TutorCard from "components/cards/TutorCard"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/esm/Row"
import styles from "./style.module.scss"
import { Insight, TimelineEvent } from "constants/types"
import DueCard from "components/cards/InsightCard/DueCard"
import ModalController from "contexts/ModalController"
import ReleaseCard from "components/cards/InsightCard/ReleaseCard"

export interface Props {
  insights: Insight[]
}

const InsightCardGroup: React.FC<Props> = ({ 
  insights,
}) => {

  const cards = insights.map(insight => {
    switch(insight.kind) {
      case 'due':
        return <DueCard event={insight.event}/>
      case 'release':
        return <ReleaseCard event={insight.event}/>
    }
  })

  return (
    <>
      <Row>{cards.map((card, index) => (
        <Col
          md={'4'}
          style={{ paddingRight: "0.625rem", paddingLeft: "0.625rem" }}
          key={`insight-${index}`}>
            {card}
        </Col>
      ))}</Row>
    </>
  )
}

export default InsightCardGroup
