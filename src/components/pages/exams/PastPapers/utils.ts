import {
  faFileAlt,
  faFilePdf,
  faFileVideo,
  faLink,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"

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
