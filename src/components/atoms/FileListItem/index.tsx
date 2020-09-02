import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

import Row from "react-bootstrap/esm/Row";
import Badge from "react-bootstrap/Badge";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  onMouseOut
}) => {
  return (
    <div
      className={styles.listItem}
      onClick={onClick}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
    >
      <Row className={styles.listRow}>
        <div className={styles.listItemTitle}>{title}</div>
        <div style={{ padding: 0, display: "flex", alignItems: "center" }}>
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
          <FontAwesomeIcon
            style={{ fontSize: "1.125rem" }}
            icon={icon}
            onClick={e => {
              e.stopPropagation();
              if (onIconClick !== undefined) onIconClick(e);
            }}
            fixedWidth
          />
        </div>
      </Row>
    </div>
  );
};

export default FileListItem;
