import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

// import { request } from "../../../utils/api"
// import { api } from "../../../constants/routes"
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

export interface Resource {
  title: string;
  type: string;
  tags: string[];
  folder: string;
  id: number;
}

const ModuleResources: React.FC<{ year: string}> = ({year}) => {
  let {id, scope } = useParams();
  scope = scope === undefined ? "" : scope;
	
	const module_code = id.startsWith("CO") ? id.slice(2) : id;

	//maybe refactor into class?
	const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);

  const quickAccessItems = resources.filter(
    ({ tags, folder }) =>
      tags.includes("new") && (scope === "" || scope === folder)
  );

  const currentDirectoryFiles = resources.filter(
    ({ folder }) => folder === scope
	);

  let folders: { title: string; id: number;}[] = Array.from(new Set<string>(resources.map((res: Resource) => { 
    return res.folder; }))).map((title: string) => {
      return {
        title: title,
        id: 0,
      };
    })

  useEffect(() => {
    setIsLoaded(false);
    const onSuccess = (data: { json: () => any[]; }) => {
      var resourceArr = [];
      var json = data.json()
      for (const key in json) {
        let resource = json[key]
        resourceArr.push({
          title: resource.title,
          type: resource.type,
          tags: resource.tags,
          folder: resource.category,
          id: resource.id,
        } as Resource);
      }
      setResources(resourceArr);
      console.log(resources);
      setIsLoaded(true);
    }
    const onFailure = (error: any) => {
      setError(error);
      setIsLoaded(true);
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

      {scope === "" && folders.length > 0 ? <ResourcesFolderView folderItems={folders} /> : null}
      {scope !== "" && currentDirectoryFiles.length > 0 ? <CurrentDirectoryView documentItems={currentDirectoryFiles} /> : null}
			{scope === "" && quickAccessItems.length > 0 ? <QuickAccessView quickAccessItems={quickAccessItems} /> : null}

		</>
  );
};

export default ModuleResources;
