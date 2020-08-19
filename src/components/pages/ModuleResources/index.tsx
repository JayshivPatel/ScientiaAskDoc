import React from "react";

import { request } from "../../../utils/api";
import { api, methods } from "../../../constants/routes";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import SearchBox from "components/molecules/SearchBox";
import QuickAccessView from "./components/QuickAccessView";
import CurrentDirectoryView from "./components/CurrentDirectoryView";
import FoldersView from "./components/FoldersView";

export interface Resource {
  title: string;
  type: string;
  tags: string[];
  folder: string;
  id: number;
}

export interface ResourcesProps {
  year: string;
  moduleID: string;
  scope?: string;
}

export interface ResourceState {
  error: any;
  isLoaded: Boolean;
  resources: Resource[];
  searchText: string;
}

class ModuleResources extends React.Component<ResourcesProps, ResourceState> {
  moduleCode = this.props.moduleID.startsWith("CO")
    ? this.props.moduleID.slice(2)
    : this.props.moduleID;

  constructor(props: ResourcesProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      resources: [],
      searchText: "",
    };
  }

  componentDidMount() {
    this.setState({ isLoaded: false });
    const onSuccess = (data: { json: () => Promise<any> }) => {
      let resourceArr: Resource[] = [];

      data.json().then((json) => {
        for (const key in json) {
          let resource = json[key];
          resourceArr.push({
            title: resource.title,
            type: resource.type,
            tags: resource.tags,
            folder: resource.category,
            id: resource.id,
          } as Resource);
        }
        this.setState({ resources: resourceArr, isLoaded: true });
      });
    };
    const onFailure = (error: { text: () => Promise<any> }) => {
      error.text().then((errorText) => {
        this.setState({ error: errorText, isLoaded: true });
      });
    };

    request(api.MATERIALS_RESOURCES, methods.GET, onSuccess, onFailure, {
      year: this.props.year,
      course: this.moduleCode,
    });
  }

  handleFileDownload(indices: number[]) {
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

    if (indices.length === 1) {
      // Only one file to download, call single file endpoint
      let filename = this.state.resources.filter(
        (document) => document.id === indices[0]
      )[0].title;
      request(
        api.MATERIALS_RESOURCES_FILE(indices[0]),
        methods.GET,
        downloadFilename(filename),
        onFailure
      );
    } else {
      // Multiple files to download, call zipped selection endpoint
      request(
        api.MATERIALS_ZIPPED_SELECTION,
        methods.GET,
        downloadFilename("materials.zip"),
        onFailure,
        {
          ids: indices,
          course: this.moduleCode,
        }
      );
    }
  }

  handleFileClick(id: number) {
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
    request(
      api.MATERIALS_RESOURCES_FILE(id),
      methods.GET,
      onSuccess,
      onFailure
    );
  }

  getloadedItems() {
    if (!this.state.isLoaded) return <>Loading...</>;
    if (this.state.error)
      return <> Error retrieving data: {this.state.error} </>;
    return null;
  }

  render() {
    let scope = this.props.scope || "";
    return (
      <>
        <MyBreadcrumbs />
        <SearchBox
          searchText={this.state.searchText}
          onSearchTextChange={(text) => this.setState({ searchText: text })}
        />
        {this.getloadedItems() || (
          <>
            <FoldersView
              resources={this.state.resources}
              scope={scope}
              searchText={this.state.searchText}
            />

            <CurrentDirectoryView
              resources={this.state.resources}
              scope={scope}
              searchText={this.state.searchText}
              onDownloadClick={(ids) => this.handleFileDownload(ids)}
              onItemClick={(id) => this.handleFileClick(id)}
            />

            <QuickAccessView
              resources={this.state.resources}
              scope={scope}
              searchText={this.state.searchText}
              onDownloadClick={(ids) => this.handleFileDownload(ids)}
              onItemClick={(id) => this.handleFileClick(id)}
            />
          </>
        )}
      </>
    );
  }
}

export default ModuleResources;
