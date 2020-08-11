import React from "react";
import styles from "./style.module.scss";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

export interface FolderCardProps{
    title: string;
    id: number;
}


const FolderCard: React.FC<FolderCardProps> = ({title, id}: FolderCardProps) => {
  return (
    <Card className={styles.folderCard}>
      <Card.Body style={{ padding: ".6rem" }}>
        <Card.Text style={{ marginBottom: 0 }}>{title}</Card.Text>
        <FontAwesomeIcon style={{ fontSize: "1.125rem" }} icon={faFolder} />
      </Card.Body>
    </Card>
  );
};

export default FolderCard;
