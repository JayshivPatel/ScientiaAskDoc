import React from "react";
import Navbar from "react-bootstrap/Navbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import BottomBarItem from "components/atoms/BottomBarItem";

export interface BottomBarProps {
  pages: {
    name: string;
    path: string;
    icon: IconDefinition;
  }[];
}

const BottomBar: React.FC<BottomBarProps> = ({ pages }: BottomBarProps) => {
  return (
    <Navbar className="bottom-bar footer">
      <ButtonGroup aria-label="Basic example" className="bottom-bar-buttons">
        {pages.map((page) => (
          <BottomBarItem page={page} key={page.name} />
        ))}
      </ButtonGroup>
    </Navbar>
  );
};

export default BottomBar;
