import React from "react";
import styles from "./style.module.scss";

import classNames from "classnames";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ResourceSectionHeader from "../ResourceSectionHeader";
import FileCard from "components/atoms/FileCard";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";

export interface QuickAccessProps {
  quickAccessItems: {
    title: string;
    type: string;
    tags: string[];
    id: number;
  }[];
}

type idBooleanMap = { [key: number]: boolean };
interface MyState {
  isSelected: idBooleanMap;
}

class QuickAccess extends React.Component<QuickAccessProps, MyState> {
  constructor(props: QuickAccessProps) {
    super(props);
    let isSelected: idBooleanMap = [];
    this.state = { isSelected };
  }

  componentDidMount() {
    let isSelected: idBooleanMap = [];
    this.props.quickAccessItems.forEach(({ id }: { id: number }) => {
      isSelected[id] = false;
    });
    this.setState({ isSelected });
  }

  isAnySelected(): boolean {
    let items = this.props.quickAccessItems;
    let isSelected = this.state.isSelected;
    for (let item in items) {
      if (isSelected[items[item].id]) {
        return true;
      }
    }
    return false;
  }

  isAllSelected(): boolean {
    let items = this.props.quickAccessItems;
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
    let items = this.props.quickAccessItems;
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
					heading="Quick Access"
					showDownload={this.isAnySelected()}
          onSelectAllClick={() => this.handleSelectAllClick()}
          selectAllIcon={this.isAllSelected() ? faCheckSquare : faSquare}
        />

        <Row
          className={classNames(
            "d-flex",
            "flex-row",
            "flex-nowrap",
            styles.quickAccessRow
          )}
        >
          {this.props.quickAccessItems.map(({ title, type, tags, id }) => (
            <Col
              xs={7}
              sm={5}
              md={5}
              lg={4}
              xl={3}
              key={id}
              style={{ marginBottom: ".5rem" }}
            >
              <FileCard
                title={title}
                type={type}
                tags={tags}
                icon={
                  this.isAnySelected()
                    ? this.state.isSelected[id]
                      ? faCheckSquare
                      : faSquare
                    : faFile
                }
                onIconClick={() => {
                  this.handleIconClick(id);
                }}
              />
            </Col>
          ))}
        </Row>
      </>
    );
  }
}

export default QuickAccess;
