import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../../images/logo.svg";
import userPic from "../../../images/user.png";
import "./style.scss";

const TopBar: React.FC = () => {
  return (
    <>
      <Navbar
        className="justify-content-center"
        sticky="top"
        expand="lg"
        variant="light"
        bg="light"
      >
        <Container>
          <Navbar.Brand href="#">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />{" "}
            Scientia
          </Navbar.Brand>

          <Nav variant="pills" activeKey="/">
            <Nav.Item>
              <Nav.Link href="/">Courses</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="link-1">Timetable</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="link-2">Exams</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="link-3">Other</Nav.Link>
            </Nav.Item>
          </Nav>

          <img
            src={userPic}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="userPic"
          />
        </Container>
      </Navbar>
    </>
  );
};

export default TopBar;
