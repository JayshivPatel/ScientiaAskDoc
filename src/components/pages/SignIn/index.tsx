import React from "react";
import styles from "./style.module.scss";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "assets/images/logo.svg";
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
            className={styles.brandLogo}
            alt="Scientia logo"
          />
        </Container>
      </Navbar>

      <div className={styles.centered}>
        <div
          style={{
            marginRight: "0.9375rem",
            marginLeft: "0.9375rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h1 className={styles.brandName}>Scientia</h1>
          <i className={styles.tagLine}>A Unified DoC EdTech Platform</i>
        </div>
        <div
          style={{
            marginRight: "0.9375rem",
            marginLeft: "0.9375rem",
            marginTop: "1.25rem"
          }}
        >
          <p className={styles.inputBarHeading}>Username</p>
          <InputGroup className="mb-3">
            <FormControl
              className={styles.inputBar}
              placeholder="Enter your username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <p className={styles.inputBarHeading}>Password</p>
          <InputGroup className="mb-3">
            <FormControl
              className={styles.inputBar}
              placeholder="Enter your password"
              type="password"
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
