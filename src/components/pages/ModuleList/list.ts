import logicIllustration from "assets/images/logic-illustration.png";
import discreteIllustration from "assets/images/discrete-illustration.png";
import systemsIllustration from "assets/images/systems-illustration.png";
import methodsIllustration from "assets/images/methods-illustration.png";
import graphIllustration from "assets/images/graph-illustration.png";
import javaIllustration from "assets/images/java-illustration.png";
import reasoningIllustration from "assets/images/reasoning-illustration.png";
import architectureIllustration from "assets/images/architecture-illustration.png";
import databaseIllustration from "assets/images/database-illustration.png";
import logicIllustrationDark from "assets/images/logic-illustration-dark.png";
import discreteIllustrationDark from "assets/images/discrete-illustration-dark.png";
import systemsIllustrationDark from "assets/images/systems-illustration-dark.png";
import methodsIllustrationDark from "assets/images/methods-illustration-dark.png";
import graphIllustrationDark from "assets/images/graph-illustration-dark.png";
import javaIllustrationDark from "assets/images/java-illustration-dark.png";
import reasoningIllustrationDark from "assets/images/reasoning-illustration-dark.png";
import architectureIllustrationDark from "assets/images/architecture-illustration-dark.png";
import databaseIllustrationDark from "assets/images/database-illustration-dark.png"

import { ProgressStatus } from "constants/types";
import { Term } from "constants/types";

export const modulesList = [
  {
    title: "Introduction to Computer Systems",
    code: "CO112",
    imageLight: systemsIllustration,
    imageDark: systemsIllustrationDark,
    terms: [Term.AUTUMN],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 93,
    content: "",
  },
  {
    title: "Introduction to Computer Architecture",
    code: "CO113",
    imageLight: architectureIllustration,
    imageDark: architectureIllustrationDark,
    terms: [Term.SPRING],
    progressStatus: ProgressStatus.NOT_STARTED,
    progressPercent: 0,
    content: "",
  },
  {
    title: "Introduction to Databases",
    code: "CO130",
    imageLight: databaseIllustration,
    imageDark: databaseIllustrationDark,
    terms: [Term.SPRING],
    progressStatus: ProgressStatus.NOT_STARTED,
    progressPercent: 0,
    content: "",
  },
  {
    title: "Java",
    code: "CO120.2",
    imageLight: javaIllustration,
    imageDark: javaIllustrationDark,
    terms: [Term.AUTUMN, Term.SPRING, Term.SUMMER],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 20,
    content: "",
  },
  {
    title: "Introduction to Logic",
    code: "CO140",
    imageLight: logicIllustration,
    imageDark: logicIllustrationDark,
    terms: [Term.AUTUMN],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 50,
    content: "",
  },
  {
    title: "Reasoning About Programs",
    code: "CO141",
    imageLight: reasoningIllustration,
    imageDark: reasoningIllustrationDark,
    terms: [Term.SPRING],
    progressStatus: ProgressStatus.NOT_STARTED,
    progressPercent: 0,
    content: "",
  },
  {
    title: "Discrete Mathematics",
    code: "CO142",
    imageLight: discreteIllustration,
    imageDark: discreteIllustrationDark,
    terms: [Term.AUTUMN],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 60,
    content: "",
  },
  {
    title: "Mathematical Methods",
    code: "CO145",
    terms: [Term.AUTUMN],
    imageLight: methodsIllustration,
    imageDark: methodsIllustrationDark,
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 45,
    content: "",
  },
  {
    title: "Graphs and Algorithms",
    code: "CO150",
    imageLight: graphIllustration,
    imageDark: graphIllustrationDark,
    terms: [Term.SPRING],
    progressStatus: ProgressStatus.NOT_STARTED,
    progressPercent: 0,
    content: "",
  },
];
