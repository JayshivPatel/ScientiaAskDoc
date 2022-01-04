import React from "react"

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"

import FileItemRow from "components/rows/FileItemRow"
import { SelectionProps } from "components/pages/SelectionView"
import { resourceTypeToIcon } from "../../pages/modulePages/ModuleResources/utils"
import { IdBooleanMap, Resource } from "constants/types"
import { request } from "utils/api"
import { api, methods } from "constants/routes"

export interface CategoryListProps {
  categoryItems: Resource[]
  setCategoryItems: (resources: Resource[]) => void
  select?: SelectionProps
  showMenus?: IdBooleanMap
  displayingForStaff?: boolean
  setShowMenus?: (id: number) => (show: boolean) => void
  handleRowClick: (id: number) => void
  handleIconClick: (id: number) => void
  handleMouseOver: (id: number) => void
  handleMouseOut: (id: number) => void
}

export const DragHandle = SortableHandle(() => (
  <FontAwesomeIcon style={{ marginRight: "1rem" }} icon={faBars} />
))

const SortableItem = SortableElement(({ children }: { children: any }) => (
  <div>{children}</div>
))

const SortableList = SortableContainer(({ items }: { items: any[] }) => (
  <div>
    {items.map((item, index) => (
      <SortableItem key={`item-${index}`} index={index} children={item} />
    ))}
  </div>
))

const CategoryList: React.FC<CategoryListProps> = ({
  categoryItems,
  setCategoryItems,
  select,
  showMenus,
  setShowMenus,
  displayingForStaff = false,
  handleRowClick,
  handleIconClick,
  handleMouseOver,
  handleMouseOut,
}) => {
  const displayListItems = (items: Resource[]) => {
    return items
      .sort((a, b) => a.index - b.index)
      .map(({ title, type, tags, downloads, visible_after, id, index }) => {
        if (type === undefined || tags === undefined) return null

        let icon =
          select && (select.isAnySelected() || select.hoveringOver.has(id))
            ? select.selected.has(id)
              ? faCheckSquare
              : faSquare
            : resourceTypeToIcon(type)

        return (
          <FileItemRow
            onClick={() => handleRowClick(id)}
            onMouseOver={() => handleMouseOver(id)}
            onMouseOut={() => handleMouseOut(id)}
            onIconClick={() => handleIconClick(id)}
            showMenu={showMenus && showMenus[id]}
            setShowMenu={setShowMenus && setShowMenus(id)}
            icon={icon}
            tags={tags}
            downloads={undefined}
            invisible={visible_after.getTime() - Date.now() > 0}
            title={title}
            displayingForStaff={displayingForStaff}
            key={index}
          />
        )
      })
  }

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    let resourceToChange = categoryItems[oldIndex]
    request({
      endpoint: api.MATERIALS_RESOURCES_ID(resourceToChange.id),
      method: methods.PUT,
      onSuccess: () => {
        setCategoryItems(
          reindexResources(categoryItems, resourceToChange, newIndex)
        )
      },
      onError: () => {},
      body: {
        index: newIndex,
      },
    })
  }

  function reindexResources(
    resources: Resource[],
    movedResource: Resource,
    newIndex: number
  ) {
    let newResources = resources.filter((r) => r.id !== movedResource.id)
    newResources = newResources
      .slice(0, newIndex)
      .concat([movedResource], newResources.slice(newIndex))
    return newResources.map((r, i) => ({ ...r, index: i }))
  }

  return (
    <div style={{ marginLeft: ".25rem" }}>
      {displayingForStaff ? (
        <SortableList
          items={displayListItems(categoryItems)}
          onSortEnd={onSortEnd}
          onSortStart={(_, event) => event.preventDefault()}
          useDragHandle
        />
      ) : (
        displayListItems(categoryItems)
      )}
    </div>
  )
}

export default CategoryList
