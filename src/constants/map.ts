import { faGitlab } from "@fortawesome/free-brands-svg-icons"
import {
  faEnvelopeOpen,
  faFlask,
  faPlay,
  faStarHalfAlt,
  faUserFriends,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"

export const LinkIcon: { [key: string]: IconDefinition } = {
  gitlab: faGitlab,
  outlook: faEnvelopeOpen,
  edstem: faUserFriends,
  panopto: faPlay,
  "peer-assessment": faStarHalfAlt,
  labts: faFlask,
}
