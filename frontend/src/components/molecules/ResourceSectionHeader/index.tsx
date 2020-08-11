import React from "react";
import styles from "./style.module.scss";

import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface SectionHeaderProps {
  heading: string;
  selectAllIcon: IconDefinition;
  showDownload: boolean;
  onSelectAllClick: (event: React.MouseEvent) => void;
}

const ResourceSectionHeader: React.FC<SectionHeaderProps> = ({
  heading,
  onSelectAllClick,
  showDownload,
  selectAllIcon,
}: SectionHeaderProps) => {
  return (
    <>
      <div className={styles.sectionHeaderContainer}>
        <span className={styles.sectionHeader} onClick={onSelectAllClick}>
          {heading}
        </span>
        <div className={styles.sectionHeaderButtonGroup}>
          {showDownload ? (
            <Button className={styles.sectionHeaderButton}>
              <FontAwesomeIcon
                className={styles.buttonIcon}
                icon={faDownload}
              />
            </Button>
          ) : null}
          <Button
            className={styles.sectionHeaderButton}
            onClick={onSelectAllClick}
          >
            <FontAwesomeIcon
              className={styles.buttonIcon}
              icon={selectAllIcon}
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ResourceSectionHeader;
