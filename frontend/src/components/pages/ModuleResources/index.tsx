import React, { useEffect } from "react";
import styles from "./style.module.scss";

import classNames from "classnames";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ModuleResources: React.FC = () => {
  useEffect(() => {
    //@ts-ignore
    window.Holder.run();
  });

  return (
    <>
      <MyBreadcrumbs />
      <InputGroup  style={{ marginTop: "3rem" }}>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup.Prepend>

        <FormControl aria-label="Search" placeholder="search" />
      </InputGroup>

      <h5 className={classNames(styles.moduleSectionHeader)}>Quick Access</h5>

      <Row>
        {[...Array(4)].map((e, i) => (
          <Col md={3} key={i}>
            <Card style={{ marginTop: "1rem" }}>
              <Card.Img variant="top" src="holder.js/100px100" />
              <Card.Body>
                <Card.Title>Document {i}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h5 className={classNames(styles.moduleSectionHeader)}>Folders</h5>
      <Row>
        {[...Array(10)].map((e, i) => (
          <Col md={3} key={i}>
            <Card style={{ marginTop: ".6rem" }}>
              <Card.Body style={{ padding: ".6rem" }}>
                <Card.Text>Folder{i}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ModuleResources;
