import React from "react";
import { mount } from "enzyme";
import SideBarTabGroup from "../SideBarTabGroup";
import SideBarOutlineGroup from "./index";

describe("<SideBarOutlineGroup />", () => {
  const wrapper = mount(<SideBarOutlineGroup />);
  it("Check all", () => {
    // expect(wrapper.find(SideBarTabGroup)).toBeDefined();
    // expect(wrapper.find(SideBarTabGroup).prop("title")).toBe("Outline");
    // expect(wrapper.find(SideBarTabGroup).prop("buttons").length).toBe(5);
  });
});
