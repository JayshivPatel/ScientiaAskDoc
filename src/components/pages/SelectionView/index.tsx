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
  selected: Set<number>
  setSelected: (selection: Set<number>) => void
  hoveringOver: Set<number>
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
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [hoveringOver, setHoveringOver] = useState<Set<number>>(new Set())

  const isAnySelected = (): boolean => {
    return selected.size > 0
  }

  const isAllSelected = (): boolean => {
    return selected.size === selectionItems.length
  }

  const handleMouseOver = (id: number): void => {
    setHoveringOver(new Set(hoveringOver).add(id))
  }

  const handleMouseOut = (id: number): void => {
    let newHoveringOver = new Set(hoveringOver)
    newHoveringOver.delete(id)
    setHoveringOver(newHoveringOver)
  }

  const handleSelectIconClick = (id: number): void => {
    if (disableSelection) {
      handleItemClick(id)
      return
    }
    let newSelected = new Set(selected)
    if (selected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelected(newSelected)

    let newHoveringOver = new Set(hoveringOver)
    newHoveringOver.delete(id)
    setHoveringOver(newHoveringOver)
  }

  const handleItemClick = (id: number): void => {
    if (isAnySelected()) handleSelectIconClick(id)
    else onItemClick(id)
  }

  const handleDownloadClick = (e: React.MouseEvent): void => {
    e.preventDefault()
    let indices: number[] = Array.from(selected.values())
    onDownloadClick(indices)
  }

  const handleSelectAllClick = (): void => {
    if (isAllSelected()) {
      setSelected(new Set())
    } else {
      setSelected(new Set(selectionItems.map((item) => item.id)))
    }
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
        checkBoxColour={
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
