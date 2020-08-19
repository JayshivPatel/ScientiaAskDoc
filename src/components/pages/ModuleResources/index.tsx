import React from "react";

import { request } from "../../../utils/api";
import { api, methods } from "../../../constants/routes";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

import QuickAccessView from "components/molecules/QuickAccessView";
import ResourcesFolderView from "components/molecules/ResourcesFolderView";
import CurrentDirectoryView from "components/molecules/CurrentDirectoryView";
import SearchBox from "components/molecules/SearchBox";

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

  getResourcesFolderView(scope: any) {
    let folders: { title: string; id: number }[] = Array.from(
      new Set<string>(this.state.resources.map((res: Resource) => res.folder))
    ).map((title: string, id: number) => ({
      title: title,
      id: id,
    }));

    if (this.state.searchText === "" && scope === "" && folders.length > 0) {
      return <ResourcesFolderView folderItems={folders} />;
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
        <CurrentDirectoryView
          documentItems={filesContent}
          moduleCode={this.moduleCode}
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
        <QuickAccessView
          quickAccessItems={quickAccessItems}
          moduleCode={this.moduleCode}
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
