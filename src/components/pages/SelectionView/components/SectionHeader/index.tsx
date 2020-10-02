import React from "react"
import styles from "./style.module.scss"

import Button from "react-bootstrap/Button"
import Fade from "react-bootstrap/Fade"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload, IconDefinition } from "@fortawesome/free-solid-svg-icons"

export interface SectionHeaderProps {
  heading: string
  selectAllIcon: IconDefinition
  showDownload: Boolean
  onDownloadClick: (event: React.MouseEvent) => void
  onSelectAllClick: (event: React.MouseEvent) => void
  checkBoxColur: string
  disableSelection?: boolean
}

const ResourceSectionHeader: React.FC<SectionHeaderProps> = ({
  heading,
  showDownload,
  selectAllIcon,
  onDownloadClick,
  onSelectAllClick,
  checkBoxColur,
  disableSelection,
}: SectionHeaderProps) => {
  let show = showDownload.valueOf()
  return (
    <>
      <div className={styles.sectionHeaderContainer}>
        <span
          className={styles.sectionHeader}
          onClick={disableSelection ? () => {} : onSelectAllClick}>
          {heading}
        </span>
        {!disableSelection && (
          <div className={styles.sectionHeaderButtonGroup}>
            <Fade in={show} timeout={500}>
              <span id="download-button">
                <Button
                  variant="secondary"
                  className={styles.sectionHeaderButton}
                  onClick={onDownloadClick}>
                  <FontAwesomeIcon
                    className={styles.buttonIcon}
                    style={{ color: checkBoxColur }}
                    icon={faDownload}
                  />
                </Button>
              </span>
            </Fade>
            <Button
              className={styles.sectionHeaderButton}
              onClick={onSelectAllClick}
              variant="secondary"
              aria-controls="download-button"
              aria-expanded={show}>
              <FontAwesomeIcon
                className={styles.buttonIcon}
                style={{ color: checkBoxColur }}
                icon={selectAllIcon}
              />
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default ResourceSectionHeader
