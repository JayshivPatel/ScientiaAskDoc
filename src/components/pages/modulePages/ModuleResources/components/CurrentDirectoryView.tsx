import React from "react"
import { useHistory } from "react-router-dom"
import SelectionView, { SelectionProps } from "components/pages/SelectionView"
import CurrentDirectoryRow from "components/rows/CurrentDirectoryRow"
import { api, methods } from "constants/routes"
import { Resource } from "constants/types"
import { request } from "utils/api"

export interface CurrentDirectoryViewProps {
  resources: Resource[]
  scope: string
  searchText: string
  onDownloadClick: (identifiers: number[]) => void
  includeInSearchResult: (item: Resource, searchText: string) => boolean
}

const CurrentDirectoryView: React.FC<CurrentDirectoryViewProps> = ({
  resources,
  scope,
  searchText,
  onDownloadClick,
  includeInSearchResult,
}) => {

  let history = useHistory()

  function openResource(id: number) {
    const onSuccess = (data: any) => {
      const course = data.course
      const category = data.category
      const index = data.index
      history.push(`/modules/${course}/resources/${category}/${index}`)
    }
    request({
      url: api.MATERIALS_RESOURCES_ID(id),
      method: methods.GET,
      onSuccess,
      onError: (message) => console.log(`Failed to obtain data for resource ${id}: ${message}`),
    })
  }

  let filesContent: Resource[] = resources
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
        onItemClick={openResource}
        onDownloadClick={onDownloadClick}
        selectionItems={filesContent}
        render={(select: SelectionProps) => (
          <CurrentDirectoryRow select={select} />
        )}
      />
    )
  }
  return null
}

export default CurrentDirectoryView
