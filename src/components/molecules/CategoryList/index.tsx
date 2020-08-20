import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Badge from "react-bootstrap/Badge";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faFileAlt,
  IconDefinition,
  faFilePdf,
  faFileVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectionProps } from "components/molecules/SelectionView";

const CategoryList: React.FC<{ select: SelectionProps }> = ({
  select,
}) => {
  return (
      <>
      {select.selectionItems.map(({ title, type, tags, id }) => {
        let normalIcon: IconDefinition;
        if (type === undefined || tags === undefined) return null;
        switch (type) {
          case "pdf":
            normalIcon = faFilePdf;
            break;
          case "video":
            normalIcon = faFileVideo;
            break;
          default:
            normalIcon = faFileAlt;
            break;
        }

        let icon = select.isAnySelected() || select.state.isHoveringOver[id]
          ? select.state.isSelected[id]
            ? faCheckSquare
            : faSquare
          : normalIcon;

        return (
          <Row
          style={{ marginTop: "10px", marginLeft: "-10px", marginRight: "-10px", cursor: "pointer" }}
          onClick={() => select.handleCardClick(id)}
          onMouseOver={() => select.handleMouseOver(id)}
          onMouseOut={() => select.handleMouseOut(id)}
          >
            <Col>{title}</Col>
            <Col md="auto">
              {tags.map((tag) => (
                <Badge
                  pill
                  key={tag}
                  className={classNames(
                    styles.fileTag,
                    tag === "new" ? styles.tagTeal : styles.tagBlue
                  )}>
                  {tag}
                </Badge>
              ))}
            </Col>
            <Col md="auto">
              <FontAwesomeIcon
                style={{ marginLeft: "8px", fontSize: "1.125rem", cursor: "default"}}
                icon={icon}
                onClick={(e) => {
                  e.stopPropagation();
                  select.handleIconClick(id);
                }}
              />
            </Col>
          </Row>
        );
      })}
      </>
  );
};

export default CategoryList;
