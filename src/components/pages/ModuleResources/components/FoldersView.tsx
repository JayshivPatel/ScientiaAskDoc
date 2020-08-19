import React from "react";
import { Resource } from "../index";
import SelectionView, {
  SelectionProps,
} from "components/molecules/SelectionView";
import FoldersRow from "components/molecules/FoldersRow";

export interface FoldersViewProps {
  resources: Resource[];
  scope: string;
  searchText: string;
}

const FoldersView: React.FC<FoldersViewProps> = ({
  resources,
  scope,
  searchText,
}) => {
	let folders: { title: string; id: number }[] = Array.from(
		new Set<string>(resources.map((res: Resource) => res.folder))
	).map((title: string, id: number) => ({
		title: title,
		id: id,
	}));

	if (searchText === "" && scope === "" && folders.length > 0) {
		return (
			<SelectionView
				heading="Folders"
				onDownloadClick={() => {}}
				onItemClick={() => {}}
				selectionItems={folders}
				render={(select: SelectionProps) => <FoldersRow select={select} />}
			/>
		);
	}
  return null;
};

export default FoldersView;
