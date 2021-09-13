import {
  faFileAlt,
  faFilePdf,
  faFileVideo,
  faLink,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"
import { Folder, Resource } from "constants/types"
import { DEFAULT_CATEGORY } from "../../../../constants/global"

export function tags(resources: Resource[]) {
  let tagSet = new Set<string>()

  for (const resource of resources) {
    for (const tag of resource.tags) {
      tagSet.add(tag)
    }
  }
  return Array.from(tagSet)
    .filter((tag) => tag.length > 0)
    .sort()
}

export function folders(resources: Resource[]): Folder[] {
  return Array.from(
    new Set<string>(resources.map((res: Resource) => res.category))
  )
    .sort()
    .map((title, id) => ({ title: title, id: id }))
}

export function categories(folders: Folder[]): string[] {
  let folderTitles = folders.map((folder) => folder.title)
  if (!folderTitles.includes(DEFAULT_CATEGORY)) {
    folderTitles.push(DEFAULT_CATEGORY)
  }
  return folderTitles.sort()
}

export function filterInvisibleResources(resources: Resource[]): Resource[] {
  return resources.filter(
    (resource) => resource.visible_after.getTime() - Date.now() <= 0
  )
}

export function resourceTypeToIcon(type: string): IconDefinition {
  switch (type) {
    case "pdf":
      return faFilePdf
    case "video":
      return faFileVideo
    case "link":
      return faLink
    default:
      return faFileAlt
  }
}
