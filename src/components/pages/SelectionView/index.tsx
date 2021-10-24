import React, { useState } from "react"
import ResourceSectionHeader from "./components/SectionHeader"
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons"
import { IdBooleanMap } from "constants/types"

export interface SelectionItem {
  title: string
  id: number
  folder?: string
  type?: string
  tags?: string[]
  thumbnail?: string
}

export interface SelectionProps {
  selectionItems: SelectionItem[]
  selected: IdBooleanMap
  setSelected: (selection: IdBooleanMap) => void
  hoveringOver: IdBooleanMap
  isAnySelected: () => boolean
  handleItemClick: (id: number) => void
  handleSelectIconClick: (id: number) => void
  handleMouseOver: (id: number) => void
  handleMouseOut: (id: number) => void
  disableSelection?: boolean
}

export interface SelectionViewProps {
  selectionItems: SelectionItem[]
  render: (selection: SelectionProps) => any
  heading: string
  onDownloadClick: (identifiers: number[]) => void
  onItemClick: (identifier: number) => void
  disableSelection?: boolean
}

const SelectionView: React.FC<SelectionViewProps> = ({
  selectionItems,
  render,
  heading,
  onDownloadClick,
  onItemClick,
  disableSelection,
}) => {
  const initMap = (): IdBooleanMap => {
    const selectionItemIds = selectionItems.map((item) => item.id)
    let allFalse: IdBooleanMap = {}
    for (let id of selectionItemIds) {
      allFalse[id] = false
    }
    return allFalse
  }

  const [selected, setSelected] = useState<IdBooleanMap>(initMap())
  const [hoveringOver, setHoveringOver] = useState<IdBooleanMap>(initMap())

  const isAnySelected = (): boolean => {
    for (let item of selectionItems) {
      if (selected[item.id]) {
        return true
      }
    }
    return false
  }

  const isAllSelected = (): boolean => {
    for (let item of selectionItems) {
      if (!selected[item.id]) {
        return false
      }
    }
    return true
  }

  const handleMouseOver = (id: number): void => {
    let newHoveringOver = { ...hoveringOver }
    newHoveringOver[id] = true
    setHoveringOver(newHoveringOver)
  }

  const handleMouseOut = (id: number): void => {
    let newHoveringOver = { ...hoveringOver }
    newHoveringOver[id] = false
    setHoveringOver(newHoveringOver)
  }

  const handleSelectIconClick = (id: number): void => {
    if (disableSelection) {
      handleItemClick(id)
      return
    }
    let newSelected = { ...selected }
    let newHoveringOver = { ...hoveringOver }
    newSelected[id] = !selected[id]
    newHoveringOver[id] = false
    setSelected(newSelected)
    setHoveringOver(newHoveringOver)
  }

  const handleItemClick = (id: number): void => {
    if (isAnySelected()) {
      handleSelectIconClick(id)
      return
    }
    onItemClick(id)
  }

  const handleDownloadClick = (e: React.MouseEvent): void => {
    e.preventDefault()
    let indices: number[] = []
    for (let key in selected) {
      if (selected[key]) {
        indices.push(parseInt(key))
      }
    }
    onDownloadClick(indices)
  }

  const handleSelectAllClick = (): void => {
    let newSelected = { ...selected }
    let setValue = !isAllSelected()
    for (let item of selectionItems) {
      newSelected[item.id] = setValue
    }
    setSelected(newSelected)
  }

  const selectionProps: SelectionProps = {
    selectionItems: selectionItems,
    selected: selected,
    setSelected: (selection) => setSelected(selection),
    hoveringOver: hoveringOver,
    isAnySelected: () => isAnySelected(),
    handleItemClick: (id: number) => handleItemClick(id),
    handleSelectIconClick: (id: number) => handleSelectIconClick(id),
    handleMouseOver: (id: number) => handleMouseOver(id),
    handleMouseOut: (id: number) => handleMouseOut(id),
    disableSelection: disableSelection,
  }

  return (
    <>
      <ResourceSectionHeader
        heading={heading}
        onDownloadClick={(e) => handleDownloadClick(e)}
        showDownload={isAnySelected()}
        onSelectAllClick={() => handleSelectAllClick()}
        selectAllIcon={isAllSelected() ? faCheckSquare : faSquare}
        disableSelection={disableSelection}
        checkBoxColur={
          isAnySelected()
            ? "var(--secondary-text-color)"
            : "var(--secondary-button-text)"
        }
      />

      {render(selectionProps)}
    </>
  )
}

export default SelectionView
