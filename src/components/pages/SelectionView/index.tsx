import React from "react"
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
  state: MyState
  setIsSelected: (selection: IdBooleanMap) => void
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

interface MyState {
  isSelected: IdBooleanMap
  isHoveringOver: IdBooleanMap
}

class SelectionView extends React.Component<SelectionViewProps, MyState> {
  constructor(props: SelectionViewProps) {
    super(props)
    this.state = { isSelected: [], isHoveringOver: [] }
  }

  componentDidMount() {
    let isSelected: IdBooleanMap = []
    let isHoveringOver: IdBooleanMap = []
    this.props.selectionItems.forEach(({ id }: { id: number }) => {
      isSelected[id] = false
      isHoveringOver[id] = false
    })
    this.setState({ isSelected, isHoveringOver })
  }

  isAnySelected(): boolean {
    let items = this.props.selectionItems
    let isSelected = this.state.isSelected
    for (let item in items) {
      if (isSelected[items[item].id]) {
        return true
      }
    }
    return false
  }

  isAllSelected(): boolean {
    let items = this.props.selectionItems
    let isSelected = this.state.isSelected
    for (let item in items) {
      if (!isSelected[items[item].id]) {
        return false
      }
    }
    return true
  }

  handleMouseOver(id: number) {
    let isHoveringOver = this.state.isHoveringOver
    isHoveringOver[id] = true
    this.setState({ isHoveringOver })
  }

  handleMouseOut(id: number) {
    let isHoveringOver = this.state.isHoveringOver
    isHoveringOver[id] = false
    this.setState({ isHoveringOver })
  }

  handleSelectIconClick(id: number) {
    if (this.props.disableSelection) {
      this.handleItemClick(id)
      return
    }
    let isSelected = this.state.isSelected
    let isHoveringOver = this.state.isHoveringOver
    isSelected[id] = !isSelected[id]
    isHoveringOver[id] = false
    this.setState({ isSelected, isHoveringOver })
  }

  handleItemClick(id: number) {
    if (this.isAnySelected()) {
      this.handleSelectIconClick(id)
      return
    }
    this.props.onItemClick(id)
  }

  handleDownloadClick(e: React.MouseEvent) {
    e.preventDefault()
    let indices: number[] = []
    for (let key in this.state.isSelected) {
      if (this.state.isSelected[key]) {
        indices.push(parseInt(key))
      }
    }
    this.props.onDownloadClick(indices)
  }

  handleSelectAllClick() {
    let items = this.props.selectionItems
    let isSelected = this.state.isSelected
    let setValue = !this.isAllSelected()
    for (let item in items) {
      isSelected[items[item].id] = setValue
    }
    this.setState({ isSelected })
  }

  render() {
    let selection: SelectionProps = {
      selectionItems: this.props.selectionItems,
      state: this.state,
      setIsSelected: (selection) => this.setState({ isSelected: selection }),
      isAnySelected: () => this.isAnySelected(),
      handleItemClick: (id: number) => this.handleItemClick(id),
      handleSelectIconClick: (id: number) => this.handleSelectIconClick(id),
      handleMouseOver: (id: number) => this.handleMouseOver(id),
      handleMouseOut: (id: number) => this.handleMouseOut(id),
      disableSelection: this.props.disableSelection,
    }

    return (
      <>
        <ResourceSectionHeader
          heading={this.props.heading}
          onDownloadClick={(e) => this.handleDownloadClick(e)}
          showDownload={this.isAnySelected()}
          onSelectAllClick={() => this.handleSelectAllClick()}
          selectAllIcon={this.isAllSelected() ? faCheckSquare : faSquare}
          disableSelection={this.props.disableSelection}
          checkBoxColur={
            this.isAnySelected()
              ? "var(--secondary-text-color)"
              : "var(--secondary-button-text)"
          }
        />

        {this.props.render(selection)}
      </>
    )
  }
}

export default SelectionView
