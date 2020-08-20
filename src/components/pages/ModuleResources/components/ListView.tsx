import React from "react";
import { Resource } from "../index";
import SelectionView, {
  SelectionProps,
} from "components/molecules/SelectionView";
import CategoryList from "components/molecules/CategoryList";

export interface ListViewProps {
  folders: {
	title: string;
	id: number;
  }[];
  resources: Resource[];
  searchText: string;
  onDownloadClick: (identifiers: number[]) => void;
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
			heading="Files"
			onItemClick={onItemClick}
			onDownloadClick={onDownloadClick}
			selectionItems={filesContent}
			render={(select: SelectionProps) => (
				<CategoryList select={select} />
			)}
		/>
	);
};

export default ListView;