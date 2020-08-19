import React from "react";

import { request } from "../../../utils/api";
import { api } from "../../../constants/routes";
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
    let moduleCode = this.props.moduleID.startsWith("CO")
      ? this.props.moduleID.slice(2)
      : this.props.moduleID;
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

    request(api.MATERIALS_RESOURCES, "GET", onSuccess, onFailure, {
      year: this.props.year,
      course: moduleCode,
    });
  }

  handleSearchTextChange(searchText: string) {
    this.setState({ searchText: searchText });
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
    for (let i in tags) {
      if (tags[i].indexOf(rest) !== -1) {
        return true;
      }
    }
    return title.indexOf(rest) !== -1;
  }

  render() {
    let scope = this.props.scope || "";
    let resources = this.state.resources;

    let quickAccessItems = resources.filter(
      ({ tags, folder }) =>
        tags.includes("new") && (scope === "" || scope === folder)
    );

    let filesContent: Resource[] = resources;
    if (scope !== "") {
      filesContent = filesContent.filter(({ folder }) => folder === scope);
    }
    if (this.state.searchText !== "") {
      filesContent = filesContent.filter((item) =>
        this.includeInSearchResult(item, this.state.searchText.toLowerCase())
      );
    }

    let folders: { title: string; id: number }[] = Array.from(
      new Set<string>(resources.map((res: Resource) => res.folder))
    ).map((title: string, id: number) => ({
      title: title,
      id: id,
    }));

    return (
      <>
        <MyBreadcrumbs />
        <SearchBox
          searchText={this.state.searchText}
          onSearchTextChange={(text) => this.handleSearchTextChange(text)}
        />
        {this.state.isLoaded ? (
          this.state.error ? (
            <> Error retrieving data: {this.state.error} </>
          ) : (
            <>
              {this.state.searchText === "" &&
              scope === "" &&
              folders.length > 0 ? (
                <ResourcesFolderView folderItems={folders} />
              ) : null}
              {scope !== "" || this.state.searchText !== "" ? (
                <CurrentDirectoryView documentItems={filesContent} />
              ) : null}
              {this.state.searchText === "" &&
              scope === "" &&
              quickAccessItems.length > 0 ? (
                <QuickAccessView quickAccessItems={quickAccessItems} />
              ) : null}
            </>
          )
        ) : (
          <>Loading...</>
        )}
      </>
    );
  }
}

export default ModuleResources;
