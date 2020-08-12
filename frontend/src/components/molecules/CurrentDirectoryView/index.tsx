import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ResourceSectionHeader from "../ResourceSectionHeader";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import FileCard from "components/atoms/FileCard";

export interface CurrentDirectoryViewProps {
  documentItems: {
    title: string;
    type: string;
    tags: string[];
    id: number;
  }[];
}

type idBooleanMap = { [key: number]: boolean };
interface MyState {
  isSelected: idBooleanMap;
  isHoveringOver: idBooleanMap;
  isHoveringTitle: Boolean;
}

class CurrentDirectoryView extends React.Component<CurrentDirectoryViewProps, MyState> {
  constructor(props: CurrentDirectoryViewProps) {
    super(props);
    this.state = { isSelected: [], isHoveringOver: [], isHoveringTitle: false };
  }

  componentDidMount() {
    let isSelected: idBooleanMap = [];
    this.props.documentItems.forEach(({ id }: { id: number }) => {
      isSelected[id] = false;
    });
    this.setState({ isSelected });
  }

  isAnySelected(): boolean {
    let items = this.props.documentItems;
    let isSelected = this.state.isSelected;
    for (let item in items) {
      if (isSelected[items[item].id]) {
        return true;
      }
    }
    return false;
  }

  isAllSelected(): boolean {
    let items = this.props.documentItems;
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
    let items = this.props.documentItems;
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
          heading="Files"
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
          {this.props.documentItems.map(({ title, type, tags, id }) => (
            <Col
              xs={6}
              sm={6}
              md={6}
              lg={4}
              xl={3}
              key={id}
              style={{ marginBottom: ".5rem", marginTop: ".5rem" }}
            >
              <FileCard
                title={title}
                type={type}
                tags={tags}
                icon={
                  this.isAnySelected() || this.state.isHoveringOver[id]
                    ? this.state.isSelected[id]
                      ? faCheckSquare
                      : faSquare
                    : faFile
                }
                onClick={() => this.handleCardClick(id)}
                onIconClick={(e) => {
                  e.stopPropagation();
                  this.handleIconClick(id);
                }}
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

export default CurrentDirectoryView;
