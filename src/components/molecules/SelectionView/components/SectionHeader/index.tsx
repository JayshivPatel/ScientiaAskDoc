import React from "react";
import styles from "./style.module.scss";

import Button from "react-bootstrap/Button";
import Fade from "react-bootstrap/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/atoms/IconButton"

export interface SectionHeaderProps {
  heading: string;
  selectAllIcon: IconDefinition;
  showDownload: Boolean;
  onDownloadClick: (event: React.MouseEvent) => void;
  onSelectAllClick: (event: React.MouseEvent) => void;
  checkBoxColur: string;
}

const ResourceSectionHeader: React.FC<SectionHeaderProps> = ({
  heading,
  showDownload,
  selectAllIcon,
  onDownloadClick,
  onSelectAllClick,
  checkBoxColur
}: SectionHeaderProps) => {
  let show = showDownload.valueOf();
  return (
    <>
      <div className={styles.sectionHeaderContainer}>
        <span className={styles.sectionHeader} onClick={onSelectAllClick}>
          {heading}
        </span>
        <div className={styles.sectionHeaderButtonGroup}>
          <Fade in={show} timeout={500}>
            <span id="download-button">
              <IconButton
                buttonProps={{ "style": { color: checkBoxColur } }}
                onClick={onDownloadClick}
                icon={faDownload}
              />
            </span>
          </Fade>
          <IconButton
            buttonProps={{
              "style": { color: checkBoxColur },
              "aria-controls": "download-button",
              "aria-expanded": show
            }}
            onClick={onSelectAllClick}
            icon={selectAllIcon}
          />
        </div>
      </div>
    </>
  );
};

export default ResourceSectionHeader;
