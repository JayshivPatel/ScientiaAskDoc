import React from "react";
import {mount, shallow} from "enzyme";
import Timeline from "./index";
import {Module, ProgressStatus} from "../../../constants/types";
import TermSwitcher from "./components/TermSwitcher";
import ModuleRows from "./components/ModuleRows";

describe("</TimeLine>", () => {
  const modules: Module[] = [
    {
      canManage: false,
      code: "60020",
      content: "",
      hasMaterials: false,
      progressPercent: 7,
      progressStatus: ProgressStatus.IN_PROGRESS,
      subscriptionLevel: 1,
      terms: ["Autumn"],
      title: "Simulation and Modelling",
    },
    {
      canManage: false,
      code: "60021",
      content: "",
      hasMaterials: false,
      progressPercent: 7,
      progressStatus: ProgressStatus.IN_PROGRESS,
      subscriptionLevel: 1,
      terms: ["Autumn"],
      title: "Software Engineering",
    },
  ]

  const wrapper = shallow(
    <Timeline
      initSideBar={jest.fn()}
      revertSideBar={jest.fn()}
      term={"Autumn"}
      setTerm={jest.fn()}
      onEventClick={jest.fn()}
      modules={modules}
      timelineEvents={{}}
      modulesTracks={{}}
    />)

  it("Able to render the Timeline", () => {
      expect(wrapper.find(TermSwitcher).prop("term")).toBe("Autumn")
  })

  it("Able to display the modules", () => {
    expect(wrapper.find(ModuleRows).prop("modulesList")).toHaveLength(2)
  })
})