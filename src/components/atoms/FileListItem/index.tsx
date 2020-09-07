import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

import Row from "react-bootstrap/esm/Row";
import Badge from "react-bootstrap/Badge";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DragHandle } from "components/molecules/CategoryList";

export interface FileListItemProps {
  title: string;
  icon: IconDefinition;
  tags: string[];
  resourceActions?: any
  showMenu?: boolean,
  setShowMenu?: (show: boolean) => void,
  onIconClick?: (event: React.MouseEvent) => void;
  onClick?: (event: React.MouseEvent) => void;
  onMouseOver?: (event: React.MouseEvent) => void;
  onMouseOut?: (event: React.MouseEvent) => void;
}

const FileListItem: React.FC<FileListItemProps> = ({
  title,
  icon,
  tags,
  resourceActions,
  showMenu,
  setShowMenu,
  onIconClick,
  onClick,
  onMouseOver,
  onMouseOut
}) => {
  const [xPos, setXPos] = useState("0px");
  const [yPos, setYPos] = useState("0px");

  const handleClick = () => {
    setShowMenu && showMenu && setShowMenu(false);
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setXPos(`${e.pageX - 5}px`);
    setYPos(`${e.pageY - 5}px`);
    setShowMenu && setShowMenu(true);
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
  });

  return (
    <>
      {showMenu && resourceActions &&
        <div
          className={styles.resourceMenu}
          style={{
            top: yPos,
            left: xPos,
          }}
        >
          { resourceActions }
        </div>
      }
      <div
        className={styles.listItem}
        onClick={onClick}
        onMouseOut={onMouseOut}
        onMouseOver={onMouseOver}
        onContextMenu={handleContextMenu}
      >
        <Row className={styles.listRow}>
          <div className={styles.listItemTitle}>
            { resourceActions ?
              <div style={{ padding: 0, display: "flex", alignItems: "center" }}>
                <DragHandle />
                { title }
              </div> :
              title
            }
          </div>
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
    </>
  );
};

export default FileListItem;
