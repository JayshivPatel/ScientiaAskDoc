import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ResourceSectionHeader from "../ResourceSectionHeader";
import FolderCard from "components/atoms/FolderCard";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { withRouter, RouteComponentProps } from "react-router-dom";

type PathParamsType = {
  location: any;
  history: string;
};

type PropsType = RouteComponentProps<PathParamsType> & ResourceFoldersProps;

export interface ResourceFoldersProps {
  folderItems: {
    title: string;
    id: number;
  }[];
}

type idBooleanMap = { [key: number]: boolean };
interface MyState {
  isSelected: idBooleanMap;
  isHoveringOver: idBooleanMap;
  isHoveringTitle: Boolean;
}

class ResourcesFolderView extends React.Component<PropsType, MyState> {
  constructor(props: PropsType) {
    super(props);
    this.state = { isSelected: [], isHoveringOver: [], isHoveringTitle: false };
  }

  componentDidMount() {
    let isSelected: idBooleanMap = [];
    this.props.folderItems.forEach(({ id }: { id: number }) => {
      isSelected[id] = false;
    });
    this.setState({ isSelected });
  }

  isAnySelected(): boolean {
    let items = this.props.folderItems;
    let isSelected = this.state.isSelected;
    for (let item in items) {
      if (isSelected[items[item].id]) {
        return true;
      }
    }
    return false;
  }

  isAllSelected(): boolean {
    let items = this.props.folderItems;
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

  handleSelectAllClick() {
    let items = this.props.folderItems;
    let isSelected = JSON.parse(JSON.stringify(this.state.isSelected));
    let setValue = !this.isAllSelected();
    for (let item in items) {
      isSelected[items[item].id] = setValue;
    }
    this.setState({ isSelected, isHoveringTitle: false });
  }

  handleCardClick(id: number) {
    if (this.isAnySelected()) {
      this.handleIconClick(id);
      return;
    }

    let items = this.props.folderItems;
    for (let item in items) {
      if (items[item].id == id) {
        console.log(`/${items[item].title}`);
        this.props.history.push(
          `${this.props.location.pathname}/${items[item].title}`
        );
        return;
      }
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
    return (
      <>
        <ResourceSectionHeader
          heading="Folders"
          onMouseOver={() => {
            this.setState({ isHoveringTitle: true });
          }}
          onMouseOut={() => {
            this.setState({ isHoveringTitle: false });
          }}
          showDownload={this.isAnySelected()}
          showSelectAll={this.isAnySelected() || this.state.isHoveringTitle}
          onSelectAllClick={() => this.handleSelectAllClick()}
          selectAllIcon={this.isAllSelected() ? faCheckSquare : faSquare}
        />

        <Row style={{ marginTop: "10px" }}>
          {this.props.folderItems.map(({ title, id }) => (
            <Col xs={6} sm={6} md={3} key={id}>
              <FolderCard
                title={title}
                icon={
                  this.isAnySelected() || this.state.isHoveringOver[id]
                    ? this.state.isSelected[id]
                      ? faCheckSquare
                      : faSquare
                    : faFolder
                }
                onIconClick={(e) => {
                  e.stopPropagation();
                  this.handleIconClick(id);
                }}
                onClick={() => this.handleCardClick(id)}
                onMouseOver={() => this.handleMouseOver(id)}
                onMouseOut={() => this.handleMouseOut(id)}
              />
            </Col>
          ))}
        </Row>
      </>
    );
  }
}

export default withRouter(ResourcesFolderView);
