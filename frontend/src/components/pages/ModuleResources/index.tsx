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

const ModuleResources: React.FC = () => {
  let folderItems = [
    {
      title: "Slides",
      id: 0,
    },
    {
      title: "Logic Exercise",
      id: 2,
    },
    {
      title: "Pandor Lab",
      id: 3,
    },
    {
      title: "Extra",
      id: 4,
    },
	];
	
	let ResourceItems = [
    {
			title: "Syntax Semantics Propositional Logic",
			type: "File",
			tags:["new", "Week 1"],
      id: 0,
		},
		{
			title: "Classical First-Order Predicate Logic",
			type: "File",
			tags:["new", "Week 2"],
      id: 1,
		},
		{
			title: "Translation Validity",
			type: "Link",
			tags:["new", "Week 2"],
      id: 2,
		},
		{
			title: "validityPL-part1",
			type: "Panopto",
			tags:["new"],
      id: 3,
		},
		{
			title: "validityPL-part2",
			type: "Link",
			tags:["Week 2"],
      id: 4,
		},
		{
			title: "validityPL-part3",
			type: "File",
			tags:["Week 3"],
      id: 5,
		},
		{
			title: "validityPL-part3",
			type: "File",
			tags:["Week 3"],
      id: 6,
		},
		{
			title: "validityFOL-part2",
			type: "File",
			tags:["Week 3"],
      id: 7,
		},
				{
			title: "Logic Exercise 1",
			type: "File",
			tags:["Week 3"],
      id: 8,
		},
		{
			title: "Logic Exercise 2",
			type: "File",
			tags:["Week 3"],
      id: 9,
		},
		{
			title: "Logic Exercise 3",
			type: "File",
			tags:["Week 3"],
      id: 10,
		},
		{
			title: "Pandor Lab",
			type: "File",
			tags:["Week 3"],
      id: 11,
		},
		{
			title: "Propositional Logic Exercises",
			type: "File",
			tags:["Week 3"],
      id: 12,
		},
		{
			title: "Extra Logic Exercises",
			type: "File",
			tags:["Week 3"],
      id: 13,
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

      <QuickAccessView quickAccessItems={ResourceItems}/>
      <ResourcesFolderView folderItems={folderItems}/>
    </>
  );
};

export default ModuleResources;