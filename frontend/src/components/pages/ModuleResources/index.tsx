import React from "react";
import styles from "./style.module.scss";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import QuickAccess from "components/molecules/QuickAccess";
import ResourceFolders from "components/molecules/ResourceFolders";

const ModuleResources: React.FC = () => {
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

      <QuickAccess />
      <ResourceFolders/>
    </>
  );
};

export default ModuleResources;
