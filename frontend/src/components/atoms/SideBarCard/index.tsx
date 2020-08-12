import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./style.module.scss";
import classNames from "classnames";

export interface SideBarCardProps {
  type: eventTypes;
  title: string;
  subtitle: string;
  content?: string;
}

export enum eventTypes {
  BlueCard,
  RedCard,
  GreenCard,
}

const SideBarCard: React.FC<SideBarCardProps> = ({
  type,
  title,
  subtitle,
  content,
}: SideBarCardProps) => {
  return (
    <Card className={classNames(styles.sideBarCard, getStyle(type))}>
      <Card.Body>
        <Card.Title>
          {title}
        </Card.Title>
        <Card.Subtitle>{subtitle}</Card.Subtitle>
        {content !== undefined ? <Card.Text>{content}</Card.Text> : null}
      </Card.Body>
    </Card>
  );
};

function getStyle(type: eventTypes): String {
  switch (type) {
    case eventTypes.BlueCard:
      return styles.sideBarBlueCard;
    case eventTypes.RedCard:
      return styles.sideBarRedCard;
    case eventTypes.GreenCard:
      return styles.sideBarGreenCard;
    default:
      return styles.sideBarBlueCard;
  }
}

export default SideBarCard;
