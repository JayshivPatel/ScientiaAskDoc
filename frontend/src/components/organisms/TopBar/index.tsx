import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import userPic from "images/user.png";
import NavBarTabGroup from "components/molecules/NavBarTabGroup";
import NavBarBrand from "components/molecules/NavBarBrand";
import styles from "./style.module.scss";

export interface TopBarProps {
  pages: {
    name: string;
    path: string;
  }[];
  onIconClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}

const TopBar: React.FC<TopBarProps> = ({ pages, onIconClick }: TopBarProps) => {
  return (
    <Navbar className={styles.navBar} sticky="top" expand="lg" variant="light">
      <Container fluid>
        <NavBarBrand onClick={onIconClick} />

        <NavBarTabGroup pages={pages} />

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
