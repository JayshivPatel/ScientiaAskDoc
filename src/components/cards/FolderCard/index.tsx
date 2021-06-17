import React from "react"
import styles from "./style.module.scss"
import Card from "react-bootstrap/Card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"

export interface FolderCardProps {
  title: string
  icon: IconDefinition
  onIconClick: (event: React.MouseEvent) => void
  onClick: (event: React.MouseEvent) => void
  onMouseOver: (event: React.MouseEvent) => void
  onMouseOut: (event: React.MouseEvent) => void
}

const FolderCard: React.FC<FolderCardProps> = ({
  title,
  icon,
  onIconClick,
  onClick,
  onMouseOver,
  onMouseOut,
}: FolderCardProps) => {
  return (
    <Card
      className={styles.folderCard}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}>
      <Card.Body style={{ padding: ".6rem" }}>
        <Card.Text style={{ marginBottom: 0, textTransform: "capitalize" }}>
          {title}
        </Card.Text>
        <FontAwesomeIcon
          style={{ fontSize: "1.125rem", cursor: "default" }}
          icon={icon}
          onClick={(event) => {
            event.stopPropagation()
            onIconClick(event)
          }}
        />
      </Card.Body>
    </Card>
  )
}

export default FolderCard
