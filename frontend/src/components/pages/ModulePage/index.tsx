import React, { useEffect } from "react";
import styles from "./style.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import classNames from "classnames";
import logicIllustration from "assets/images/logic-illustration.svg";
import discreteIllustration from "assets/images/discrete-illustration.svg";
import systemsIllustration from "assets/images/systems-illustration.svg";
import methodsIllustration from "assets/images/methods-illustration.svg";

const ModulePage: React.FC = () => {
  return (
    <Container className={classNames("p-4", styles.moduleContainer)}>
      <Breadcrumb className={classNames(styles.breadcrumb)}>
        <Breadcrumb.Item active>Modules</Breadcrumb.Item>
        <Breadcrumb.Item></Breadcrumb.Item>
      </Breadcrumb>

      <h3 className={classNames(styles.moduleHeader)}>Modules</h3>
      <hr />
      <h4 className={classNames(styles.moduleSectionHeader)}>
        First Year Undergraduate
      </h4>
      <p className={classNames(styles.moduleParagraph)}>
        There are eight core modules, each with their own coursework and written
        examination: Introduction to Computer Systems, Introduction to Computer
        Architecture, Logic, Reasoning about Programs, Mathematics I, Discrete
        Structures, Graphs and Algorithms, Introduction to Databases.
      </p>

      <CardDeck className={classNames(styles.moduleCardDeck)}>
        <Card className={classNames(styles.moduleCard)}>
          <Card.Header className={classNames(styles.moduleCardHeader)}>
            CO140
          </Card.Header>
          <Card.Img
            style={{ borderRadius: 0 }}
            variant="top"
            src={logicIllustration}
          />
          <Card.Body>
            <Card.Title>Introduction to Logic</Card.Title>
          </Card.Body>
          <Card.Footer>
            <small className={classNames(styles.moduleCardProgressText)}>
              in progress
            </small>
          </Card.Footer>
        </Card>
        <Card className={classNames(styles.moduleCard)}>
          <Card.Header className={classNames(styles.moduleCardHeader)}>
            CO142
          </Card.Header>
          <Card.Img
            style={{ borderRadius: 0 }}
            variant="top"
            src={discreteIllustration}
          />
          <Card.Body>
            <Card.Title>Discrete Mathematics</Card.Title>
          </Card.Body>
          <Card.Footer>
            <small className={classNames(styles.moduleCardProgressText)}>
              in progress
            </small>
          </Card.Footer>
        </Card>
        <Card className={classNames(styles.moduleCard)}>
          <Card.Header className={classNames(styles.moduleCardHeader)}>
            CO112
          </Card.Header>
          <Card.Img
            style={{ borderRadius: 0 }}
            variant="top"
            src={systemsIllustration}
          />
          <Card.Body>
            <Card.Title>Introduction to Computer Systems</Card.Title>
          </Card.Body>
          <Card.Footer>
            <small className={classNames(styles.moduleCardProgressText)}>
              in progress
            </small>
          </Card.Footer>
        </Card>
        <Card className={classNames(styles.moduleCard)}>
          <Card.Header className={classNames(styles.moduleCardHeader)}>
            CO145
          </Card.Header>
          <Card.Img
            style={{ borderRadius: 0 }}
            variant="top"
            src={methodsIllustration}
          />
          <Card.Body>
            <Card.Title>Mathematical Methods</Card.Title>
          </Card.Body>
          <Card.Footer>
            <small className={classNames(styles.moduleCardProgressText)}>
              in progress
            </small>
          </Card.Footer>
        </Card>
      </CardDeck>
    </Container>
  );
};

export default ModulePage;
