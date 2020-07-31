import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "images/logo.svg";
import userPic from "images/user.png";
import "./style.scss";

const TopBar: React.FC = () => {
    return (
        <Navbar className="top-bar" sticky="top" expand="lg" variant="light">
            <Container fluid>
                <Navbar.Brand href="#" className="brand-container">
                    <img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-center brand-image"
                        alt="React Bootstrap logo"
                    />{" "}
                    Scientia
                </Navbar.Brand>

                <Navbar
                    className="page-button-group m-auto"
                    id="responsive-navbar-nav"
                >
                    <Nav.Link active href="/" className="page-button">
                        Courses
                    </Nav.Link>

                    <Nav.Link eventKey="link-1" className="page-button">
                        Timetable
                    </Nav.Link>

                    <Nav.Link eventKey="link-2" className="page-button">
                        Exams
                    </Nav.Link>

                    <Nav.Link eventKey="link-3" className="page-button">
                        Other
                    </Nav.Link>
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
