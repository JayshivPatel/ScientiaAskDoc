import React from "react";
import styles from "./style.module.scss";

import { request } from "../../../utils/api";
import { api } from "../../../constants/routes";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import QuickAccessView from "components/molecules/QuickAccessView";
import ResourcesFolderView from "components/molecules/ResourcesFolderView";
import CurrentDirectoryView from "components/molecules/CurrentDirectoryView";

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
        console.log(`data: ${data}`);
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

    let searchText = this.state.searchText.toLowerCase();
    if (searchText !== "") {
      filesContent = filesContent.filter((item) => {
        let rx = /([a-z]+)\(([^)]+)\)/gi;
        let match: RegExpExecArray | null;

        let title = item.title.toLowerCase();
        let tags = item.tags.map((tag) => tag.toLowerCase());
        let folder = item.folder.toLowerCase();

        while ((match = rx.exec(searchText)) !== null) {
          switch (match[1]) {
            case "folder":
              if (folder !== match[2]) {
                return false;
              }
              break;
            case "tag":
              if (!tags.some((tag) => match !== null && tag === match[2])) {
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
      });
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
        <InputGroup>
          <FormControl
            className={styles.searchBar}
            aria-label="Search"
            placeholder="Search..."
            value={this.state.searchText}
            onChange={(e) => this.handleSearchTextChange(e.target.value)}
          />
          <InputGroup.Append>
            <Button variant="secondary" className={styles.searchBarIcon}>
              <FontAwesomeIcon size="1x" icon={faInfoCircle} />
            </Button>
          </InputGroup.Append>
        </InputGroup>
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
