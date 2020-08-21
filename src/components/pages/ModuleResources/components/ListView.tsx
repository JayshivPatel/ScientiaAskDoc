import React from "react";
import { Resource, Folder } from "../index";
import SelectionView, {
  SelectionProps,
} from "components/molecules/SelectionView";
import CategoryList from "components/molecules/CategoryList";
import CategoryHeader from "components/molecules/CategoryHeader";

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
	onSectionDownloadClick,
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
			heading="Materials"
			onItemClick={onItemClick}
			onDownloadClick={onDownloadClick}
			selectionItems={filesContent}
			render={(select: SelectionProps) => (
				<>
				{folders.map(({ title, id }) => {
					let categorySelect : SelectionProps = {
						selectionItems: select.selectionItems.filter(res => res.folder === title),
						state: select.state,
						isAnySelected: select.isAnySelected,
						handleCardClick: select.handleCardClick,
						handleIconClick: select.handleIconClick,
						handleMouseOver: select.handleMouseOver,
						handleMouseOut: select.handleMouseOut
					}
					return (<>
						<CategoryHeader heading={title} onDownloadClick={() => onSectionDownloadClick(title)}/>
						<CategoryList select={categorySelect} />
					</>)
				})}
				</>
			)}
		/>
	);
};

export default ListView;