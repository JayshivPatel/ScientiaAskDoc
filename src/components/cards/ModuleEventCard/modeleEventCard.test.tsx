import React from "react";
import { mount } from "enzyme";
import { TimelineEvent } from "../../../constants/types";
import ModuleEventCard from "./index";

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
