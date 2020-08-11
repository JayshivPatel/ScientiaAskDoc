import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ResourceSectionHeader from "../ResourceSectionHeader";
import FolderCard from "components/atoms/FolderCard";

export interface ResourceFoldersProps{
	folderItems: {
    title: string;
    id: number;
	}[];
}

const ResourceFolders: React.FC<ResourceFoldersProps> = ({folderItems}: ResourceFoldersProps) => {
  return (
    <>
      <ResourceSectionHeader heading="Folders" />

      <Row style={{ marginTop: "10px" }}>
        {folderItems.map(({title, id}) => (
          <Col xs={6} sm={6} md={3} key={id}>
            <FolderCard title={title} id={id}/>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ResourceFolders;
