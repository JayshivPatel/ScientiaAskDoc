export const initialActions = [
  {
    id: "gitlab",
    name: "GitLab",
    shortcut: ["gl"],
    keywords: "git lab",
    perform: () => window.open("https://gitlab.doc.ic.ac.uk/", "_blank"),
    section: "Links",
  },
  {
    id: "outlook",
    name: "Outlook",
    shortcut: ["o"],
    keywords: "email outlook mail",
    perform: () => window.open("https://outlook.office.com/", "_blank"),
    section: "Links",
  },
  {
    id: "edstem",
    name: "EdStem",
    shortcut: ["ed"],
    keywords: "piazza edstem discussion forum",
    perform: () => window.open("https://edstem.org/us/dashboard", "_blank"),
    section: "Links",
  },
  {
    id: "panopto",
    name: "Panopto",
    shortcut: ["p"],
    keywords: "panopto lecture recording",
    perform: () =>
      window.open("https://imperial.cloud.panopto.eu/Panopto/", "_blank"),
    section: "Links",
  },
  {
    id: "peer-assessment",
    name: "Peer Assessment",
    shortcut: ["pa"],
    keywords: "peer assessment docpa",
    perform: () =>
      window.open("https://peer-assessment.doc.ic.ac.uk/", "_blank"),
    section: "Links",
  },
  {
    id: "labts",
    name: "LabTS",
    shortcut: ["lts"],
    keywords: "lab ts",
    perform: () => window.open("https://teaching.doc.ic.ac.uk/labts", "_blank"),
    section: "Links",
  },
]
