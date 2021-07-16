import React from "react"
import SelectionView, { SelectionProps } from "components/pages/SelectionView"
import QuickAccessRow from "components/rows/QuickAccessRow"
import { Resource } from "constants/types"

export interface QuickAccessViewProps {
  resources: Resource[]
  scope: string
  searchText: string
  onDownloadClick: (identifiers: number[]) => void
  onItemClick: (identifier: number) => void
}

const QuickAccessView: React.FC<QuickAccessViewProps> = ({
  resources,
  scope,
  searchText,
  onDownloadClick,
  onItemClick,
}) => {
  let quickAccessItems = resources.filter(
    ({ tags, folder }) =>
      tags.includes("new") && (scope === "" || scope === folder)
  )

  if (searchText === "" && scope === "" && quickAccessItems.length > 0) {
    return (
      <SelectionView
        heading="Quick Access"
        onItemClick={onItemClick}
        onDownloadClick={onDownloadClick}
        selectionItems={quickAccessItems}
        render={(select: SelectionProps) => <QuickAccessRow select={select} />}
      />
    )
  }
  return null
}

export default QuickAccessView
