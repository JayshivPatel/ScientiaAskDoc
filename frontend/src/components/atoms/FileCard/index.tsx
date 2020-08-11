import React from "react";
import styles from "./style.module.scss";

import classNames from "classnames";

import graphIllustration from "assets/images/graph-illustration.svg";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

export interface FileCardProps {
  title: string;
  type: string;
  tags: string[];
  id: number;
}

const FileCard: React.FC<FileCardProps> = ({
  title,
  type,
  tags,
  id,
}: FileCardProps) => {
  return (
    <Card className={styles.quickViewCard}>
      <Card.Img variant="top" src={graphIllustration} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <FontAwesomeIcon style={{ fontSize: "1.125rem" }} icon={faFile} />
      </Card.Body>
      <Card.Footer>
				{
					tags.map(tag => 
						<Badge pill key={tag} className={classNames(styles.quickViewTag, tag==="new" ? styles.tagTeal : styles.tagBlue)}>
						{tag}
					</Badge>
					)
				}
      </Card.Footer>
    </Card>
  );
};

export default FileCard;
