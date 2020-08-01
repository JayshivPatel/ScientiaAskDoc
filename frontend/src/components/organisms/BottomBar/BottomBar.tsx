import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./style.scss";
import {
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export interface BottomBarProps {
  pages: {
    name: string;
    path: string;
    icon: IconDefinition;
  }[];
}

const BottomBar: React.FC<BottomBarProps> = ({ pages }: BottomBarProps) => {
  const BottomBarItems = pages.map(({ name, path, icon }) => (
    <Button
      activeClassName="active"
      as={NavLink}
      to={path}
      id={"bottom-" + name}
      key={name}
    >
      <div className="button-holder">
        <FontAwesomeIcon icon={icon} size="lg" />
      </div>
    </Button>
  ));

  return (
    <Navbar className="bottom-bar footer">
      <ButtonGroup aria-label="Basic example" className="bottom-bar-buttons">
        {BottomBarItems}
      </ButtonGroup>
    </Navbar>
  );
};

export default BottomBar;
