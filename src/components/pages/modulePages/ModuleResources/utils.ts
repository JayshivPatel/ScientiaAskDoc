import {
  faFileAlt,
  faFilePdf,
  faFileVideo,
  faLink,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"
import { request } from "../../../../utils/api"
import { api, methods } from "../../../../constants/routes"
import { Resource, Folder } from "constants/types"
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
    new Set<string>(resources.map((res: Resource) => res.folder))
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

export function openResource(resources: Resource[], id: number) {
  let resource = resources.find((resource) => resource.id === id)
  if (resource === undefined) {
    return
  }
  if (resource.type === "link" || resource.type === "video") {
    window.open(resource.path, "_blank")
    return
  }

  // Resource is of file type, get from Materials
  const onSuccess = (blob: any) => {
    // TODO: Try to navigate straight to the endpoint url instead of creating an object url
    let url = URL.createObjectURL(blob)
    let a = document.createElement("a")
    a.target = "_blank"
    a.href = url
    a.click()
    a.remove()
  }
  const onError = (message: string) => {
    console.log(message)
  }
  request({
    url: api.MATERIALS_RESOURCES_FILE(id),
    method: methods.GET,
    onSuccess,
    onError,
    returnBlob: true,
  })
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
