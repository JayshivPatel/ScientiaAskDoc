import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "images/logo.svg";
import { Link } from "react-router-dom";

const NavBarBrand: React.FC = () => {

  return (
        <Navbar.Brand className="brand-container">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-center brand-image"
            alt="React Bootstrap logo"
            onClick={(e) => {
							// TODO: change to using react states
              e.preventDefault();
              const wrapper = document.querySelector("#wrapper") || document.createElement("div");
              if (wrapper.classList.contains("toggled")) {
                wrapper.classList.remove("toggled");
              } else {
                wrapper.classList.add("toggled");
              }
            }}
          />{" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            Scientia
          </Link>
        </Navbar.Brand>
  );
};

export default NavBarBrand;
