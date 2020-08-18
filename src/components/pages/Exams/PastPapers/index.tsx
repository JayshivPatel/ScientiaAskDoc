import React from "react";
import styles from "./style.module.scss";

import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import QuickAccessView from "components/molecules/QuickAccessView";
import ResourcesFolderView from "components/molecules/ResourcesFolderView";
import CurrentDirectoryView from "components/molecules/CurrentDirectoryView";

class ExamPastPapers extends React.Component<{}, {}> {
  render() {
		let scope = ""
    let resources = resourceItems;

    let quickAccessItems = resources.filter(
      ({ tags, folder }) =>
        tags.includes("new") && (scope === "" || scope === folder)
    );

    let currentDirectoryFiles = resources.filter(
      ({ folder }) => folder === scope
    );

    let folders: { title: string; id: number }[] = Array.from(
      new Set<string>(resources.map((res) => res.folder))
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
          />
          <InputGroup.Append>
            <Button variant="secondary" className={styles.searchBarIcon}>
              <FontAwesomeIcon size="1x" icon={faInfoCircle} />
            </Button>
          </InputGroup.Append>
        </InputGroup>
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
      </>
    );
  }
}

export default ExamPastPapers;

let resourceItems = [
	{
    title: "C304: Logic-Based Learning",
    type: "pdf",
    tags: ["new", "Summer"],
    folder: "2018 - 2019",
    id: 14,
	},
	{
    title: "C316: Computer Vision",
    type: "pdf",
    tags: ["new", "Summer"],
    folder: "2017 - 2018",
    id: 8,
  },
  {
    title: "C317: Graphics",
    type: "pdf",
    tags: ["new", "Summer"],
    folder: "2016 - 2017",
    id: 9,
  },
];
