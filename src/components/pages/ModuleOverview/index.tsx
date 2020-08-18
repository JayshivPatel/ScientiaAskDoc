import React from "react";
import Dandruff from "components/molecules/Dandruff";
import { useParams } from "react-router-dom";

const ModuleOverview: React.FC = () => {
  let { id } = useParams();
  let modules = [
    {
      title: "Introduction to Logic",
      code: "CO140",
    },
    {
      title: "Discrete Mathematics",
      code: "CO142",
    },
    {
      title: "Introduction to Computer Systems",
      code: "CO112",
    },
    {
      title: "Mathematical Methods",
      code: "CO145",
    },
    {
      title: "Java",
      code: "CO120.2",
    },
    {
      title: "Graphs and Algorithms",
      code: "CO150",
    },
    {
      title: "Introduction to Computer Architecture",
      code: "CO113",
    },
    {
      title: "Reasoning About Programs",
      code: "CO141",
    },
    {
      title: "Introduction to Databases",
      code: "CO130",
    },
  ];
  let heading = id;
  for (let i in modules) {
    if (modules[i].code === id) {
      heading = modules[i].title;
      break;
    }
  }
  return (
    <>
      <Dandruff heading={heading} />
    </>
  );
};

export default ModuleOverview;
