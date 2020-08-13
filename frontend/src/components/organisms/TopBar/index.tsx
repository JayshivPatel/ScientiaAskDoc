import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import userPic from "assets/images/user.png";
import NavBarTabGroup from "components/molecules/NavBarTabGroup";
import NavBarBrand from "components/molecules/NavBarBrand";
import styles from "./style.module.scss";

export interface TopBarProps {
  pages: {
    name: string;
    path: string;
  }[];
  onFavIconClick: (event: React.MouseEvent<HTMLElement>) => void;
  onUserIconClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const TopBar: React.FC<TopBarProps> = ({
  pages,
  onFavIconClick,
  onUserIconClick
}: TopBarProps) => {
  return (
    <Navbar className={styles.navBar} sticky="top" expand="lg" variant="light">
      <Container fluid>
        <NavBarBrand onClick={onFavIconClick} />

        <NavBarTabGroup pages={pages} />

        <img
          src={userPic}
          className="d-inline-block align-top"
          alt="userPic"
          onClick={onUserIconClick}
          style={{ borderRadius: "50%",width:"2.25rem", height:"2.25rem"  }}
        />
      </Container>
    </Navbar>
  );
};

export default TopBar;
