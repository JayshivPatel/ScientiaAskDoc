import React from "react"
import SelectionView, { SelectionProps } from "components/pages/SelectionView"
import QuickAccessRow from "components/rows/QuickAccessRow"
import { BasicResource, Module } from "constants/types"

export interface QuickAccessViewProps {
  resources: BasicResource[]
  scope: string
  searchText: string
  onItemClick: (identifier: number) => void
  modules: Module[]
}

const QuickAccessView: React.FC<QuickAccessViewProps> = ({
  resources,
  scope,
  searchText,
  onItemClick,
  modules,
}) => {
  let quickAccessItems: BasicResource[] = JSON.parse(JSON.stringify(resources))
  quickAccessItems = quickAccessItems.filter(({ title }) => {
    return modules.some(({ code }) => {
      const moduleCode = code.startsWith("CO") ? code.slice(2) : code
      return title.startsWith(`C${moduleCode}`)
    })
  })
  quickAccessItems.reverse()
  quickAccessItems.forEach((i) => i.tags.push(i.folder))
  if (searchText === "" && scope === "" && quickAccessItems.length > 0) {
    return (
      <SelectionView
        heading="Quick Access"
        onItemClick={onItemClick}
        onDownloadClick={() => {}}
        disableSelection={true}
        selectionItems={quickAccessItems}
        render={(select: SelectionProps) => <QuickAccessRow select={select} />}
      />
    )
  }
  return null
}

export default QuickAccessView
