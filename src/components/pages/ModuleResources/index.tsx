import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { request, download } from "../../../utils/api";
import { api, methods } from "../../../constants/routes";
import SearchBox from "components/molecules/SearchBox";
import QuickAccessView from "./components/QuickAccessView";
import CurrentDirectoryView from "./components/CurrentDirectoryView";
import FoldersView from "./components/FoldersView";
import ListView from "./components/ListView";
import {
  faFileAlt,
  faFilePdf,
  faFileVideo,
  faLink,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

export interface Resource {
  title: string;
  type: string;
  tags: string[];
  folder: string;
  id: number;
  path?: string;
}

export interface Folder {
  title: string;
  id: number;
}

export interface ResourcesProps {
  year: string;
  moduleID: string;
	scope?: string;
	view: string;
}

export interface ResourceState {
  error: any;
  isLoaded: Boolean;
  resources: Resource[];
  searchText: string;
}

export function resourceTypeToIcon(type: string): IconDefinition {
  switch (type) {
    case "pdf":
      return faFilePdf;
    case "video":
      return faFileVideo;
    case "link":
      return faLink;
    default:
      return faFileAlt;
  }
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
      searchText: ""
    };
  }

  componentDidMount() {
    this.setState({ isLoaded: false });
    const onSuccess = (data: { json: () => Promise<any> }) => {
      let resourceArr: Resource[] = [];

      data.json().then(json => {
        for (const key in json) {
          let resource = json[key];
          resourceArr.push({
            title: resource.title,
            type: resource.type,
            tags: resource.tags,
            folder: resource.category,
            id: resource.id,
            path: resource.path,
          } as Resource);
        }
        this.setState({ resources: resourceArr, isLoaded: true });
      });
    };
    const onFailure = (error: { text: () => Promise<any> }) => {
      error.text().then(errorText => {
        this.setState({ error: errorText, isLoaded: true });
      });
    };

    request(api.MATERIALS_RESOURCES, methods.GET, onSuccess, onFailure, {
      year: this.props.year,
      course: this.moduleCode
    });
  }

  // Gets the unique categories/folders that have been assigned for the resources
  folders(): Folder[] {
    return Array.from(new Set<string>(
      this.state.resources.map((res: Resource) => res.folder))
    ).map((title, id) => ({ title: title, id: id }));
  }

  handleFileDownload(indices: number[]) {
    if (indices.length === 1) {
      // Only one file to download, call single file endpoint
      let filename = this.state.resources.filter(
        document => document.id === indices[0]
      )[0].title;
      download(api.MATERIALS_RESOURCES_FILE(indices[0]), methods.GET, filename);
    } else {
      // Multiple files to download, call zipped selection endpoint
      download(api.MATERIALS_ZIPPED_SELECTION, methods.GET, "materials.zip", {
        ids: indices,
        course: this.moduleCode,
        year: this.props.year
      });
    }
  }

  handleFolderDownload(ids: number[]) {
    let categories = this.folders().filter(folder => folder.id in ids)
      .map(folder => folder.title);
    if (categories.length === 1) {
      this.handleSectionDownload(categories[0]);
    } else {
      // No endpoint for multiple category download, reuse zipped selection instead
      let resourceIds = this.state.resources
        .filter(resource => resource.folder in categories)
        .map(resource => resource.id);
      this.handleFileDownload(resourceIds);
    }
  }

  handleSectionDownload(category: string) {
    download(api.MATERIALS_ZIPPED, methods.GET, category + ".zip", {
      year: this.props.year,
      course: this.moduleCode,
      category: category
    });
  }

  handleResourceClick(id: number) {
    let resource = this.state.resources.find(resource => resource.id === id);
    if (resource === undefined) {
      return;
    }
    if (resource.type === "link") {
      window.open(resource.path, "_blank");
      return;
    }

    // Resource is of file type, get from Materials
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
      error.text().then(errorText => {
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

  includeInSearchResult(item: Resource, searchText: string) {
    let rx = /([a-z]+)\(([^)]+)\)/gi;
    let match: RegExpExecArray | null;
    let title = item.title.toLowerCase();
    let tags = item.tags.map(tag => tag.toLowerCase());
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
          if (!tags.some(tag => tag === matchSafe[2])) {
            return false;
          }
          break;
        default:
          break;
      }
    }
    let rest = searchText.replace(rx, "").trim();
    if (tags.some(tag => tag.indexOf(rest) !== -1)) {
      return true;
    }
    return title.indexOf(rest) !== -1;
  }

  getloadedItems() {
    if (!this.state.isLoaded)
      return (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <Spinner animation="border" />
        </div>
      );
    if (this.state.error)
      return <> Error retrieving data: {this.state.error} </>;
    return null;
  }


  render() {
    let scope = this.props.scope || "";

    const view = () => {
      switch(this.props.view) {
        case "card": return (
          <>
            <FoldersView
              folders={this.folders()}
              scope={scope}
              searchText={this.state.searchText}
              handleFolderDownload={(ids) => this.handleFolderDownload(ids)}
            />

            <CurrentDirectoryView
              resources={this.state.resources}
              scope={scope}
              searchText={this.state.searchText}
              onDownloadClick={(ids) => this.handleFileDownload(ids)}
              onItemClick={(id) => this.handleResourceClick(id)}
              includeInSearchResult={this.includeInSearchResult}
            />

            <QuickAccessView
              resources={this.state.resources}
              scope={scope}
              searchText={this.state.searchText}
              onDownloadClick={(ids) => this.handleFileDownload(ids)}
              onItemClick={(id) => this.handleResourceClick(id)}
            />
          </>
        );
        case "list": return (
          <>
            <ListView
              folders={this.folders()}
              resources={this.state.resources}
              searchText={this.state.searchText}
              onDownloadClick={(ids) => this.handleFileDownload(ids)}
              onSectionDownloadClick={(category) => this.handleSectionDownload(category)}
              onItemClick={(id) => this.handleResourceClick(id)}
              includeInSearchResult={this.includeInSearchResult}
            />
          </>
        );
      }
    };
    return (
      <>
			<MyBreadcrumbs />
        <SearchBox
          searchText={this.state.searchText}
          onSearchTextChange={text => this.setState({ searchText: text })}
        />
        {this.getloadedItems() || view()}
      </>
    );
  }
}

export default ModuleResources;
