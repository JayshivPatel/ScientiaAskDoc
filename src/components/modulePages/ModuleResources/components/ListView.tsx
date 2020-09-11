import React from "react";
import SelectionView, {
  SelectionProps,
} from "components/pages/SelectionView";
import CategoryList from "components/sections/CategoryList";
import CategoryHeader from "components/headings/CategoryHeader";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { Folder, Resource } from "constants/types";

export interface ListViewProps {
  folders: Folder[];
  resources: Resource[];
  searchText: string;
  onDownloadClick: (identifiers: number[]) => void;
  onSectionDownloadClick: (title: string) => void;
  onItemClick: (identifier: number) => void;
  includeInSearchResult: (item: Resource, searchText: string) => boolean;
}

const ListView: React.FC<ListViewProps> = ({
  folders,
  resources,
  searchText,
  onDownloadClick,
  onItemClick,
  includeInSearchResult,
}) => {

  let filesContent: Resource[] = resources;
  if (searchText !== "") {
    filesContent = filesContent.filter((item) =>
      includeInSearchResult(item, searchText.toLowerCase())
    );
  }

  return (
    <SelectionView
      heading="Resources"
      onItemClick={onItemClick}
      onDownloadClick={onDownloadClick}
      selectionItems={filesContent}
      render={(select: SelectionProps) => (
        <>
          {folders.map(({ title, id }) => {
            let categoryItems = filesContent.filter(
              (res) => res.folder === title
            );
            function isAllSelected(): boolean {
              let isSelected = select.state.isSelected;
              return categoryItems.every((item) => isSelected[item.id]);
            }

            function onSelectAllClick() {
              let setValue = !isAllSelected();
              let isSelected = JSON.parse(
                JSON.stringify(select.state.isSelected)
              );
              for (let item in categoryItems) {
                isSelected[categoryItems[item].id] = setValue;
              }
              select.setIsSelected(isSelected);
            }

            return (
              <div key={id}>
                <CategoryHeader
                  heading={title}
                  onSelectAllClick={onSelectAllClick}
                  selectAllIcon={isAllSelected() ? faCheckSquare : faSquare}
									checkBoxColor={
										select.isAnySelected()
											? "var(--secondary-text-color)"
											: "var(--secondary-button-text)"
									}
                />
                <CategoryList
                  categoryItems={categoryItems}
                  handleRowClick={select.handleCardClick}
                  handleIconClick={select.handleIconClick}
                  handleMouseOver={select.handleMouseOver}
                  handleMouseOut={select.handleMouseOut}
                  select={select}
                />
              </div>
            );
          })}
        </>
      )}
    />
  );
};

export default ListView;
