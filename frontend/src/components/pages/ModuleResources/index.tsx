import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import { request } from "../../../utils/api"
import { api } from "../../../constants/routes"
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import QuickAccessView from "components/molecules/QuickAccessView";
import ResourcesFolderView from "components/molecules/ResourcesFolderView";
import CurrentDirectoryView from "components/molecules/CurrentDirectoryView";
import { useParams } from "react-router-dom";

const ModuleResources: React.FC<{ year: string}> = ({year}) => {
  let {id, scope } = useParams();
  scope = scope === undefined ? "" : scope;

  const quickAccessItems = resourceItems.filter(
    ({ tags, folder }) =>
      tags.includes("new") && (scope === "" || scope === folder)
  );

  const currentDirectoryFiles = resourceItems.filter(
    ({ folder }) => folder === scope
	);
	
	const module_code = id.startsWith("CO") ? id : id.slice(2);

	//maybe refactor into class?
	const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    setIsLoaded(false);
    const onSuccess = (data: any) => {
      setIsLoaded(true);
      setResources(data.json());
    }
    const onFailure = (error: any) => {
      setIsLoaded(true);
      setError(error);
    }

    request(api.MATERIALS_RESOURCES, "GET", onSuccess, onFailure, {
      "year": year,
      "course": module_code
    })
  }, [year, module_code]);

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

      
			{quickAccessItems.length > 0 ? <QuickAccessView quickAccessItems={quickAccessItems} /> : null}
      {scope === "" && folderItems.length > 0 ? <ResourcesFolderView folderItems={folderItems} /> : null}
      {currentDirectoryFiles.length > 0 ? <CurrentDirectoryView documentItems={currentDirectoryFiles} /> : null}
    </>
  );
};

export default ModuleResources;

let folderItems = [
  {
    title: "Lecture Notes",
    id: 0,
  },
  {
    title: "Logic Exercise",
    id: 1,
  },
  {
    title: "Pandor Lab",
    id: 2,
  },
  {
    title: "Extra",
    id: 3,
  },
];

let resourceItems = [
  {
    title: "Syntax Semantics Propositional Logic",
    type: "File",
    tags: ["Slides"],
    folder: "Lecture Notes",
    id: 0,
  },
  {
    title: "Classical First-Order Predicate Logic",
    type: "File",
    tags: ["Slides"],
    folder: "Lecture Notes",
    id: 1,
  },
  {
    title: "Translation Validity",
    type: "File",
    tags: ["new", "Slides"],
    folder: "Lecture Notes",
    id: 2,
  },
  {
    title: "validityPL-part1",
    type: "File",
    tags: ["Slides"],
    folder: "Lecture Notes",
    id: 3,
  },
  {
    title: "validityPL-part2",
    type: "File",
    tags: ["Slides"],
    folder: "Lecture Notes",
    id: 4,
  },
  {
    title: "validityPL-part3",
    type: "File",
    tags: ["new", "Slides"],
    folder: "Lecture Notes",
    id: 5,
  },
  {
    title: "validityFOL-part1",
    type: "File",
    tags: ["Slides"],
    folder: "Lecture Notes",
    id: 6,
  },
  {
    title: "validityFOL-part2",
    type: "File",
    tags: ["new", "Slides"],
    folder: "Lecture Notes",
    id: 7,
  },
  {
    title: "Logic Exercise 1",
    type: "File",
    tags: ["Week 1"],
    folder: "Logic Exercise",
    id: 8,
  },
  {
    title: "Logic Exercise 2",
    type: "File",
    tags: ["Week 2"],
    folder: "Logic Exercise",
    id: 9,
  },
  {
    title: "Logic Exercise 3",
    type: "File",
    tags: ["new", "Week 3"],
    folder: "Logic Exercise",
    id: 10,
  },
  {
    title: "Pandor Lab",
    type: "File",
    tags: [],
    folder: "Pandor Lab",
    id: 11,
  },
  {
    title: "Propositional Logic Exercises",
    type: "File",
    tags: ["new", "Revision"],
    folder: "Extra",
    id: 12,
  },
  {
    title: "Extra Logic Exercises",
    type: "File",
    tags: ["new", "Revision"],
    folder: "Extra",
    id: 13,
  },
  {
    title: "Course Introduction",
    type: "File",
    tags: ["README"],
    folder: "",
    id: 14,
  },
];
