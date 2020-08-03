import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "images/logo.svg";
import { Link } from "react-router-dom";

interface NavBarBrandProps {
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}

const NavBarBrand: React.FC<NavBarBrandProps> = ({
  onClick,
}: NavBarBrandProps) => {
  return (
    <Navbar.Brand className="brand-container">
      <img
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-center brand-image"
        alt="React Bootstrap logo"
        onClick={(e) => onClick(e)}
      />{" "}
      <Link to="/" style={{ textDecoration: "none" }}>
        Scientia
      </Link>
    </Navbar.Brand>
  );
};

export default NavBarBrand;
