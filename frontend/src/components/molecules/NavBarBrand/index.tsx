import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "assets/images/logo.svg";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import cx from "classnames";

interface NavBarBrandProps {
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}

const NavBarBrand: React.FC<NavBarBrandProps> = ({
  onClick,
}: NavBarBrandProps) => {
  return (
    <Navbar.Brand className={styles.brandContainer}>
      <img
        src={logo}
        width="30"
        height="30"
        className={cx(
          "d-inline-block",
          "align-center",
          styles.brandImage
        )}
        alt="React Bootstrap logo"
        onClick={(e) => onClick(e)}
      />
      <Link to="/">Scientia</Link>
    </Navbar.Brand>
  );
};

export default NavBarBrand;
