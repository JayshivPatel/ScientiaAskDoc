import React from "react";
import styles from "./style.module.scss";

import classNames from "classnames";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { api, methods } from "../../../constants/routes";
import { request } from "../../../utils/api";
import ResourceSectionHeader from "../ResourceSectionHeader";
import FileCard from "components/atoms/FileCard";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faFileAlt, IconDefinition, faFilePdf, faFileVideo } from "@fortawesome/free-solid-svg-icons";

export interface QuickAccessProps {
  quickAccessItems: {
    title: string;
    type: string;
    tags: string[];
    id: number;
  }[];
  moduleCode?: string;
}

type idBooleanMap = { [key: number]: boolean };
interface MyState {
  isSelected: idBooleanMap;
  isHoveringOver: idBooleanMap;
}

class QuickAccessView extends React.Component<QuickAccessProps, MyState> {
  constructor(props: QuickAccessProps) {
    super(props);
    this.state = { isSelected: [], isHoveringOver: [] };
  }

  componentDidMount() {
    let isSelected: idBooleanMap = [];
    let isHoveringOver: idBooleanMap = [];
    this.props.quickAccessItems.forEach(({ id }: { id: number }) => {
      isSelected[id] = false;
      isHoveringOver[id] = false;
    });
    this.setState({ isSelected, isHoveringOver });
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
    let isHoveringOver = JSON.parse(JSON.stringify(this.state.isHoveringOver));
    isSelected[id] = !isSelected[id];
    isHoveringOver[id] = false;
    this.setState({ isSelected, isHoveringOver });
  }

  handleDownloadClick() {
    const onSuccess = (filename: string, data: any) => {
      // TODO: Try to navigate straight to the endpoint url instead of creating an object url
      data.blob().then((blob: any) => {
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        a.remove();
      });
    };
    // Partial application utility
    const downloadFilename = (filename: string) => {
      return (data: any) => {
        return onSuccess(filename, data);
      };
    };
    const onFailure = (error: { text: () => Promise<any> }) => {
      error.text().then((errorText) => {
        console.log(errorText);
      });
    };

    let indices : number[] = [];
    for (let key in this.state.isSelected) {
      if (this.state.isSelected[key]) {
        indices.push(parseInt(key));
      }
    }

    if (indices.length === 1) {
      // Only one file to download, call single file endpoint
      let filename = this.props.quickAccessItems.filter(document => document.id === indices[0])[0].title;
      request(api.MATERIALS_RESOURCES_FILE(indices[0]), methods.GET, downloadFilename(filename), onFailure);
    } else {
      // Multiple files to download, call zipped selection endpoint
      request(api.MATERIALS_ZIPPED_SELECTION, methods.GET, downloadFilename("materials.zip"), onFailure, {
        ids: indices,
        course: this.props.moduleCode,
      });
    }
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

  handleCardClick(id: number) {
		if (this.isAnySelected()) {
			this.handleIconClick(id);
			return;
		}
		
    const onSuccess = (data: any) => {
      // TODO: Try to navigate straight to the endpoint url instead of creating an object url
      data.blob().then((blob: any) => {
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.target = "_blank";
        a.href = url;
        a.click();
        a.remove();
      });
    };
    const onFailure = (error: { text: () => Promise<any> }) => {
      error.text().then((errorText) => {
        console.log(errorText);
      });
		};
    request(api.MATERIALS_RESOURCES_FILE(id), methods.GET, onSuccess, onFailure);
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
          heading="Quick Access"
          onDownloadClick={() => this.handleDownloadClick()}
          showDownload={this.isAnySelected()}
          onSelectAllClick={() => this.handleSelectAllClick()}
          selectAllIcon={this.isAllSelected() ? faCheckSquare : faSquare}
          checkBoxColur={this.isAnySelected() ? "#495057" : "#dee2e6"}
        />

        <Row
          className={classNames(
            "d-flex",
            "flex-row",
            "flex-nowrap",
            styles.quickAccessRow
          )}
        >
          {this.props.quickAccessItems.map(({ title, type, tags, id }) => {
            let normalIcon: IconDefinition;
            switch (type) {
              case "pdf":
                normalIcon = faFilePdf;
                break;
              case "video":
                normalIcon = faFileVideo;
                break;
              default:
                normalIcon = faFileAlt;
                break;
            }
            return (
              <Col
                xs={7}
                sm={5}
                md={5}
                lg={4}
                xl={3}
                key={id}
                style={{ marginBottom: ".5rem", marginTop: ".5rem", paddingLeft: "10px", paddingRight: "10px" }}
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
                      : normalIcon
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
            );
          })}
        </Row>
      </>
    );
  }
}

export default QuickAccessView;
