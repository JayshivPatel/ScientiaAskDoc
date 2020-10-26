import React, { useEffect, useRef, useState } from "react"
import styles from "./style.module.scss"
import classNames from "classnames"

import Row from "react-bootstrap/esm/Row"
import { IconDefinition } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import FileExtensionIcon from "components/atoms/FileExtensionIcon"
import Badge from "react-bootstrap/esm/Badge"

interface Props {
  title: string
  suffixes: string[]
  tags?: string[]
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
  tags,
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

  const tagColourClass = styles[
    `tag${
      colour 
        ? colour.charAt(0).toUpperCase() + colour.slice(1) + "Dark"
        : "Blue"
    }`
  ]

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
            {tags?.map(key => <Badge 
              pill 
              key={key} 
              className={classNames(
                styles.fileTag,
                tagColourClass,
              )}>
                {key}
              </Badge>
            )}
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
