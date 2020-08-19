import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import FolderCard from "components/atoms/FolderCard";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { SelectionProps } from "../SelectionView";

const FoldersRow: React.FC<{ select: SelectionProps }> = ({
  select,
}) => {
    return (
        <Row style={{ marginTop: "10px", marginRight: "-10px", marginLeft: "-10px" }}>
          {select.selectionItems.map(({ title, id }) => (
            <Col xs={6} sm={6} md={3} key={id} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <FolderCard
                title={title}
                icon={
                  select.isAnySelected() || select.state.isHoveringOver[id]
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
  }

export default FoldersRow;
