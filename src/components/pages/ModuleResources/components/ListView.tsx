import React from "react";
import { Resource, Folder } from "../index";
import SelectionView, {
  SelectionProps,
} from "components/molecules/SelectionView";
import CategoryList from "components/molecules/CategoryList";
import CategoryHeader from "components/molecules/CategoryHeader";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";

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
  includeInSearchResult
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
					let categorySelect : SelectionProps = {
						selectionItems: select.selectionItems.filter(res => res.folder === title),
						state: select.state,
						setIsSelected: select.setIsSelected,
						isAnySelected: select.isAnySelected,
						handleCardClick: select.handleCardClick,
						handleIconClick: select.handleIconClick,
						handleMouseOver: select.handleMouseOver,
						handleMouseOut: select.handleMouseOut
					}

				  function isAllSelected() : boolean {
						let isSelected = categorySelect.state.isSelected;
						return categorySelect.selectionItems.every(item => isSelected[item.id]);
					}

					function onSelectAllClick() {
						let setValue = !isAllSelected();
						let isSelected = JSON.parse(JSON.stringify(select.state.isSelected));
						let items = categorySelect.selectionItems;
						for (let item in items) {
							isSelected[items[item].id] = setValue;
						}
						select.setIsSelected(isSelected);
					}

					return (<div key={id}>
						<CategoryHeader
							heading={title}
						  	onSelectAllClick={onSelectAllClick}
							selectAllIcon={isAllSelected() ? faCheckSquare : faSquare}
							checkBoxColor={select.isAnySelected() ? "#495057" : "#e9ecef"}
						/>
						<CategoryList select={categorySelect} />
					</div>)
				})}
				</>
			)}
		/>
	);
};

export default ListView;
