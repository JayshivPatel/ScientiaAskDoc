import React from "react";
import styles from "./style.module.scss";

import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export interface CategoryHeaderProps {
  heading: string;
	onDownloadClick: (event: React.MouseEvent) => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  heading,
  onDownloadClick,
}: CategoryHeaderProps) => {
  return (
    <>
      <div className={styles.sectionHeaderContainer}>
        <span className={styles.sectionHeader}>
          {heading}
        </span>
        <div className={styles.sectionHeaderButtonGroup}>
            <span id="download-button">
              <Button
								variant="secondary" 
                className={styles.sectionHeaderButton}
                onClick={onDownloadClick}
              >
                <FontAwesomeIcon
                  className={styles.buttonIcon}
                  icon={faDownload}
                />
                Download Section
              </Button>
            </span>
        </div>
      </div>
    </>
  )
};

export default CategoryHeader;