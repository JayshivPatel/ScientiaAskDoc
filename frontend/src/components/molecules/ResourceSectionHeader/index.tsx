import React from "react";
import styles from "./style.module.scss";

import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface SectionHeaderProps {
  heading: string;
  selectAllIcon: IconDefinition;
  showDownload: Boolean;
  showSelectAll: Boolean;
  onSelectAllClick: (event: React.MouseEvent) => void;
  onMouseOver: (event: React.MouseEvent) => void;
  onMouseOut: (event: React.MouseEvent) => void;
}

const ResourceSectionHeader: React.FC<SectionHeaderProps> = ({
  heading,
  showDownload,
  selectAllIcon,
  showSelectAll,
  onSelectAllClick,
  onMouseOver,
  onMouseOut,
}: SectionHeaderProps) => {
  return (
    <>
      <div
        className={styles.sectionHeaderContainer}
        onMouseOut={onMouseOut}
				onMouseOver={onMouseOver}
				onClick={onSelectAllClick}
      >
        <span className={styles.sectionHeader} >
          {heading}
        </span>
        <div className={styles.sectionHeaderButtonGroup}>
          <Button
						className={styles.sectionHeaderButton}
						onClick= {() => {}}
            style={{ visibility: showDownload ? "visible" : "hidden" }}
          >
            <FontAwesomeIcon className={styles.buttonIcon} icon={faDownload} />
          </Button>

          <Button
            style={{ visibility: showSelectAll ? "visible" : "hidden" }}
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
