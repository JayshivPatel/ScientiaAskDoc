import React from "react";
import styles from "./style.module.scss";

import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface CategoryHeaderProps {
  heading: string;
  onSelectAllClick?: (event: React.MouseEvent) => void;
  selectAllIcon?: IconDefinition;
  checkBoxColor?: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  heading,
  onSelectAllClick,
  selectAllIcon,
  checkBoxColor
}: CategoryHeaderProps) => {
  return (
    <>
      <div className={styles.sectionHeaderContainer}>
        <span className={styles.sectionHeader}>{heading}</span>
        { !selectAllIcon ||
        <div className={styles.sectionHeaderButtonGroup}>
          <Button
            style={{ color: checkBoxColor }}
            className={styles.sectionHeaderButton}
            onClick={onSelectAllClick}
            variant="secondary"
          >
            <FontAwesomeIcon
              className={styles.buttonIcon}
              icon={selectAllIcon}
            />
          </Button>
        </div>
        }
      </div>
    </>
  );
};

export default CategoryHeader;
