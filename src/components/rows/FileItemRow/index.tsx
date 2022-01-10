import React from "react"
import styles from "./style.module.scss"
import classNames from "classnames"

import Row from "react-bootstrap/esm/Row"
import Badge from "react-bootstrap/Badge"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import { IconDefinition } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { DragHandle } from "components/sections/CategoryList"
import { faArrowDown, faEdit } from "@fortawesome/free-solid-svg-icons"

export interface FileListItemProps {
  title: string
  icon: IconDefinition
  tags: string[]
  downloads?: number
  invisible?: boolean
  displayingForStaff?: boolean
  onEditClick?: () => void
  onIconClick?: (event: React.MouseEvent) => void
  onClick?: (event: React.MouseEvent) => void
  onMouseOver?: (event: React.MouseEvent) => void
  onMouseOut?: (event: React.MouseEvent) => void
}

const FileItemRow: React.FC<FileListItemProps> = ({
  title,
  icon,
  tags,
  downloads,
  invisible,
  displayingForStaff = false,
  onEditClick = () => {},
  onIconClick,
  onClick,
  onMouseOver,
  onMouseOut,
}) => {
  const renderEditTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit resource
    </Tooltip>
  )

  return (
    <>
      <div
        style={invisible ? { opacity: "50%" } : {}}
        className={styles.listItem}
        onClick={onClick}
        onMouseOver={(event: React.MouseEvent) => {
          if (onMouseOver) {
            onMouseOver(event)
          }
        }}
        onMouseOut={(event: React.MouseEvent) => {
          if (onMouseOut) {
            onMouseOut(event)
          }
        }}>
        <Row className={styles.listRow}>
          <div className={styles.listItemTitle}>
            {displayingForStaff ? (
              <div className={styles.centeredFlex}>
                <DragHandle />
                {title}
              </div>
            ) : (
              title
            )}
          </div>
          <div className={classNames(styles.tagBox)}>
            {tags.map((tag) => (
              <Badge
                pill
                key={tag}
                className={classNames(
                  styles.fileTag,
                  tag === "new" ? styles.tagTeal : styles.tagBlue
                )}>
                {tag}
              </Badge>
            ))}
          </div>
          {downloads !== undefined && (
            <Badge variant="light" className={styles.fileTag}>
              <FontAwesomeIcon icon={faArrowDown} />
              {downloads}
            </Badge>
          )}
          {displayingForStaff && (
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderEditTooltip}>
              <FontAwesomeIcon
                style={{ fontSize: "1.125rem" }}
                icon={faEdit}
                onClick={(e) => {
                  e.stopPropagation()
                  onEditClick()
                }}
                fixedWidth
              />
            </OverlayTrigger>
          )}
          <FontAwesomeIcon
            style={{ fontSize: "1.125rem" }}
            icon={icon}
            onClick={(e) => {
              e.stopPropagation()
              if (onIconClick !== undefined) onIconClick(e)
            }}
            fixedWidth
          />
        </Row>
      </div>
    </>
  )
}

export default FileItemRow
