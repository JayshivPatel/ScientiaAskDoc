import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { TimelineEvent } from "../../../constants/types";
import ModuleEventCard from "./index";

configure({ adapter: new Adapter() });

describe("<ModuleEventCard />", () => {
  const timelineEvent: TimelineEvent = {
    title: "Test Title",
    id: 0,
    prefix: "`Test Prefix`",
    assessment: "unassessed",
    status: "due",
    owner: "Test Owner",
    moduleCode: "",
    startDate: new Date(),
    endDate: new Date(),
  };
  const aciveDay = new Date();
  const wrapper = mount(
    <ModuleEventCard event={timelineEvent} activeDay={aciveDay} />
  );
  it("Check prefix", () => {
    expect(wrapper.find(".eventPrefix").text()).toBe(timelineEvent.prefix);
  });
  it("Check assessment", () => {
    expect(wrapper.find(".unassessed").text()).toBe(timelineEvent.assessment);
  });
});
