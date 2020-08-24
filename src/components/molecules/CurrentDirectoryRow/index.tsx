import React from "react";

import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import FileCard from "components/atoms/FileCard";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { SelectionProps } from "components/molecules/SelectionView";
import { resourceTypeToIcon } from "../../pages/ModuleResources"

const CurrentDirectoryRow: React.FC<{ select: SelectionProps }> = ({
  select,
}) => {
  return (
    <Row
      style={{ marginTop: "10px", marginLeft: "-10px", marginRight: "-10px" }}
    >
      {select.selectionItems.map(({ title, type, tags, id }) => {
        if (type === undefined || tags === undefined) return null;

        return (
          <Col
            xs={6}
            sm={6}
            md={6}
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
