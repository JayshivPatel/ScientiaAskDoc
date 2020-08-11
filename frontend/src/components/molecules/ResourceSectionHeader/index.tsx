import React from "react";
import styles from "./style.module.scss";

import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare , faCheckSquare} from "@fortawesome/free-regular-svg-icons";

export interface SectionHeaderProps {
  heading: string;
}

const ResourceSectionHeader: React.FC<SectionHeaderProps> = ({heading}: SectionHeaderProps) => {
  return (
    <>
      <div className={styles.sectionHeaderContainer}>
        <span className={styles.sectionHeader}>{heading}</span>
        <div className={styles.sectionHeaderButtonGroup}>
          <Button className={styles.sectionHeaderButton}>
            <FontAwesomeIcon className={styles.buttonIcon} icon={faDownload} />
          </Button>
          <Button className={styles.sectionHeaderButton}> 
            <FontAwesomeIcon className={styles.buttonIcon} icon={faSquare} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ResourceSectionHeader;
