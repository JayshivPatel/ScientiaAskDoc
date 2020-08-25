import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Badge from "react-bootstrap/Badge";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectionProps } from "components/molecules/SelectionView";
import { resourceTypeToIcon } from "../../pages/ModuleResources";

const CategoryList: React.FC<{ select: SelectionProps }> = ({ select }) => {
  return (
    <>
      {select.selectionItems.map(({ title, type, tags, id }) => {
        if (type === undefined || tags === undefined) return null;

        let icon =
          select.isAnySelected() || select.state.isHoveringOver[id]
            ? select.state.isSelected[id]
              ? faCheckSquare
              : faSquare
            : resourceTypeToIcon(type);

        return (
          <Row
            className={styles.listRow}
            onClick={() => select.handleCardClick(id)}
            onMouseOver={() => select.handleMouseOver(id)}
            onMouseOut={() => select.handleMouseOut(id)}
            key={id}
          >
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                padding: 0,
                fontSize: "1rem"
              }}
            >
              {title}
            </Col>
            <Col md="auto" style={{ display: "flex", alignItems: "center" }}>
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
            </Col>
            <FontAwesomeIcon
              style={{ fontSize: "1.125rem" }}
              icon={icon}
              onClick={e => {
                e.stopPropagation();
                select.handleIconClick(id);
              }}
              fixedWidth
            />
          </Row>
        );
      })}
    </>
  );
};

export default CategoryList;
