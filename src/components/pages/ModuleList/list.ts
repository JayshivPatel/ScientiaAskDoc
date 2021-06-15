import { ProgressStatus, Module } from "constants/types"

// This is hardcoded during the Beta-testing phase.
// Once the proxy API for DBC will be up and running,
// we will retrieve these information from that.

export const modulesList: Module[] = [
  {
    title: "Concurrent Processes",
    code: "70008",
    terms: ["Autumn"],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 0,
    content: "",
    subscriptionLevel: 3,
  },
  {
    title: "Software Engineering Group Projects",
    code: "60021",
    terms: ["Autumn"],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 0,
    content: "",
    subscriptionLevel: 3,
  },
]
