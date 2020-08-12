import React from "react";
import styles from "./style.module.scss";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface FolderCardProps{
    title: string;
		icon: IconDefinition;
		onIconClick: (event: React.MouseEvent) => void;
		onClick: (event: React.MouseEvent) => void;
}

const FolderCard: React.FC<FolderCardProps> = ({title, icon, onIconClick, onClick}: FolderCardProps) => {
  return (
    <Card className={styles.folderCard} onClick={onClick}>
      <Card.Body style={{ padding: ".6rem" }}>
        <Card.Text style={{ marginBottom: 0 }}>{title}</Card.Text>
        <FontAwesomeIcon style={{ fontSize: "1.125rem" }} icon={icon} onClick={onIconClick}/>
      </Card.Body>
    </Card>
  );
};

export default FolderCard;
