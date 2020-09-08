import React from "react";
import SideBarTabGroup from "components/molecules/SideBarTabGroup";
import { faSun, faLeaf, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { Term } from "constants/types";

interface Props {
  term: Term;
  setTerm: React.Dispatch<React.SetStateAction<Term>>;
}
const LeftBarTimeline: React.FC<Props> = ({ term, setTerm }) => {
  let termButtons = [
    {
      title: "Autumn",
      icon: faLeaf,
      active: term === Term.AUTUMN,
      onClick: () => setTerm(Term.AUTUMN),
    },
    {
      title: "Spring",
      icon: faSeedling,
      active: term === Term.SPRING,
      onClick: () => setTerm(Term.SPRING),
    },
    {
      title: "Summer",
      icon: faSun,
      active: term === Term.SUMMER,
      onClick: () => setTerm(Term.SUMMER),
    },
  ];

  return (
    <>
      <SideBarTabGroup title="Terms" buttons={termButtons} />
    </>
  );
};

export default LeftBarTimeline;
