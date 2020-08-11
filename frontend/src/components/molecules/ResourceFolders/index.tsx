import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ResourceSectionHeader from "../ResourceSectionHeader";
import FolderCard from "components/atoms/FolderCard";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
export interface ResourceFoldersProps {
  folderItems: {
    title: string;
    id: number;
  }[];
}

type idBooleanMap = { [key: number]: boolean };
interface MyState {
  isSelected: idBooleanMap;
}

class ResourceFolders extends React.Component<ResourceFoldersProps, MyState> {
  constructor(props: ResourceFoldersProps) {
    super(props);
    let isSelected: idBooleanMap = [];
    this.state = { isSelected };
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
    isSelected[id] = !isSelected[id];
    this.setState({ isSelected });
  }

  handleSelectAllClick() {
    let items = this.props.folderItems;
    let isSelected = JSON.parse(JSON.stringify(this.state.isSelected));
    let setValue = !this.isAllSelected();
    for (let item in items) {
      isSelected[items[item].id] = setValue;
    }
    this.setState({ isSelected });
  }

  render() {
    return (
      <>
        <ResourceSectionHeader
					heading="Folders"
					showDownload={this.isAnySelected()}
          onSelectAllClick={() => this.handleSelectAllClick()}
          selectAllIcon={this.isAllSelected() ? faCheckSquare : faSquare}
        />

        <Row style={{ marginTop: "10px" }}>
          {this.props.folderItems.map(({ title, id }) => (
            <Col xs={6} sm={6} md={3} key={id}>
              <FolderCard
                title={title}
                icon={
                  this.isAnySelected()
                    ? this.state.isSelected[id]
                      ? faCheckSquare
                      : faSquare
                    : faFolder
                }
                onIconClick={() => this.handleIconClick(id)}
              />
            </Col>
          ))}
        </Row>
      </>
    );
  }
}

export default ResourceFolders;
