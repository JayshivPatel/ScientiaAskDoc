import React from "react";
import styles from "./style.module.scss";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { titleCase } from "utils/functions";

export interface SearchBoxProps {
  searchText: string;
  onSearchTextChange: (searchText: string) => void;
  tags?: string[];
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchText,
  onSearchTextChange,
  tags,
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

          <Dropdown.Menu alignRight className={styles.dropdownMenu}>
            <Dropdown.Header className={styles.dropdownHeader}>
              Types:{" "}
            </Dropdown.Header>
            <Dropdown.Item
              className={styles.dropdownItem}
              onClick={() => onSearchTextChange(`${searchText} type(pdf) `)}
            >
              PDF
            </Dropdown.Item>
            <Dropdown.Item
              className={styles.dropdownItem}
              onClick={() => onSearchTextChange(`${searchText} type(video) `)}
            >
              Video
            </Dropdown.Item>
						<Dropdown.Item
              className={styles.dropdownItem}
              onClick={() => onSearchTextChange(`${searchText} type(link) `)}
            >
              Link
            </Dropdown.Item>
            <Dropdown.Item
              className={styles.dropdownItem}
              onClick={() => onSearchTextChange(`${searchText} type(file) `)}
            >
              File
            </Dropdown.Item>
            <Dropdown.Header className={styles.dropdownHeader}>
              Tags:{" "}
            </Dropdown.Header>
            <Dropdown.Item
              className={styles.dropdownItem}
              onClick={() => onSearchTextChange(`${searchText} tag(new) `)}
            >
              New
            </Dropdown.Item>
						<Dropdown.Item
              className={styles.dropdownItem}
              onClick={() => onSearchTextChange(`${searchText} tag(week 1) `)}
            >
              Week 1
            </Dropdown.Item>
            {tags
              ? tags
									.filter((tag) => tag.toLowerCase() !== "new")
									.filter((tag) => !tag.toLowerCase().startsWith("week"))
                  .map((tag) => {
                    return (
                      <Dropdown.Item
                        className={styles.dropdownItem}
                        onClick={() =>
                          onSearchTextChange(`${searchText} tag(${tag}) `)
												}
												key={tag}
                      >
                        {titleCase(tag)}
                      </Dropdown.Item>
                    );
                  })
              : null}
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
