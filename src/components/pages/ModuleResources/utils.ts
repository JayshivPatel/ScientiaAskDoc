import {
  faFileAlt,
  faFilePdf,
  faFileVideo,
  faLink,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { request } from "utils/api";
import { api, methods } from "constants/routes";

export interface Folder {
  title: string;
  id: number;
}

export interface Resource {
  title: string;
  type: string;
  tags: string[];
  folder: string;
  id: number;
  index: number;
  path: string;
  visible_after: Date;
  thumbnail?: string;
}

export function tags(resources: Resource[]) {
  let tagSet = new Set<string>();

  for (const resource of resources) {
    for (const tag of resource.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet)
    .filter((tag) => tag.length > 0)
    .sort();
}

export function folders(resources: Resource[]): Folder[] {
  return Array.from(
    new Set<string>(resources.map((res: Resource) => res.folder))
  ).map((title, id) => ({ title: title, id: id }));
}

export function openResource(resources: Resource[], id: number) {
  let resource = resources.find((resource) => resource.id === id);
  if (resource === undefined) {
    return;
  }
  if (resource.type === "link" || resource.type === "video") {
    window.open(resource.path, "_blank");
    return;
  }

  // Resource is of file type, get from Materials
  const onSuccess = (data: any) => {
    // TODO: Try to navigate straight to the endpoint url instead of creating an object url
    data.blob().then((blob: any) => {
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.target = "_blank";
      a.href = url;
      a.click();
      a.remove();
    });
  };
  const onFailure = (error: { text: () => Promise<any> }) => {
    error.text().then((errorText) => {
      console.log(errorText);
    });
  };
  request(api.MATERIALS_RESOURCES_FILE(id), methods.GET, onSuccess, onFailure);
}

export function resourceTypeToIcon(type: string): IconDefinition {
  switch (type) {
    case "pdf":
      return faFilePdf;
    case "video":
      return faFileVideo;
    case "link":
      return faLink;
    default:
      return faFileAlt;
  }
}
