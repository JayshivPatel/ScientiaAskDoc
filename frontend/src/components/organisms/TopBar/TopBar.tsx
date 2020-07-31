import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "images/logo.svg";
import userPic from "images/user.png";
import "./style.scss";
import { Link, NavLink } from "react-router-dom";

export interface TopBarProps {
  pages: {
    name: string;
    path: string;
  }[];
}

const TopBar: React.FC<TopBarProps> = ({ pages }: TopBarProps) => {
  const NavItems = pages.map(({ name, path }) => (
    <Nav.Item key={name}>
      <Nav.Link
        as={NavLink}
        activeClassName="active"
        to={path}
        className="page-button"
      >
        {name}
      </Nav.Link>
    </Nav.Item>
  ));

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
          <Nav variant="pills">{NavItems}</Nav>
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
