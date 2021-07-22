import React from "react";
import { shallow } from "enzyme";
import Timeline from "./index";
import { Module, ProgressStatus, Term } from "../../../constants/types";
import TermSwitcher from "./components/TermSwitcher";
import ModuleRows from "./components/ModuleRows";

describe("<TimeLine />", () => {
  const modules: Module[] = [
    {
      can_manage: false,
      code: "60020",
      content: "",
      has_materials: false,
      progressPercent: 7,
      progressStatus: ProgressStatus.IN_PROGRESS,
      subscriptionLevel: 1,
      terms: ["Autumn"],
      title: "Simulation and Modelling",
    },
    {
      can_manage: false,
      code: "60021",
      content: "",
      has_materials: false,
      progressPercent: 7,
      progressStatus: ProgressStatus.IN_PROGRESS,
      subscriptionLevel: 1,
      terms: ["Autumn"],
      title: "Software Engineering",
    },
  ];

  const activeTerm: Term = {
    label: "Autumn",
    weeks: 11,
    start: new Date(2020, 10, 4),
    end: new Date(2020, 12, 20),
  };

  const wrapper = shallow(
    <Timeline
      terms={[activeTerm]}
      initSideBar={jest.fn()}
      revertSideBar={jest.fn()}
      activeTerm={activeTerm}
      setActiveTerm={jest.fn()}
      onEventClick={jest.fn()}
      modules={modules}
      timelineEvents={{}}
      modulesTracks={{}}
    />
  );

  it("shows selected term as the currently active term", () => {
    expect(wrapper.find(TermSwitcher).prop("activeTerm")).toBe(activeTerm);
  });

  it("shows all given modules", () => {
    expect(wrapper.find(ModuleRows).prop("modulesList")).toHaveLength(2);
  });
});
