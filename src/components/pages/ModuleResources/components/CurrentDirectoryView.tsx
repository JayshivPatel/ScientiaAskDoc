import React from "react";
import { Resource } from "../index";
import SelectionView, {
  SelectionProps
} from "components/molecules/SelectionView";
import CurrentDirectoryRow from "components/molecules/CurrentDirectoryRow";

export interface CurrentDirectoryViewProps {
  resources: Resource[];
  scope: string;
  searchText: string;
  onDownloadClick: (identifiers: number[]) => void;
  onItemClick: (identifier: number) => void;
  includeInSearchResult: (item: Resource, searchText: string) => boolean;
}

const CurrentDirectoryView: React.FC<CurrentDirectoryViewProps> = ({
  resources,
  scope,
  searchText,
  onDownloadClick,
  onItemClick,
  includeInSearchResult
}) => {
  let filesContent: Resource[] = resources;
  if (scope !== "") {
    filesContent = filesContent.filter(({ folder }) => folder === scope);
  }
  if (searchText !== "") {
    filesContent = filesContent.filter(item =>
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
