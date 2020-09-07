import React from "react";
import ResourceSectionHeader from "./components/SectionHeader";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { idBooleanMap } from "constants/types"

export interface SelectionItem {
  title: string;
  id: number;
  folder?: string;
  type?: string;
  tags?: string[];
  thumbnail?: string;
}

export interface SelectionProps {
  selectionItems: SelectionItem[];
  state: MyState;
  setIsSelected: (selection: idBooleanMap) => void;
  isAnySelected: () => boolean;
  handleCardClick: (id: number) => void;
  handleIconClick: (id: number) => void;
  handleMouseOver: (id: number) => void;
  handleMouseOut: (id: number) => void;
}

export interface MyProps {
  selectionItems: SelectionItem[];
  render: (selection: SelectionProps) => any;
  heading: string;
  onDownloadClick: (identifiers: number[]) => void;
  onItemClick: (identifier: number) => void;
}

interface MyState {
  isSelected: idBooleanMap;
  isHoveringOver: idBooleanMap;
}

class SelectionView extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = { isSelected: [], isHoveringOver: [] };
  }

  componentDidMount() {
    let isSelected: idBooleanMap = [];
    let isHoveringOver: idBooleanMap = [];
    this.props.selectionItems.forEach(({ id }: { id: number }) => {
      isSelected[id] = false;
      isHoveringOver[id] = false;
    });
    this.setState({ isSelected, isHoveringOver });
  }

  isAnySelected(): boolean {
    let items = this.props.selectionItems;
    let isSelected = this.state.isSelected;
    for (let item in items) {
      if (isSelected[items[item].id]) {
        return true;
      }
    }
    return false;
  }

  isAllSelected(): boolean {
    let items = this.props.selectionItems;
    let isSelected = this.state.isSelected;
    for (let item in items) {
      if (!isSelected[items[item].id]) {
        return false;
      }
    }
    return true;
  }

  handleIconClick(id: number) {
    let isSelected = JSON.parse(JSON.stringify(this.state.isSelected));
    let isHoveringOver = JSON.parse(JSON.stringify(this.state.isHoveringOver));
    isSelected[id] = !isSelected[id];
    isHoveringOver[id] = false;
    this.setState({ isSelected, isHoveringOver });
  }

  handleDownloadClick(e: React.MouseEvent) {
    e.preventDefault();
    let indices: number[] = [];
    for (let key in this.state.isSelected) {
      if (this.state.isSelected[key]) {
        indices.push(parseInt(key));
      }
    }
    this.props.onDownloadClick(indices);
  }

  handleSelectAllClick() {
    let items = this.props.selectionItems;
    let isSelected = JSON.parse(JSON.stringify(this.state.isSelected));
    let setValue = !this.isAllSelected();
    for (let item in items) {
      isSelected[items[item].id] = setValue;
    }
    this.setState({ isSelected });
  }

  handleCardClick(id: number) {
    if (this.isAnySelected()) {
      this.handleIconClick(id);
      return;
    }
    this.props.onItemClick(id);
  }

  handleMouseOver(id: number) {
    let isHoveringOver = JSON.parse(JSON.stringify(this.state.isHoveringOver));
    isHoveringOver[id] = true;
    this.setState({ isHoveringOver });
  }

  handleMouseOut(id: number) {
    let isHoveringOver = JSON.parse(JSON.stringify(this.state.isHoveringOver));
    isHoveringOver[id] = false;
    this.setState({ isHoveringOver });
  }

  render() {
    let selection: SelectionProps = {
      selectionItems: this.props.selectionItems,
      state: this.state,
      setIsSelected: (selection) => this.setState({ isSelected: selection }),
      isAnySelected: () => this.isAnySelected(),
      handleCardClick: (id: number) => this.handleCardClick(id),
      handleIconClick: (id: number) => this.handleIconClick(id),
      handleMouseOver: (id: number) => this.handleMouseOver(id),
      handleMouseOut: (id: number) => this.handleMouseOut(id),
    };

    return (
      <>
        <ResourceSectionHeader
          heading={this.props.heading}
          onDownloadClick={(e) => this.handleDownloadClick(e)}
          showDownload={this.isAnySelected()}
          onSelectAllClick={() => this.handleSelectAllClick()}
          selectAllIcon={this.isAllSelected() ? faCheckSquare : faSquare}
          checkBoxColur={
            this.isAnySelected()
              ? "var(--secondary-text-color)"
              : "var(--secondary-button-active)"
          }
        />

        {this.props.render(selection)}
      </>
    );
  }
}

export default SelectionView;
