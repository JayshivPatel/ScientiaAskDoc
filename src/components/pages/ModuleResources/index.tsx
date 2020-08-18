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
}

class ModuleResources extends React.Component<ResourcesProps, ResourceState> {
  constructor(props: ResourcesProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      resources: [],
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

  render() {
		let scope = this.props.scope === undefined ? "" : this.props.scope;
    let resources = this.state.resources;

    let quickAccessItems = resources.filter(
      ({ tags, folder }) =>
        tags.includes("new") && (scope === "" || scope === folder)
    );

    let currentDirectoryFiles = resources.filter(
      ({ folder }) => folder === scope
    );

    let folders: { title: string; id: number }[] = Array.from(
      new Set<string>(resources.map((res: Resource) => res.folder))
    ).map((title: string) => ({
      title: title,
      id: 0,
    }));

    return (
      <>
        <MyBreadcrumbs />
        <InputGroup>
          <FormControl
            className={styles.searchBar}
            aria-label="Search"
            placeholder="Search..."
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
              {scope === "" && folders.length > 0 ? (
                <ResourcesFolderView folderItems={folders} />
              ) : null}
              {scope !== "" && currentDirectoryFiles.length > 0 ? (
                <CurrentDirectoryView documentItems={currentDirectoryFiles} />
              ) : null}
              {scope === "" && quickAccessItems.length > 0 ? (
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
