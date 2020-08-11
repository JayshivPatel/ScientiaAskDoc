import React from "react";
import styles from "./style.module.scss";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,  
} from "@fortawesome/free-solid-svg-icons";
import ResourceSectionHeader from "../ResourceSectionHeader";

const ResourceFolders: React.FC = () => {
  return (
    <>
      <ResourceSectionHeader/>

      <Row style={{ marginTop: "10px" }}>
        {[...Array(10)].map((e, i) => (
          <Col xs={6} sm={6} md={3} key={i}>
            <Card className={styles.folderCard}>
              <Card.Body style={{ padding: ".6rem" }}>
                <Card.Text style={{ marginBottom: 0 }}>Folder {i}</Card.Text>
                <FontAwesomeIcon
                  style={{ fontSize: "1.125rem" }}
                  icon={faFolder}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ResourceFolders;
