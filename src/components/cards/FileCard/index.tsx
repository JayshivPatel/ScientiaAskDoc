import React from "react";
import styles from "./style.module.scss";

import classNames from "classnames";

import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface FileCardProps {
  title: string;
  type: string;
  tags: string[];
	icon: IconDefinition;
	thumbnail?: string;
  onIconClick: (event: React.MouseEvent) => void;
  onClick: (event: React.MouseEvent) => void;
  onMouseOver: (event: React.MouseEvent) => void;
  onMouseOut: (event: React.MouseEvent) => void;
}

const FileCard: React.FC<FileCardProps> = ({
  title,
  type,
  tags,
	icon,
	thumbnail,
  onIconClick,
  onClick,
  onMouseOver,
  onMouseOut
}: FileCardProps) => {
  let banner: string = `/images/light/banner/${type}.png`;

  return (
    <Card
      className={styles.fileCard}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <Card.Img variant="top"  src={thumbnail || banner} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <FontAwesomeIcon
          style={{
            marginLeft: "0.5rem",
            fontSize: "1.125rem",
            cursor: "default"
          }}
          icon={icon}
          onClick={onIconClick}
        />
      </Card.Body>
      <Card.Footer>
        {tags.map(tag => (
          <Badge
            pill
            key={tag}
            className={classNames(
              styles.fileTag,
              tag === "new" ? styles.tagTeal : styles.tagBlue
            )}
          >
            {tag}
          </Badge>
        ))}
      </Card.Footer>
    </Card>
  );
};

export default FileCard;