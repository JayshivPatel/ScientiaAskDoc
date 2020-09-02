import React from "react";
import { Folder } from "../utils";
import SelectionView, {
  SelectionProps
} from "components/molecules/SelectionView";
import FoldersRow from "components/molecules/FoldersRow";
import { useHistory, useLocation } from "react-router-dom";

export interface FoldersViewProps {
  folders: Folder[];
  scope: string;
  searchText: string;
  handleFolderDownload: (ids: number[]) => void;
}

const FoldersView: React.FC<FoldersViewProps> = ({
  folders,
  scope,
  searchText,
  handleFolderDownload
}) => {
  let history = useHistory();
  let location = useLocation();

  function handleFolderClick(foldersId: number) {
    let title = folders.filter(({ id }) => id === foldersId)[0].title;
    history.push(`${location.pathname}/${title}`);
  }

  if (searchText === "" && scope === "" && folders.length > 0) {
    return (
      <SelectionView
        heading="Folders"
        onDownloadClick={handleFolderDownload}
        onItemClick={handleFolderClick}
        selectionItems={folders}
        render={(select: SelectionProps) => <FoldersRow select={select} />}
      />
    );
  }
  return null;
};

export default FoldersView;
