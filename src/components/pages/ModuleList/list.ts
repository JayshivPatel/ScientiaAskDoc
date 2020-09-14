import { ProgressStatus, Module } from "constants/types";

export const modulesList : Module[] = [
  {
    title: "Introduction to Computer Systems",
    code: "CO112",
    terms: ["Autumn"],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 93,
    content: "",
  },
  {
    title: "Introduction to Computer Architecture",
    code: "CO113",
    terms: ["Spring"],
    progressStatus: ProgressStatus.NOT_STARTED,
    progressPercent: 0,
    content: "",
  },
  {
    title: "Introduction to Databases",
    code: "CO130",
    terms: ["Spring"],
    progressStatus: ProgressStatus.NOT_STARTED,
    progressPercent: 0,
    content: "",
  },
  {
    title: "Java",
    code: "CO120.2",
    terms: ["Autumn", "Spring", "Summer"],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 20,
    content: "",
  },
  {
    title: "Introduction to Logic",
    code: "CO140",
    terms: ["Autumn"],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 50,
    content: "",
  },
  {
    title: "Reasoning About Programs",
    code: "CO141",
    terms: ["Spring"],
    progressStatus: ProgressStatus.NOT_STARTED,
    progressPercent: 0,
    content: "",
  },
  {
    title: "Discrete Mathematics",
    code: "CO142",
    terms: ["Autumn"],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 60,
    content: "",
  },
  {
    title: "Mathematical Methods",
    code: "CO145",
    terms: ["Autumn"],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 45,
    content: "",
  },
  {
    title: "Graphs and Algorithms",
    code: "CO150",
    terms: ["Spring"],
    progressStatus: ProgressStatus.NOT_STARTED,
    progressPercent: 0,
    content: "",
  },
];
