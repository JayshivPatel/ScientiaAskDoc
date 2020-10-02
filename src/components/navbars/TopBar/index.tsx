import React from "react"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import NavBarTabGroup from "components/navbars/TopBar/components/NavBarTabGroup"
import NavBarBrand from "components/navbars/TopBar/components/NavBarBrand"
import styles from "./style.module.scss"
import { theme } from "utils/functions"

export interface TopBarProps {
  pages: {
    name: string
    path: string
  }[]
  onFavIconClick: (event: React.MouseEvent<HTMLElement>) => void
  onUserIconClick: (event: React.MouseEvent<HTMLElement>) => void
}

const TopBar: React.FC<TopBarProps> = ({
  pages,
  onFavIconClick,
  onUserIconClick,
}: TopBarProps) => {
  return (
    <Navbar className={styles.navBar} sticky="top" expand="lg" variant="light">
      <Container fluid>
        <NavBarBrand onClick={onFavIconClick} />

        <NavBarTabGroup pages={pages} />

        <img
          src={`/images/${theme()}/user.png`}
          className="d-inline-block align-top"
          alt="userPic"
          onClick={onUserIconClick}
          style={{ borderRadius: "50%", width: "2.25rem", height: "2.25rem" }}
        />
      </Container>
    </Navbar>
  )
}

export default TopBar
