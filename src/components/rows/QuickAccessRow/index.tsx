import React from "react";
import styles from "./style.module.scss";

import classNames from "classnames";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import FileCard from "components/cards/FileCard";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { SelectionProps } from "components/sections/SelectionView";
import { resourceTypeToIcon } from "../../pages/modulePages/ModuleResources/utils";

const QuickAccessRow: React.FC<{ select: SelectionProps }> = ({ select }) => {
  return (
    <Row
      className={classNames(
        "d-flex",
        "flex-row",
        "flex-nowrap",
        styles.quickAccessRow
      )}
    >
      {select.selectionItems.map(({ title, type, tags, thumbnail, id }) => {
        if (type === undefined || tags === undefined) return null;

        return (
          <Col
            xs={7}
            sm={5}
            md={5}
            lg={4}
            xl={3}
            key={id}
            style={{
              marginBottom: ".5rem",
              marginTop: ".5rem",
              paddingLeft: "0.625rem",
              paddingRight: "0.625rem",
            }}
          >
            <FileCard
              title={title}
              type={type}
              tags={tags}
              icon={
                !select.disableSelection &&
                (select.isAnySelected() || select.state.isHoveringOver[id])
                  ? select.state.isSelected[id]
                    ? faCheckSquare
                    : faSquare
                  : resourceTypeToIcon(type)
              }
              onClick={() => select.handleCardClick(id)}
              onIconClick={(e) => {
                e.stopPropagation();
                select.handleIconClick(id);
              }}
              thumbnail={thumbnail}
              onMouseOver={() => select.handleMouseOver(id)}
              onMouseOut={() => select.handleMouseOut(id)}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default QuickAccessRow;
