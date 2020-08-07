import React from "react";
import Button from "react-bootstrap/Button";
import styles from "./style.module.scss";
import classNames from "classnames";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface SideBarTabGroupProp {
  title: string;
  buttons: {
    title: string;
    icon?: IconDefinition;
    active?: boolean;
  }[];
}

const SideBarTabGroup: React.FC<SideBarTabGroupProp> = ({
  title,
  buttons,
}: SideBarTabGroupProp) => {
  let displayButtons = buttons.map(({ title, icon, active }) => {
    let FAicon;
    if (icon) {
      FAicon = (
        <FontAwesomeIcon className={styles.tabGroupButtonSvg} icon={icon} />
      );
    }
    return (
      <Button
        className={classNames({ active: active }, styles.tabGroupButton)}
        key={title}
      >
        {title}
        {FAicon}
      </Button>
    );
  });

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
