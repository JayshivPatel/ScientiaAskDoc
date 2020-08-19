import React from "react";
import styles from "./style.module.scss";

import classNames from "classnames";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import FileCard from "components/atoms/FileCard";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faFileAlt,
  IconDefinition,
  faFilePdf,
  faFileVideo,
} from "@fortawesome/free-solid-svg-icons";
import { SelectionProps } from "components/molecules/SelectionView";

const QuickAccessRow: React.FC<{ select: SelectionProps }> = ({
  select,
}) => {
  return (
    <Row
      className={classNames(
        "d-flex",
        "flex-row",
        "flex-nowrap",
        styles.quickAccessRow
      )}
    >
      {select.selectionItems.map(({ title, type, tags, id }) => {
        let normalIcon: IconDefinition;
        if (type === undefined || tags === undefined) return;
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
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <FileCard
              title={title}
              type={type}
              tags={tags}
              icon={
                select.isAnySelected() || select.state.isHoveringOver[id]
                  ? select.state.isSelected[id]
                    ? faCheckSquare
                    : faSquare
                  : normalIcon
              }
              onClick={() => select.handleCardClick(id)}
              onIconClick={(e) => {
                e.stopPropagation();
                select.handleIconClick(id);
              }}
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
