import React from "react";
import {mount, shallow} from "enzyme";
import Timeline from "./index";
import {Module, ProgressStatus} from "../../../constants/types";
import TermSwitcher from "./components/TermSwitcher";

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
    }
  ]

  it("Able to render the Timeline", () => {
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
      expect(wrapper.find(TermSwitcher).prop("term")).toBe("Autumn")
  })
})