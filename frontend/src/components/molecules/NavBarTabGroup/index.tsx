import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavBarTabItem from "components/atoms/NavBarTabItem";

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
    <Navbar className="page-button-group m-auto" id="responsive-navbar-nav">
      <Nav variant="pills">
        {pages.map((page) => (
          <NavBarTabItem page={page} />
        ))}
      </Nav>
    </Navbar>
  );
};

export default NavBarTabGroup;
