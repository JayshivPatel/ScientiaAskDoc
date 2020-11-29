import React, { ReactElement } from "react";
import styles from "./style.module.scss";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export interface SearchBoxProps {
  searchText: string;
  onSearchTextChange: (searchText: string) => void;
  prompts?: {
    title: string;
    list: {
      name: string;
      value: string;
    }[];
  }[];
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchText,
  onSearchTextChange,
  prompts,
}: SearchBoxProps) => {
  let PromptElements: ReactElement[] = [];
  prompts?.forEach(({ title, list }) => {
    PromptElements.push(
      <Dropdown.Header className={styles.dropdownHeader} key={title}>
        {title}:{" "}
      </Dropdown.Header>
    );
    list.forEach(({ name, value }) => {
      PromptElements.push(
        <Dropdown.Item
          className={styles.dropdownItem}
          onClick={() => onSearchTextChange(`${searchText} ${value} `)}
          key={value}
        >
          {name}
        </Dropdown.Item>
      );
    });
  });

  return (
    <Dropdown alignRight>
      <InputGroup>
        <FormControl
          className={styles.searchBar}
          aria-label="Search"
          placeholder="Search..."
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearchTextChange(e.target.value)
          }
        />
        <InputGroup.Append>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />

          <Dropdown.Menu alignRight className={styles.dropdownMenu}>
            {PromptElements}
          </Dropdown.Menu>
        </InputGroup.Append>
      </InputGroup>
    </Dropdown>
  );
};

const CustomToggle = React.forwardRef(({ onClick }: any, ref: any) => (
  <Button
    variant="secondary"
    className={styles.searchBarIcon}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <FontAwesomeIcon size="1x" icon={faInfoCircle} />
  </Button>
));

export default SearchBox;
