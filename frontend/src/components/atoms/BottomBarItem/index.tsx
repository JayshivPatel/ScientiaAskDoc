import React from "react";
import Button from "react-bootstrap/Button";
import {
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export interface BottomBarItemProps {
  page: {
    name: string;
    path: string;
    icon: IconDefinition;
  };
}

const BottomBarItem: React.FC<BottomBarItemProps> = ({ page }: BottomBarItemProps) => {

  return (
    <Button
      activeClassName="active"
      as={NavLink}
      to={page.path}
      id={"bottom-" + page.name}
      key={page.name}
    >
      <div className="button-holder">
        <FontAwesomeIcon icon={page.icon} size="lg" />
      </div>
    </Button>
  );
};

export default BottomBarItem;
