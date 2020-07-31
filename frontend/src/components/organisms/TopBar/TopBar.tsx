import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "images/logo.svg";
import userPic from "images/user.png";
import "./style.scss";
import { Link, NavLink } from "react-router-dom";

const TopBar: React.FC = () => {
  return (
    <Navbar className="top-bar" sticky="top" expand="lg" variant="light">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="brand-container">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-center brand-image"
            alt="React Bootstrap logo"
          />{" "}
          Scientia
        </Navbar.Brand>

        <Navbar className="page-button-group m-auto" id="responsive-navbar-nav">
          <Nav variant="pills" defaultActiveKey="/timetable">
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                activeClassName="active"
                to="/courses"
                className="page-button"
              >
                Courses
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                activeClassName="active"
                to="/timetable"
                className="page-button"
              >
                Timetable
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                activeClassName="active"
                to="/exams"
                className="page-button"
              >
                Exams
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                activeClassName="active"
                to="/other"
                className="page-button"
              >
                Other
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>

        <img
          src={userPic}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="userPic"
        />
      </Container>
    </Navbar>
  );
};

export default TopBar;
