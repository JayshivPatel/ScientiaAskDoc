import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Badge from "react-bootstrap/Badge";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListGroup from "react-bootstrap/ListGroup";

export interface FileListItemProps {
  title: string;
  icon: IconDefinition;
  tags: string[];
  onIconClick?: (event: React.MouseEvent) => void;
  onClick?: (event: React.MouseEvent) => void;
  onMouseOver?: (event: React.MouseEvent) => void;
  onMouseOut?: (event: React.MouseEvent) => void;
}

const FileListItem: React.FC<FileListItemProps> = ({
  title,
  icon,
  tags,
  onIconClick,
  onClick,
  onMouseOver,
  onMouseOut,
}) => {
  return (
    <ListGroup.Item
      className={styles.listRow}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <Row style={{marginLeft: 0, marginRight: "-.75rem"}}>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            padding: 0,
            fontSize: "1rem",
          }}
        >
          {title}
        </Col>
        <Col md="auto" style={{ display: "flex", alignItems: "center" }}>
          {tags.map((tag) => (
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
        </Col>
        <FontAwesomeIcon
          style={{ fontSize: "1.125rem" }}
          icon={icon}
          onClick={(e) => {
            e.stopPropagation();
            if (onIconClick !== undefined) onIconClick(e);
          }}
          fixedWidth
        />
      </Row>
    </ListGroup.Item>
  );
};

export default FileListItem;
