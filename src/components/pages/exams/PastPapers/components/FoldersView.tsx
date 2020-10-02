import React from "react"
import SelectionView, { SelectionProps } from "components/pages/SelectionView"
import FoldersRow from "components/rows/FoldersRow"
import { useHistory, useLocation } from "react-router-dom"
import { Folder } from "constants/types"

export interface FoldersViewProps {
  folders: Folder[]
  scope: string
  searchText: string
}

const FoldersView: React.FC<FoldersViewProps> = ({
  folders,
  scope,
  searchText,
}) => {
  let history = useHistory()
  let location = useLocation()

  function handleFolderClick(foldersId: number) {
    let title = folders.filter(({ id }) => id === foldersId)[0].title
    history.push(`${location.pathname}/${title}`)
  }

  if (searchText === "" && scope === "" && folders.length > 0) {
    return (
      <SelectionView
        heading="Folders"
        onDownloadClick={() => {}}
        onItemClick={handleFolderClick}
        selectionItems={folders}
        render={(select: SelectionProps) => <FoldersRow select={select} />}
        disableSelection={true}
      />
    )
  }
  return null
}

export default FoldersView
