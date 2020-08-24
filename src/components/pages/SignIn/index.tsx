import React from "react";
import styles from "./style.module.scss";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "assets/images/logo.svg";
import cx from "classnames";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const SignIn: React.FC = () => {
  return (
    <>
      <Navbar
        className={styles.navBar}
        sticky="top"
        expand="lg"
        variant="light"
      >
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={logo}
            width="30"
            height="30"
            className={cx("d-inline-block", "align-center")}
            alt="Scientia logo"
          />
        </Container>
      </Navbar>

      <div className={styles.centered}>
        <div style={{ marginRight: "15px", marginLeft: "15px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1>Scientia</h1>
          <i style={{ color: "gray"}}>
            A Unified DoC EdTech Platform
          </i>
        </div>
        <div style={{ marginRight: "15px", marginLeft: "15px", marginTop: "20px" }}>
          <p className={styles.inputBarHeading}>Username</p>
          <InputGroup className="mb-3">
            <FormControl
              className={styles.inputBar}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <p className={styles.inputBarHeading}>Password</p>
          <InputGroup className="mb-3">
            <FormControl
              className={styles.inputBar}
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <Button variant="secondary" className={styles.inputButton}>
            Sign In
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
