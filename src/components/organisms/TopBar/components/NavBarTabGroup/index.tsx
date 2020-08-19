import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavBarTabItem from "components/organisms/TopBar/components/NavBarTabItem";
import styles from "./style.module.scss"
import cx from "classnames";

export interface NavBarTabGroupProps {
  pages: {
    name: string;
    path: string;
  }[];
}

const NavBarTabGroup: React.FC<NavBarTabGroupProps> = ({
  pages,
}: NavBarTabGroupProps) => {
  return (
    <Navbar className={cx("m-auto", styles.pageButtonGroup)} id="responsive-navbar-nav">
      <Nav variant="pills">
        {pages.map((page) => (
          <NavBarTabItem page={page} key={page.name} />
        ))}
      </Nav>
    </Navbar>
  );
};

export default NavBarTabGroup;
