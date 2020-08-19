import React from "react";
import { Resource } from "../index";
import SelectionView, {
  SelectionProps,
} from "components/molecules/SelectionView";
import CurrentDirectoryRow from "components/molecules/CurrentDirectoryRow";

export interface CurrentDirectoryViewProps {
  resources: Resource[];
  scope: string;
  searchText: string;
  onDownloadClick: (identifiers: number[]) => void;
  onItemClick: (identifier: number) => void;
}

function includeInSearchResult(item: Resource, searchText: string) {
	let rx = /([a-z]+)\(([^)]+)\)/gi;
	let match: RegExpExecArray | null;

	let title = item.title.toLowerCase();
	let tags = item.tags.map((tag) => tag.toLowerCase());
	let type = item.type.toLowerCase();

	while ((match = rx.exec(searchText)) !== null) {
		switch (match[1]) {
			case "type":
				if (type !== match[2]) {
					return false;
				}
				break;
			case "tag":
				let matchSafe = match as RegExpExecArray;
				if (!tags.some((tag) => tag === matchSafe[2])) {
					return false;
				}
				break;
			default:
				break;
		}
	}
	let rest = searchText.replace(rx, "").trim();
	if (tags.some((tag) => tag.indexOf(rest) !== -1)) {
		return false;
	}
	return title.indexOf(rest) !== -1;
}

const CurrentDirectoryView: React.FC<CurrentDirectoryViewProps> = ({
  resources,
  scope,
  searchText,
  onDownloadClick,
  onItemClick,
}) => {
	let filesContent: Resource[] = resources;
	if (scope !== "") {
		filesContent = filesContent.filter(({ folder }) => folder === scope);
	}
	if (searchText !== "") {
		filesContent = filesContent.filter((item) =>
			includeInSearchResult(item, searchText.toLowerCase())
		);
	}

	if (scope !== "" || searchText !== "") {
		return (
			<SelectionView
				heading="Files"
				onItemClick={onItemClick}
				onDownloadClick={onDownloadClick}
				selectionItems={filesContent}
				render={(select: SelectionProps) => (
					<CurrentDirectoryRow select={select} />
				)}
			/>
		);
	}
  return null;
};

export default CurrentDirectoryView;