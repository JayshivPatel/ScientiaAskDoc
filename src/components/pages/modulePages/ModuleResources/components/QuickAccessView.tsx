import React from "react"
import { useHistory } from "react-router-dom"
import SelectionView, { SelectionProps } from "components/pages/SelectionView"
import QuickAccessRow from "components/rows/QuickAccessRow"
import { Resource } from "constants/types"
import { api, methods } from "constants/routes"
import { request } from "utils/api"

export interface QuickAccessViewProps {
  resources: Resource[]
  scope: string
  searchText: string
  onDownloadClick: (identifiers: number[]) => void
}

const QuickAccessView: React.FC<QuickAccessViewProps> = ({
  resources,
  scope,
  searchText,
  onDownloadClick,
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

  let quickAccessItems = resources.filter(
    ({ tags, folder }) =>
      tags.includes("new") && (scope === "" || scope === folder)
  )

  if (searchText === "" && scope === "" && quickAccessItems.length > 0) {
    return (
      <SelectionView
        heading="Quick Access"
        onItemClick={openResource}
        onDownloadClick={onDownloadClick}
        selectionItems={quickAccessItems}
        render={(select: SelectionProps) => <QuickAccessRow select={select} />}
      />
    )
  }
  return null
}

export default QuickAccessView
