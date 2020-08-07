import React, { useEffect } from "react";
// import styles from "./style.module.scss";
// import classNames from "classnames";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const ModulePage: React.FC = () => {
  // only needed for using holder images, delete when done
  // @ts-ignore
  useEffect(() => {window.Holder.run()});

  return (
    <Container className="p-4">
      <Breadcrumb>
        <Breadcrumb.Item></Breadcrumb.Item>
        <Breadcrumb.Item active>Modules</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="header">Modules</h1>
      <hr />
      <h3>First Year Undergraduate</h3>
      <p>
        There are eight core modules, each with their own coursework and written
        examination: Introduction to Computer Systems, Introduction to Computer
        Architecture, Logic, Reasoning about Programs, Mathematics I, Discrete
        Structures, Graphs and Algorithms, Introduction to Databases.
      </p>

      <Card style={{ width: "200px", marginTop: "50px" }}>
        <Card.Img variant="top" src="holder.js/200x100" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>Some quick example text</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ModulePage;
