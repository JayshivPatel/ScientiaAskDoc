import React from "react";
import styles from "./style.module.scss";

import classNames from "classnames";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

import graphIllustration from "assets/images/graph-illustration.svg";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faFile,
  faFolder,
  faDownload,
  faCheckSquare
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

const ModuleResources: React.FC = () => {
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

      <div className={styles.sectionHeaderContainer}>
        <span className={styles.sectionHeader}>Quick Access</span>
        <div className={styles.sectionHeaderButtonGroup}>
          <Button className={styles.sectionHeaderButton}>
            <FontAwesomeIcon className={styles.buttonIcon} icon={faDownload} />
          </Button>
          <Button className={styles.sectionHeaderButton}> 
            <FontAwesomeIcon className={styles.buttonIcon} icon={faSquare} />
          </Button>
        </div>
      </div>

      {/* TODO: add scroll listener once code is refactored */}
      <Row
        className={classNames(
          "d-flex",
          "flex-row",
          "flex-nowrap",
          styles.quickAccessRow
        )}
      >
        {[...Array(10)].map((e, i) => (
          <Col
            xs={7}
            sm={5}
            md={5}
            lg={4}
						xl={3}
						key={i}
						style={{marginBottom: ".5rem"}}
          >
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

      <div className={styles.sectionHeaderContainer}>
        <span className={styles.sectionHeader}>Folders</span>
        <div className={styles.sectionHeaderButtonGroup}>
          <Button className={styles.sectionHeaderButton}>
            <FontAwesomeIcon className={styles.buttonIcon} icon={faDownload} />
          </Button>
          <Button className={styles.sectionHeaderButton}> 
            <FontAwesomeIcon className={styles.buttonIcon} icon={faCheckSquare} />
          </Button>
        </div>
      </div>

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

export default ModuleResources;
