import React, {useEffect, useRef, useState} from "react"
import styles from "./style.module.scss"
import classNames from "classnames"

import Row from "react-bootstrap/esm/Row"
import Badge from "react-bootstrap/Badge"
import {IconDefinition} from "@fortawesome/free-regular-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import {DragHandle} from "components/sections/CategoryList"
import {faArrowDown} from "@fortawesome/free-solid-svg-icons"
import useOutsideAlerter from "./useOutsideAlerter"

export interface FileListItemProps {
  title: string
  icon: IconDefinition
  tags: string[]
  downloads?: number
  invisible?: boolean
  resourceActions?: any
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
  resourceActions,
  showMenu,
  setShowMenu,
  onIconClick,
  onClick,
  onMouseOver,
  onMouseOut,
}) => {
  const [xPos, setXPos] = useState("0px")
  const [yPos, setYPos] = useState("0px")
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, () => setShowMenu?.(false));

  const handleClick = () => {
    setShowMenu && showMenu && setShowMenu(false)
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setXPos(`${e.pageX - 5}px`)
    setYPos(`${e.pageY - 5}px`)
    setShowMenu && setShowMenu(true)
  }

  useEffect(() => {
    document.addEventListener("click", handleClick)
  }, [])

  return (
    <>
      {showMenu && resourceActions && (
        <div
          ref={wrapperRef}
          className={styles.resourceMenu}
          style={{
            top: yPos,
            left: xPos,
          }}>
          {resourceActions}
        </div>
      )}
      <div
        style={invisible ? { opacity: "50%" } : {}}
        className={styles.listItem}
        onClick={onClick}
        onMouseOut={onMouseOut}
        onMouseOver={onMouseOver}
        onContextMenu={resourceActions && handleContextMenu}>
        <Row className={styles.listRow}>
          <div className={styles.listItemTitle}>
            {resourceActions ? (
              <div className={styles.centeredFlex}>
                <DragHandle />
                {title}
              </div>
            ) : (
              title
            )}
          </div>
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
