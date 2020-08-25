import React from "react";
import styles from "./style.module.scss";

import classNames from "classnames";

import applicationPDF from "assets/images/pdf-banner.png";
import applicationDocument from "assets/images/document-banner.png";
import applicationVideo from "assets/images/video-banner.png";

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
  let banner: string;
  switch (type) {
    case "pdf":
      banner = applicationPDF;
      break;
    case "video":
			banner = applicationVideo;
      break;
    default:
      banner = applicationDocument;
      break;
  }
  return (
    <Card
      className={styles.fileCard}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <Card.Img variant="top"  src={thumbnail || banner} />
      <Card.Body>
        <Card.Title style={{ wordWrap: "break-word" }}>{title}</Card.Title>
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
