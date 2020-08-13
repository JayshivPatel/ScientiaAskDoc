import React from "react";
import styles from "./style.module.scss";

import Button from "react-bootstrap/Button";
import Fade from "react-bootstrap/Fade";
import { CSSTransition } from "react-transition-group";
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
  onMouseOut
}: SectionHeaderProps) => {
  let show = showDownload.valueOf();
  return (
    <>
      <div
        className={styles.sectionHeaderContainer}
        onMouseOut={onMouseOut}
        onMouseOver={onMouseOver}
      >
        <span className={styles.sectionHeader} onClick={onSelectAllClick}>
          {heading}
        </span>
        <div className={styles.sectionHeaderButtonGroup}>
          <Fade in={show} timeout={500}>
            <span id="download-button">
              <Button
                className={styles.sectionHeaderButton}
                onClick={() => {}}
                style={{ color: showDownload ? "#495057" : "#acb5bd" }}
              >
                <FontAwesomeIcon
                  className={styles.buttonIcon}
                  icon={faDownload}
                />
              </Button>
            </span>
          </Fade>
          <Button
            style={{ color: showDownload ? "#495057" : "#acb5bd" }}
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
