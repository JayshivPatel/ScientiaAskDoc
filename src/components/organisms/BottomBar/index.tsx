import React from "react";
import Navbar from "react-bootstrap/Navbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import BottomBarItem from "components/organisms/BottomBar/BottomBarItem";
import styles from "./style.module.scss"

export interface BottomBarProps {
  pages: {
    name: string;
    path: string;
    icon: IconDefinition;
  }[];
}

const BottomBar: React.FC<BottomBarProps> = ({ pages }: BottomBarProps) => {
  return (
    <Navbar className={"footer " + styles.bottomBar}>
      <ButtonGroup aria-label="Basic example" className={styles.bottomBarButtons}>
        {pages.map((page) => (
          <BottomBarItem page={page} key={page.name} />
        ))}
      </ButtonGroup>
    </Navbar>
  );
};

export default BottomBar;
