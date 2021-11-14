import React from "react"
import SelectionView, { SelectionProps } from "components/pages/SelectionView"
import CategoryList from "components/sections/CategoryList"
import CategoryHeader from "components/headings/CategoryHeader"
import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons"
import { Folder, Resource } from "constants/types"

export interface ListViewProps {
  folders: Folder[]
  resources: Resource[]
  setResources: (resources: Resource[]) => void
  searchText: string
  onDownloadClick: (identifiers: number[]) => void
  onSectionDownloadClick: (title: string) => void
  onItemClick: (identifier: number) => void
  includeInSearchResult: (item: Resource, searchText: string) => boolean
}

const ListView: React.FC<ListViewProps> = ({
  folders,
  resources,
  setResources,
  searchText,
  onDownloadClick,
  onItemClick,
  includeInSearchResult,
}) => {
  let filesContent: Resource[] = resources
  if (searchText !== "") {
    filesContent = filesContent.filter((item) =>
      includeInSearchResult(item, searchText.toLowerCase())
    )
  }

  return (
    <SelectionView
      heading="Resources"
      onItemClick={onItemClick}
      onDownloadClick={onDownloadClick}
      selectionItems={filesContent}
      render={(select: SelectionProps) => (
        <>
          {folders.map(({ title, id }) => {
            let categoryItems = filesContent.filter(
              (res) => res.category === title
            )
            function isAllSelected(): boolean {
              return categoryItems.every((item) => select.selected[item.id])
            }

            function onSelectAllClick() {
              let setValue = !isAllSelected()
              let newSelected = { ...select.selected }
              for (let item of categoryItems) {
                newSelected[item.id] = setValue
              }
              select.setSelected(newSelected)
            }

            return (
              <div key={id}>
                <CategoryHeader
                  heading={title}
                  onSelectAllClick={onSelectAllClick}
                  selectAllIcon={isAllSelected() ? faCheckSquare : faSquare}
                  checkBoxColor={
                    select.isAnySelected()
                      ? "var(--secondary-text-color)"
                      : "var(--secondary-button-text)"
                  }
                />
                <CategoryList
                  categoryItems={categoryItems}
                  setCategoryItems={setResources}
                  handleRowClick={select.handleItemClick}
                  handleIconClick={select.handleSelectIconClick}
                  handleMouseOver={select.handleMouseOver}
                  handleMouseOut={select.handleMouseOut}
                  select={select}
                />
              </div>
            )
          })}
        </>
      )}
    />
  )
}

export default ListView
