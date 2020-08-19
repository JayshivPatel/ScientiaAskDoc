import React from "react";
import classNames from "classnames";
import { api, methods } from "../../../constants/routes";
import { request } from "../../../utils/api";
import ResourceSectionHeader from "../ResourceSectionHeader";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";

interface SelectionItem {
  title: string;
  id: number;
  type?: string;
  tags?: string[];
}

type idBooleanMap = { [key: number]: boolean };

export interface SelectionProps {
  selectionItems: SelectionItem[];
  state: MyState;
  isAnySelected: () => boolean;
  handleCardClick: (id: number) => void;
  handleIconClick: (id: number) => void;
  handleMouseOver: (id: number) => void;
  handleMouseOut: (id: number) => void;
}

export interface MyProps {
  selectionItems: SelectionItem[];
  moduleCode?: string;
	render: (selection: SelectionProps) => any;
	heading: string;
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

  handleDownloadClick() {}

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
          onDownloadClick={() => this.handleDownloadClick()}
          showDownload={this.isAnySelected()}
          onSelectAllClick={() => this.handleSelectAllClick()}
          selectAllIcon={this.isAllSelected() ? faCheckSquare : faSquare}
          checkBoxColur={this.isAnySelected() ? "#495057" : "#dee2e6"}
        />

        {this.props.render(selection)}
      </>
    );
  }
}

export default SelectionView;
