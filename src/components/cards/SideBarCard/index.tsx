import React from "react"
import Card from "react-bootstrap/Card"
import styles from "./style.module.scss"
import classNames from "classnames"

export interface SideBarCardProps {
  type: eventTypes
  title?: string
  subtitle?: string
  content?: string
  id?: number
  onClick?: (event: React.MouseEvent) => void
}

export enum eventTypes {
  BlueCard,
  RedCard,
  GreenCard,
  IndigoCard,
  CyanCard,
}

const SideBarCard: React.FC<SideBarCardProps> = ({
  type,
  title,
  subtitle,
  content,
  onClick,
}: SideBarCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={classNames(
        styles.sideBarCard,
        getStyle(type),
        subtitle === undefined || content === undefined
          ? styles.sideBarEmptyCard
          : ""
      )}>
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {subtitle && <Card.Subtitle>{subtitle}</Card.Subtitle>}
        {content && <Card.Text>{content}</Card.Text>}
      </Card.Body>
    </Card>
  )
}

function getStyle(type: eventTypes): String {
  switch (type) {
    case eventTypes.BlueCard:
      return styles.sideBarBlueCard
    case eventTypes.RedCard:
      return styles.sideBarRedCard
    case eventTypes.GreenCard:
      return styles.sideBarGreenCard
    case eventTypes.IndigoCard:
      return styles.sideBarIndigoCard
    case eventTypes.CyanCard:
      return styles.sideBarCyanCard
    default:
      return styles.sideBarBlueCard
  }
}

export default SideBarCard
