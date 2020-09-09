import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import FolderCard from "components/atoms/FolderCard";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { SelectionProps } from "../SelectionView";

const FoldersRow: React.FC<{ select: SelectionProps }> = ({ select }) => {
  return (
    <Row
      style={{
        marginTop: "0.625rem",
        marginRight: "-0.625rem",
        marginLeft: "-0.625rem",
      }}
    >
      {select.selectionItems.map(({ title, id }) => (
        <Col
          xs={6}
          sm={6}
          md={3}
          key={id}
          style={{ paddingLeft: "0.625rem", paddingRight: "0.625rem" }}
        >
          <FolderCard
            title={title}
            icon={
              !select.disableSelection &&
              (select.isAnySelected() || select.state.isHoveringOver[id])
                ? select.state.isSelected[id]
                  ? faCheckSquare
                  : faSquare
                : faFolder
            }
            onIconClick={(e) => {
              e.stopPropagation();
              select.handleIconClick(id);
            }}
            onClick={() => select.handleCardClick(id)}
            onMouseOver={() => select.handleMouseOver(id)}
            onMouseOut={() => select.handleMouseOut(id)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default FoldersRow;
