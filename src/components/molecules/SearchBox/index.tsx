import React from "react";
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
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchText,
  onSearchTextChange,
}: SearchBoxProps) => {
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

          <Dropdown.Menu alignRight>
            <Dropdown.Header>Search types: </Dropdown.Header>
            <Dropdown.Item
              onClick={() => onSearchTextChange(`${searchText} type(pdf) `)}
            >
              type(pdf)
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => onSearchTextChange(`${searchText} type(video) `)}
            >
              type(video)
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => onSearchTextChange(`${searchText} type(file) `)}
            >
              type(file)
            </Dropdown.Item>
            <Dropdown.Header>Search tags: </Dropdown.Header>
            <Dropdown.Item
              onClick={() => onSearchTextChange(`${searchText} tag(new) `)}
            >
              tag(new)
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => onSearchTextChange(`${searchText} tag(my tag) `)}
            >
              tag(my tag)
            </Dropdown.Item>
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
