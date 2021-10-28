import React, { useEffect, useRef, useState } from "react"
import styles from "./style.module.scss"
import classNames from "classnames"

import Row from "react-bootstrap/esm/Row"
import Badge from "react-bootstrap/Badge"
import { IconDefinition } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { DragHandle } from "components/sections/CategoryList"
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import useOutsideAlerter from "../../../hooks/useOutsideAlerter"
import { Button } from "react-bootstrap"

export interface FileListItemProps {
  title: string
  icon: IconDefinition
  tags: string[]
  downloads?: number
  invisible?: boolean
  displayingForStaff?: boolean
  showMenu?: boolean
  setShowMenu?: (show: boolean) => void
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
  showMenu,
  setShowMenu,
  onIconClick,
  onClick,
  onMouseOver,
  onMouseOut,
}) => {
  const [hovering, setHovering] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)
  useOutsideAlerter(wrapperRef, () => setShowMenu?.(false))

  const handleClick = () => {
    setShowMenu && showMenu && setShowMenu(false)
  }

  useEffect(() => {
    document.addEventListener("click", handleClick)
  }, [])

  return (
    <>
      <div
        style={invisible ? { opacity: "50%" } : {}}
        className={styles.listItem}
        onClick={onClick}
        onMouseOver={(event: React.MouseEvent) => {
          setHovering(true)
          if (onMouseOver) {
            onMouseOver(event)
          }
        }}
        onMouseOut={(event: React.MouseEvent) => {
          setHovering(false)
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
          {displayingForStaff && hovering && (
            <Button
              className={classNames(styles.centeredFlex, styles.editButton)}
              variant="info">
              Edit
            </Button>
          )}
          <div className={styles.centeredFlex}>
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
            {downloads !== undefined && (
              <Badge variant="light" className={styles.fileTag}>
                <FontAwesomeIcon icon={faArrowDown} />
                {downloads}
              </Badge>
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
          </div>
        </Row>
      </div>
    </>
  )
}

export default FileItemRow
