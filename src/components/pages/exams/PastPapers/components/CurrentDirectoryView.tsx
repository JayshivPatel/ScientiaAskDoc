import React from "react"
import SelectionView, { SelectionProps } from "components/pages/SelectionView"
import CurrentDirectoryRow from "components/rows/CurrentDirectoryRow"
import { BasicResource } from "constants/types"

export interface CurrentDirectoryViewProps {
  resources: BasicResource[]
  scope: string
  searchText: string
  onItemClick: (identifier: number) => void
  includeInSearchResult: (item: BasicResource, searchText: string) => boolean
}

const CurrentDirectoryView: React.FC<CurrentDirectoryViewProps> = ({
  resources,
  scope,
  searchText,
  onItemClick,
  includeInSearchResult,
}) => {
  let filesContent: BasicResource[] = resources
  if (scope !== "") {
    filesContent = filesContent.filter(({ folder }) => folder === scope)
  }
  if (searchText !== "") {
    filesContent = filesContent.filter((item) =>
      includeInSearchResult(item, searchText.toLowerCase())
    )
  }

  if (scope !== "" || searchText !== "") {
    return (
      <SelectionView
        heading="Files"
        onItemClick={onItemClick}
        onDownloadClick={() => {}}
        selectionItems={filesContent}
        disableSelection={true}
        render={(select: SelectionProps) => (
          <CurrentDirectoryRow select={select} />
        )}
      />
    )
  }
  return null
}

export default CurrentDirectoryView
