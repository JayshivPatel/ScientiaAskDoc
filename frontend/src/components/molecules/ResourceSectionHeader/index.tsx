import React from "react";
import styles from "./style.module.scss";

import Button from "react-bootstrap/Button";
import Fade from "react-bootstrap/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface SectionHeaderProps {
  heading: string;
  selectAllIcon: IconDefinition;
  showDownload: Boolean;
	onSelectAllClick: (event: React.MouseEvent) => void;
	checkBoxColur: string;
}

const ResourceSectionHeader: React.FC<SectionHeaderProps> = ({
  heading,
  showDownload,
  selectAllIcon,
	onSelectAllClick,
	checkBoxColur,
}: SectionHeaderProps) => {
  let show = showDownload.valueOf();
  return (
    <>
      <div
        className={styles.sectionHeaderContainer}
      >
        <span className={styles.sectionHeader} onClick={onSelectAllClick}>
          {heading}
        </span>
        <div className={styles.sectionHeaderButtonGroup}>
          <Fade in={show} timeout={500}>
            <span id="download-button">
              <Button
								style={{ color: checkBoxColur }}
                className={styles.sectionHeaderButton}
                onClick={() => {}}
              >
                <FontAwesomeIcon
                  className={styles.buttonIcon}
                  icon={faDownload}
                />
              </Button>
            </span>
          </Fade>
          <Button
            style={{ color: checkBoxColur }}
            className={styles.sectionHeaderButton}
            onClick={onSelectAllClick}
            aria-controls="download-button"
            aria-expanded={show}
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
