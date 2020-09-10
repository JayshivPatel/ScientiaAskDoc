import React from "react";

import { request, download } from "utils/api";
import { api, methods } from "constants/routes";
import SearchBox from "components/molecules/SearchBox";
import QuickAccessView from "./components/QuickAccessView";
import CurrentDirectoryView from "./components/CurrentDirectoryView";
import FoldersView from "./components/FoldersView";
import ListView from "./components/ListView";
import queryString from "query-string";
import StaffView from "./components/StaffView";

import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import LoadingScreen from "components/molecules/LoadingScreen";
import { openResource, tags, folders } from "./utils";
import { Resource } from "constants/types";
import { titleCase } from "utils/functions";
import Button from "react-bootstrap/esm/Button";

export interface ResourcesProps {
  year: string;
  moduleID: string;
  scope?: string;
  view: string;
  can_manage: boolean;
}

export interface ResourceState {
  error: any;
  isLoaded: Boolean;
  staffView: boolean;
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
      staffView: this.props.can_manage,
      resources: [],
      searchText: "",
    };
  }

  loadResources() {
    this.setState({ isLoaded: false });
    const onSuccess = (data: { [k: string]: any }) => {
      let resourceArr: Resource[] = [];
      for (const key in data) {
        let resource = data[key];

        let resourceURL = queryString.parseUrl(resource.path);
        let extension = resource.path.substr(
          resource.path.lastIndexOf(".") + 1
        );
        let thumbnail = undefined;
        let altType = undefined;
        if (
          resourceURL.url ===
          "https://imperial.cloud.panopto.eu/Panopto/Pages/Viewer.aspx"
        ) {
          altType = "video";
          thumbnail = `https://imperial.cloud.panopto.eu/Panopto/Services/FrameGrabber.svc/FrameRedirect?objectId=${resourceURL.query.id}&mode=Delivery`;
        } else if (extension === "pdf") {
          altType = "pdf";
        }
        resourceArr.push({
          title: resource.title,
          type: altType || resource.type,
          tags: resource.tags,
          downloads: resource.downloads,
          folder: resource.category,
          thumbnail: thumbnail,
          id: resource.id,
          path: resource.path,
          index: resource.index,
          visible_after: new Date(resource.visible_after),
        } as Resource);
      }

      resourceArr = resourceArr.sort((a, b) => (a.index > b.index ? 1 : -1));
      if (resourceArr.length === 0) {
        this.setState({
          error:
            this.props.view === "staff"
              ? undefined
              : "No resource has been uploaded. ",
        });
      }
      this.setState({ resources: resourceArr, isLoaded: true });
    };

    const onError = (message: string) => {
      this.setState({ error: message, isLoaded: true });
    };

    request({
      url: api.MATERIALS_RESOURCES,
      method: methods.GET,
      onSuccess,
      onError,
      body: {
        year: this.props.year,
        course: this.moduleCode,
      },
    });
  }

  componentDidMount() {
    this.loadResources();
  }

  componentDidUpdate(prevProps: ResourcesProps) {
    if (prevProps.year !== this.props.year) {
      this.loadResources();
    }
  }

  handleFileDownload(indices: number[]) {
    if (indices.length === 1) {
      // Only one file to download, call single file endpoint
      let filename = this.state.resources.filter(
        (document) => document.id === indices[0]
      )[0].title;
      download(api.MATERIALS_RESOURCES_FILE(indices[0]), filename);
    } else {
      // Multiple files to download, call zipped selection endpoint
      download(api.MATERIALS_ZIPPED_SELECTION, "materials.zip", {
        ids: indices,
        course: this.moduleCode,
        year: this.props.year,
      });
    }
  }

  handleFolderDownload(ids: number[]) {
    let categories = folders(this.state.resources)
      .filter((folder) => folder.id in ids)
      .map((folder) => folder.title);
    if (categories.length === 1) {
      this.handleSectionDownload(categories[0]);
    } else {
      // No endpoint for multiple category download, reuse zipped selection instead
      let resourceIds = this.state.resources
        .filter((resource) => resource.folder in categories)
        .map((resource) => resource.id);
      this.handleFileDownload(resourceIds);
    }
  }

  handleSectionDownload(category: string) {
    download(api.MATERIALS_ZIPPED, category + ".zip", {
      year: this.props.year,
      course: this.moduleCode,
      category: category,
    });
  }

  includeInSearchResult(item: Resource, searchText: string) {
    const rx = /([a-z]+)\(([^)]+)\)/gi;
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
    return (
      tags.some((tag) => tag.indexOf(rest) !== -1) || title.indexOf(rest) !== -1
    );
  }

  getSearchPrompts() {
    const typesList = [
      { name: "PDF", value: "type(pdf)" },
      { name: "Video", value: "type(video)" },
      { name: "File", value: "type(file)" },
      { name: "Link", value: "type(link)" },
    ];
    let tagsList = [
      { name: "New", value: "tag(new)" },
      { name: "Week 1", value: "tag(week 1)" },
    ];
    const prompts = [
      { title: "Types", list: typesList },
      { title: "Tags", list: tagsList },
    ];

    tags(this.state.resources)
      .filter((tag) => tag.toLowerCase() !== "new")
      .filter((tag) => !tag.toLowerCase().startsWith("week"))
      .forEach((tag) => {
        tagsList.push({ name: titleCase(tag), value: `tag(${tag})` });
      });

    return prompts;
  }

  handleResourceClick(id: number) {
    openResource(this.state.resources, id);
  }

  render() {
    let scope = this.props.scope || "";

    const view = () => {
      if (this.state.staffView) {
        return (
          <StaffView
            year={this.props.year}
            course={this.moduleCode}
            folders={folders(this.state.resources)}
            reload={() => this.loadResources()}
            resources={this.state.resources}
            searchText={this.state.searchText}
            includeInSearchResult={this.includeInSearchResult}
            onRowClick={(id) => this.handleResourceClick(id)}
          />
        );
      }
      switch (this.props.view) {
        case "card":
          return (
            <>
              <FoldersView
                folders={folders(this.state.resources)}
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
        default:
          return (
            <ListView
              folders={folders(this.state.resources)}
              resources={this.state.resources}
              searchText={this.state.searchText}
              onDownloadClick={(ids) => this.handleFileDownload(ids)}
              onSectionDownloadClick={(category) =>
                this.handleSectionDownload(category)
              }
              onItemClick={(id) => this.handleResourceClick(id)}
              includeInSearchResult={this.includeInSearchResult}
            />
          );
      }
    };

    return (
      <>
        <MyBreadcrumbs />

        {this.props.can_manage &&
        <Button onClick={() => this.setState({ staffView: !this.state.staffView})} block>
          Switch View
        </Button>}

        <SearchBox
          searchText={this.state.searchText}
          onSearchTextChange={(text) => this.setState({ searchText: text })}
          prompts={this.getSearchPrompts()}
        />

        <LoadingScreen
          error={this.state.error}
          isLoaded={this.state.isLoaded}
          successful={view()}
        />
      </>
    );
  }
}

export default ModuleResources;
