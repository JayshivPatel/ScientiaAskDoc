import React from "react";
import SideBarTabGroup from "components/groups/SideBarTabGroup";
import { OldTerm } from "constants/types";
import {
  faCandyCane,
  faEgg,
  faSeedling,
  faSun,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";

interface Props {
  term: OldTerm;
  setTerm: React.Dispatch<React.SetStateAction<OldTerm>>;
}
const SideBarTermsGroup: React.FC<Props> = ({ term, setTerm }) => {
  let termButtons = [
    {
      title: "Autumn",
      active: term === "Autumn",
      onClick: () => setTerm("Autumn"),
      icon: faCanadianMapleLeaf,
    },
    {
      title: "Christmas",
      active: term === "Christmas",
      onClick: () => setTerm("Christmas"),
      icon: faCandyCane,
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
      icon: faEgg,
    },
    {
      title: "Summer",
      active: term === "Summer",
      onClick: () => setTerm("Summer"),
      icon: faSun,
    },
    {
      title: "June-Sept",
      active: term === "June-Sept",
      onClick: () => setTerm("June-Sept"),
      icon: faUmbrellaBeach,
    },
  ];

  return <SideBarTabGroup title="Terms" buttons={termButtons} />;
};

export default SideBarTermsGroup;
