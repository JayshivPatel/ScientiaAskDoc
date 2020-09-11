import React from "react";
import Button from "react-bootstrap/Button";
import styles from "./style.module.scss";
import classNames from "classnames";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export interface SideBarTabGroupProp {
  title: string;
  buttons: {
    title: string;
    icon?: IconDefinition;
    active?: boolean;
    activeURL?: string;
    externalURL?: string;
    onClick?: (event: React.MouseEvent) => void;
  }[];
}

const SideBarTabGroup: React.FC<SideBarTabGroupProp> = ({
  title,
  buttons
}: SideBarTabGroupProp) => {
  let displayButtons = buttons.map(
    ({ title, icon, active, activeURL, externalURL, onClick }) => {
      let FAicon;
      if (icon) {
        FAicon = (
          <FontAwesomeIcon
            fixedWidth
            className={styles.tabGroupButtonSvg}
            icon={icon}
          />
        );
      }
      if (activeURL !== undefined) {
        return (
          <Button
            as={NavLink}
            to={activeURL}
            activeClassName={"active"}
            key={title}
          >
            {title}
            {FAicon}
          </Button>
        );
      }

      if (externalURL !== undefined) {
        return (
          <Button href={externalURL} target="_blank" key={title}>
            {title}
            {FAicon}
          </Button>
        );
      }

      return (
        <Button
          className={classNames({ active: active })}
          onClick={onClick}
          key={title}
        >
          {title}
          {FAicon}
        </Button>
      );
    }
  );

  return (
    <>
      <h1 className={styles.tabGroupHeading}>{title}</h1>
      <div
        className={"btn-group-vertical " + styles.tabGroupButtonGroup}
        role="group"
      >
        {displayButtons}
      </div>
    </>
  );
};

export default SideBarTabGroup;
