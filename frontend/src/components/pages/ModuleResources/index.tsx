import React from "react";
import styles from "./style.module.scss";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import QuickAccess from "components/molecules/QuickAccess";
import ResourceFolders from "components/molecules/ResourceFolders";

const ModuleResources: React.FC = () => {
  let folderItems = [
    {
      title: "Lecture Materials",
      id: 0,
    },
    {
      title: "Panopto Videos",
      id: 1,
    },
    {
      title: "Tutorial Sheets",
      id: 2,
    },
    {
      title: "Code",
      id: 3,
    },
    {
      title: "Useful Links",
      id: 4,
    },
    {
      title: "Other",
      id: 5,
    },
	];
	
	let quickAccessItems = [
    {
			title: "Notes 1",
			type: "File",
			tags:["new", "Week 1"],
      id: 0,
		},
		{
			title: "Slides 1 - 1UP",
			type: "File",
			tags:["new", "Week 2"],
      id: 1,
		},
		{
			title: "Circuit simulator",
			type: "Link",
			tags:["new", "Week 2"],
      id: 2,
		},
		{
			title: "C - Lecture 1",
			type: "Panopto",
			tags:["new"],
      id: 3,
		},
		{
			title: "Translation Validity",
			type: "Link",
			tags:["Week 2"],
      id: 4,
		},
		{
			title: "Revision Exercises",
			type: "File",
			tags:["Week 3"],
      id: 5,
		},
	]

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
          <Button className={styles.searchBarIcon}>
            <FontAwesomeIcon size="1x" icon={faInfoCircle} />
          </Button>
        </InputGroup.Append>
      </InputGroup>

      <QuickAccess quickAccessItems={quickAccessItems}/>
      <ResourceFolders folderItems={folderItems}/>
    </>
  );
};

export default ModuleResources;
