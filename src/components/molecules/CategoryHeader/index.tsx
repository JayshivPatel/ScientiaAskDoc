import React from "react";
import styles from "./style.module.scss";

import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

export interface CategoryHeaderProps {
  heading: string;
  onSelectAllClick: (event: React.MouseEvent) => void;
  selectAllIcon: IconDefinition;
  checkBoxColor: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  heading,
  onSelectAllClick,
  selectAllIcon,
  checkBoxColor,
}: CategoryHeaderProps) => {
  return (
    <>
      <div className={styles.sectionHeaderContainer} style={{paddingRight: "0.325rem"}} onClick={onSelectAllClick}>
        <span className={styles.sectionHeader}>{heading}</span>
        <div className={styles.sectionHeaderButtonGroup}>
          <FontAwesomeIcon
            style={{ color: checkBoxColor, fontSize: "1.125rem" }}
            icon={selectAllIcon}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryHeader;
