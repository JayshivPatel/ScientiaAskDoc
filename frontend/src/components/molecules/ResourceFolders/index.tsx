import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ResourceSectionHeader from "../ResourceSectionHeader";
import FolderCard from "components/atoms/FolderCard";

const ResourceFolders: React.FC = () => {
  return (
    <>
      <ResourceSectionHeader heading="Folders" />

      <Row style={{ marginTop: "10px" }}>
        {[...Array(10)].map((e, i) => (
          <Col xs={6} sm={6} md={3} key={i}>
            <FolderCard/>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ResourceFolders;
