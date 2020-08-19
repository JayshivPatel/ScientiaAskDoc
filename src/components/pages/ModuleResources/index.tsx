import React from "react";

import { request } from "../../../utils/api";
import { api, methods } from "../../../constants/routes";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

import QuickAccessRow from "components/molecules/QuickAccessRow";
import SearchBox from "components/molecules/SearchBox";
import SelectionView, {
  SelectionProps,
} from "components/molecules/SelectionView";
import CurrentDirectoryRow from "components/molecules/CurrentDirectoryRow";
import FoldersRow from "components/molecules/FoldersRow";

interface Resource {
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

  includeInSearchResult(item: Resource, searchText: string) {
    let rx = /([a-z]+)\(([^)]+)\)/gi;
    let match: RegExpExecArray | null;

    let title = item.title.toLowerCase();
    let tags = item.tags.map((tag) => tag.toLowerCase());
    let type = item.type.toLowerCase();

    while ((match = rx.exec(searchText)) !== null) {
      switch (match[1]) {
        case "type":
          if (type !== match[2]) {
            return false;
          }
          break;
        case "tag":
          let matchSafe = match as RegExpExecArray;
          if (!tags.some((tag) => tag === matchSafe[2])) {
            return false;
          }
          break;
        default:
          break;
      }
    }
    let rest = searchText.replace(rx, "").trim();
    if (tags.some((tag) => tag.indexOf(rest) !== -1)) {
      return false;
    }
    return title.indexOf(rest) !== -1;
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
	
	handleFileClick(id: number){
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

  getResourcesFolderView(scope: any) {
    let folders: { title: string; id: number }[] = Array.from(
      new Set<string>(this.state.resources.map((res: Resource) => res.folder))
    ).map((title: string, id: number) => ({
      title: title,
      id: id,
    }));

    if (this.state.searchText === "" && scope === "" && folders.length > 0) {
      return (
        <SelectionView
          heading="Folders"
					onDownloadClick={() => {}}
					onItemClick={() => {}}
          selectionItems={folders}
          render={(select: SelectionProps) => <FoldersRow select={select} />}
        />
      );
    }
  }

  getCurrentDirectoryView(scope: any) {
    let filesContent: Resource[] = this.state.resources;
    if (scope !== "") {
      filesContent = filesContent.filter(({ folder }) => folder === scope);
    }
    if (this.state.searchText !== "") {
      filesContent = filesContent.filter((item) =>
        this.includeInSearchResult(item, this.state.searchText.toLowerCase())
      );
    }

    if (scope !== "" || this.state.searchText !== "") {
      return (
        <SelectionView
          heading="Files"
					onItemClick={(id) => this.handleFileClick(id)}
          onDownloadClick={(ids) => this.handleFileDownload(ids)}
          selectionItems={filesContent}
          render={(select: SelectionProps) => (
            <CurrentDirectoryRow select={select} />
          )}
        />
      );
    }
  }

  getQuickAccessView(scope: any) {
    let quickAccessItems = this.state.resources.filter(
      ({ tags, folder }) =>
        tags.includes("new") && (scope === "" || scope === folder)
    );

    if (
      this.state.searchText === "" &&
      scope === "" &&
      quickAccessItems.length > 0
    ) {
      return (
        <SelectionView
          heading="Quick Access"
					onItemClick={(id) => this.handleFileClick(id)}
          onDownloadClick={(ids) => this.handleFileDownload(ids)}
          selectionItems={quickAccessItems}
          render={(select: SelectionProps) => (
            <QuickAccessRow select={select} />
          )}
        />
      );
    }
  }

  getloadedItems(pageItems: JSX.Element) {
    if (!this.state.isLoaded) return <>Loading...</>;
    if (this.state.error)
      return <> Error retrieving data: {this.state.error} </>;
    return pageItems;
  }

  render() {
    let scope = this.props.scope || "";
    let pageItems = (
      <>
        {this.getResourcesFolderView(scope)}
        {this.getCurrentDirectoryView(scope)}
        {this.getQuickAccessView(scope)}
      </>
    );

    return (
      <>
        <MyBreadcrumbs />
        <SearchBox
          searchText={this.state.searchText}
          onSearchTextChange={(text) => this.setState({ searchText: text })}
        />
        {this.getloadedItems(pageItems)}
      </>
    );
  }
}

export default ModuleResources;
