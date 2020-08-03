import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

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
    <Nav.Item key={page.name}>
      <Nav.Link
        as={NavLink}
        activeClassName="active"
        to={page.path}
        className="page-button"
      >
        {page.name}
      </Nav.Link>
    </Nav.Item>
  );
};

export default NavBarTabItem;
