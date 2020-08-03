import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import styles from "./style.module.scss"

export interface NavBarItemProps {
  page: {
    name: string;
    path: string;
  };
}

const NavBarTabItem: React.FC<NavBarItemProps> = ({
  page,
}: NavBarItemProps) => {
  return (
    <Nav.Item>
      <Nav.Link
        as={NavLink}
        activeClassName={styles.active}
        to={page.path}
        className={styles.pageButton}
      >
        {page.name}
      </Nav.Link>
    </Nav.Item>
  );
};

export default NavBarTabItem;
