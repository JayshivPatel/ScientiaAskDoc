import React from "react";
import SideBarTabGroup from "components/groups/SideBarTabGroup";
import { Term } from "constants/types";

interface Props {
  term: Term;
  setTerm: React.Dispatch<React.SetStateAction<Term>>;
}
const LeftBarTimeline: React.FC<Props> = ({ term, setTerm }) => {
  let termButtons = [
    {
      title: "Autumn",
      active: term === Term.AUTUMN,
      onClick: () => setTerm(Term.AUTUMN),
    },
    {
      title: "Spring",
      active: term === Term.SPRING,
      onClick: () => setTerm(Term.SPRING),
    },
    {
      title: "Summer",
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
