import React, { useEffect, useRef, useState } from "react"
import styles from "./style.module.scss"
import classNames from "classnames"

import Row from "react-bootstrap/esm/Row"
import Badge from "react-bootstrap/Badge"
import { IconDefinition } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { DragHandle } from "components/sections/CategoryList"
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import FileExtensionIcon from "components/atoms/FileExtensionIcon"

interface Props {
  title: string
  suffixes: string[]
  colour?: ("pink" | "teal")
  invisible?: boolean
  respondingIcons?: [IconDefinition, (e: React.MouseEvent) => void][]
  onClick?: (event: React.MouseEvent) => void
  onMouseOver?: (event: React.MouseEvent) => void
  onMouseOut?: (event: React.MouseEvent) => void
}

const UploadResourceItemRow: React.FC<Props> = ({
  title,
  suffixes,
  colour,
  invisible,
  respondingIcons,
  onClick,
  onMouseOver,
  onMouseOut,
}) => {

  const [xPos, setXPos] = useState("0px")
  const [yPos, setYPos] = useState("0px")
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setXPos(`${e.pageX - 5}px`)
    setYPos(`${e.pageY - 5}px`)
  }

  const showFullFileTitle = (title: string, suffixes: string[]): string => {
    if (suffixes.length === 1) {
      const suffix = suffixes[0]
      return `${title}${suffix === "" ? "" : `.${suffix}`}`
    }
    return `${title}(${suffixes.map(a => a === "" ? "no suffix" : `.${a}`).join(", ")})`
  } 

  useEffect(() => {
    // document.addEventListener("click", onClick)
  }, [])


  return (
    <>
      <div
        style={invisible ? { opacity: "50%" } : {}}
        className={styles.listItem}
        onClick={onClick}
        onMouseOut={onMouseOut}
        onMouseOver={onMouseOver}
        onContextMenu={handleContextMenu}>
        <Row 
          className={styles.listRow}
          style={{
            backgroundColor: `var(--${colour}-background)`,
            color: `var(--${colour}-text)`,
            borderColor: `var(--${colour}-text)`, 
          }}
        >
          <div className={styles.listItemTitle}>
            <FileExtensionIcon
              suffixes={suffixes}
              style={{ fontSize: "1.125rem" }}
            />
            {showFullFileTitle(title, suffixes)}
          </div>
          <div className={styles.centeredFlex}>
            {respondingIcons?.map(([icon, onClick]) => {
              return <FontAwesomeIcon
                className={styles.respondingIcon}
                icon={icon} 
                onClick={onClick}
              />
            })} 
          </div>
          {}
        </Row>
      </div>
    </>
  )
}

export default UploadResourceItemRow
