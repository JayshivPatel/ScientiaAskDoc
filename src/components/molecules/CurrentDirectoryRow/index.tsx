import React from "react";

import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import FileCard from "components/atoms/FileCard";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { SelectionProps } from "components/molecules/SelectionView";
import { resourceTypeToIcon } from "../../pages/ModuleResources/utils";

const CurrentDirectoryRow: React.FC<{ select: SelectionProps }> = ({
  select,
}) => {
  return (
    <Row
      style={{
        marginTop: "0.625rem",
        marginLeft: "-0.625rem",
        marginRight: "-0.625rem",
      }}
    >
      {select.selectionItems.map(({ title, type, thumbnail, tags, id }) => {
        if (type === undefined || tags === undefined) return null;

        return (
          <Col
            xs={6}
            sm={6}
            md={4}
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
              thumbnail={thumbnail}
              icon={
                select.isAnySelected() || select.state.isHoveringOver[id]
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
              onMouseOver={() => select.handleMouseOver(id)}
              onMouseOut={() => select.handleMouseOut(id)}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default CurrentDirectoryRow;
