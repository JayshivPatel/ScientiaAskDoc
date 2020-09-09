import React from "react";
import SearchBox from "components/molecules/SearchBox";
import QuickAccessView from "./components/QuickAccessView";
import CurrentDirectoryView from "./components/CurrentDirectoryView";
import FoldersView from "./components/FoldersView";

import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import LoadingScreen from "components/molecules/LoadingScreen";
import { BasicResource, Folder } from "constants/types";

export interface ResourcesProps {
  scope?: string;
  view: string;
}

export interface ResourceState {
  error: any;
  isLoaded: Boolean;
  resources: BasicResource[];
  searchText: string;
  folders: Folder[];
}

class PastPapers extends React.Component<ResourcesProps, ResourceState> {
  constructor(props: ResourcesProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      resources: [],
      folders: [],
      searchText: "",
    };
  }

  loadResources() {
    fetch("/jsons/folders.json")
      .then((response) => response.json())
      .then((f) => {
        f.forEach((folder: Folder) => this.loadFromFolder(folder.title));
        this.setState({ folders: f, isLoaded: true });
      })
      .catch((error) => {
        this.setState({ error: error, isLoaded: true });
      });
  }

  loadFromFolder(title: string) {
    fetch(`/jsons/${title.trim()}.json`)
      .then((response) => response.json())
      .then((r) => {
        const resource = this.state.resources.slice();
        this.setState({ resources: resource.concat(r) });
      })
      .catch((error) => {
        this.setState({ error: title + error });
      });
  }

  componentDidMount() {
    this.loadResources();
  }

  handleFileDownload(indices: number[]) {}

  includeInSearchResult(item: BasicResource, searchText: string) {
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

    return prompts;
  }

  handleResourceClick(id: number) {}

  render() {
    let scope = this.props.scope || "";

    const view = () => {
      switch (this.props.view) {
        default:
          return (
            <>
              <FoldersView
                folders={this.state.folders}
                scope={scope}
                searchText={this.state.searchText}
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
      }
    };

    return (
      <>
        <MyBreadcrumbs />
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

export default PastPapers;
