import React from "react";
import { mount } from "enzyme";
import { Insight, TimelineEvent } from "../../../constants/types";
import InsightCardGroup from "./index";
import DueCard from "../../cards/InsightCard/DueCard";
import ReleaseCard from "../../cards/InsightCard/ReleaseCard";

describe("<CalenderGroup />", () => {
  const event: TimelineEvent = {
    title: "Test Title",
    id: 0,
    prefix: "Test Prefix",
    assessment: "unassessed",
    status: "due",
    owner: "Test Owner",
    moduleCode: "CO60050",
    startDate: new Date(),
    endDate: new Date(),
  };
  const due_insights: Insight[] = [{ kind: "due", event: event }];
  const release_insights: Insight[] = [{ kind: "release", event: event }];
  const due_wrapper = mount(<InsightCardGroup insights={due_insights} />);
  const release_wrapper = mount(
    <InsightCardGroup insights={release_insights} />
  );
  it("Test due insights", () => {
    expect(due_wrapper.find(DueCard).exists()).toBeTruthy();
    expect(due_wrapper.find(ReleaseCard).exists()).toBeFalsy();
    expect(due_wrapper.find(DueCard).prop("event")).toBe(event);
  });
  it("Test release insights", () => {
    expect(release_wrapper.find(ReleaseCard).exists()).toBeTruthy();
    expect(release_wrapper.find(DueCard).exists()).toBeFalsy();
    expect(release_wrapper.find(ReleaseCard).prop("event")).toBe(event);
  });
});
