import logicIllustration from "assets/images/logic-illustration.svg";
import discreteIllustration from "assets/images/discrete-illustration.svg";
import systemsIllustration from "assets/images/systems-illustration.svg";
import methodsIllustration from "assets/images/methods-illustration.svg";
import graphIllustration from "assets/images/graph-illustration.svg";
import javaIllustration from "assets/images/java-illustration.png";
import reasoningIllustration from "assets/images/reasoning-illustration.png";
import architectureIllustration from "assets/images/architecture-illustration.png";
import databaseIllustration from "assets/images/database-illustration.png";

import { ProgressStatus } from "constants/types";
import { Term } from "constants/types";

export const modulesList = [
  {
    title: "Introduction to Logic",
    code: "CO140",
    image: logicIllustration,
    terms: [Term.AUTUMN],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 50,
    content: "",
  },
  {
    title: "Discrete Mathematics",
    code: "CO142",
    image: discreteIllustration,
    terms: [Term.AUTUMN],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 60,
    content: "",
  },
  {
    title: "Introduction to Computer Systems",
    code: "CO112",
    image: systemsIllustration,
    terms: [Term.AUTUMN],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 93,
    content: "",
  },
  {
    title: "Mathematical Methods",
    code: "CO145",
    terms: [Term.AUTUMN],
    image: methodsIllustration,
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 45,
    content: "",
  },
  {
    title: "Java",
    code: "CO120.2",
    image: javaIllustration,
    terms: [Term.AUTUMN, Term.SPRING, Term.SUMMER],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 20,
    content: "",
  },
  {
    title: "Graphs and Algorithms",
    code: "CO150",
    image: graphIllustration,
    terms: [Term.SPRING],
    progressStatus: ProgressStatus.NOT_STARTED,
    progressPercent: 0,
    content: "",
  },
  {
    title: "Introduction to Computer Architecture",
    code: "CO113",
    image: architectureIllustration,
    terms: [Term.SPRING],
    progressStatus: ProgressStatus.NOT_STARTED,
    progressPercent: 0,
    content: "",
  },
  {
    title: "Reasoning About Programs",
    code: "CO141",
    image: reasoningIllustration,
    terms: [Term.SPRING],
    progressStatus: ProgressStatus.NOT_STARTED,
    progressPercent: 0,
    content: "",
  },
  {
    title: "Introduction to Databases",
    code: "CO130",
    image: databaseIllustration,
    terms: [Term.SPRING],
    progressStatus: ProgressStatus.NOT_STARTED,
    progressPercent: 0,
    content: "",
  },
];