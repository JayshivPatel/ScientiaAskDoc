import React, { useEffect } from "react";
import styles from "./style.module.scss";

import classNames from "classnames";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

import graphIllustration from "assets/images/graph-illustration.svg";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Carousel from "react-bootstrap/Carousel";

import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faFile,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";

const ModuleResources: React.FC = () => {
  useEffect(() => {
    //@ts-ignore
    window.Holder.run();
  });

  return (
    <>
      <MyBreadcrumbs />
      <InputGroup>
        <FormControl
          className={styles.searchBar}
          aria-label="Search"
          placeholder="Search..."
        />
        <InputGroup.Append>
          <Button className={styles.searchBarIcon}>
            <FontAwesomeIcon size="1x" icon={faInfoCircle} />
          </Button>
        </InputGroup.Append>
      </InputGroup>

      <h5 className={classNames(styles.moduleSectionHeader)}>Quick Access</h5>

      <Row>
        {[...Array(4)].map((e, i) => (
          <Col xs={12} sm={6} md={6} lg={4} xl={3} key={i}>
            <Card className={styles.quickViewCard}>
              <Card.Img variant="top" src={graphIllustration} />
              <Card.Body>
                <Card.Title>Document {i}</Card.Title>
                <FontAwesomeIcon
                  style={{ fontSize: "1.125rem" }}
                  icon={faFile}
                />
              </Card.Body>
              <Card.Footer>
                <Badge
                  pill
                  className={classNames(styles.quickViewTag, styles.tagTeal)}
                >
                  New
                </Badge>
                <Badge
                  pill
                  className={classNames(styles.quickViewTag, styles.tagBlue)}
                >
                  Week 1
                </Badge>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <h5
        style={{ marginTop: "30px", marginBottom: "10px" }}
        className={classNames(styles.moduleSectionHeader)}
      >
        Folders
      </h5>
      <Row>
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

export default ModuleResources;
