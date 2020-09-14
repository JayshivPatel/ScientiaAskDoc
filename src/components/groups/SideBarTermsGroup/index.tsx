import React from "react";
import SideBarTabGroup from "components/groups/SideBarTabGroup";
import { Term } from "constants/types";
import { faLeaf, faSeedling, faSun } from "@fortawesome/free-solid-svg-icons";

interface Props {
  term: Term;
  setTerm: React.Dispatch<React.SetStateAction<Term>>;
}
const SideBarTermsGroup: React.FC<Props> = ({ term, setTerm }) => {
  let termButtons = [
    {
      title: "Autumn",
      active: term === "Autumn",
      onClick: () => setTerm("Autumn"),
      icon: faLeaf,
    },
    {
      title: "Christmas",
      active: term === "Christmas",
      onClick: () => setTerm("Christmas"),
    },
    {
      title: "Spring",
      active: term === "Spring",
      onClick: () => setTerm("Spring"),
      icon: faSeedling,
    },
    {
      title: "Easter",
      active: term === "Easter",
      onClick: () => setTerm("Easter"),
    },
    {
      title: "Summer",
      active: term === "Summer",
      onClick: () => setTerm("Summer"),
      icon: faSun,
    },
    {
      title: "Jun-Jul",
      active: term === "Jun-Jul",
      onClick: () => setTerm("Jun-Jul"),
    },
    {
      title: "Aug-Sept",
      active: term === "Aug-Sept",
      onClick: () => setTerm("Aug-Sept"),
    },
  ];

  return <SideBarTabGroup title="Terms" buttons={termButtons} />;
};

export default SideBarTermsGroup;
