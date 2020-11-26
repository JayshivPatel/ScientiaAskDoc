import React from "react";
import { mount } from "enzyme";
import SideBarTabGroup from "../SideBarTabGroup";
import SideBarLinkGroup from "./index";

describe("<SideBarLinkGroup />", () => {
  const setModulesFilter = jest.fn();
  const modulesFilter = "";
  const wrapper = mount(<SideBarLinkGroup />);
  it("Check all", () => {
    expect(wrapper.find(SideBarTabGroup)).toHaveLength(1);
    expect(wrapper.find(SideBarTabGroup).prop("title")).toBe("Links");
    expect(wrapper.find(SideBarTabGroup).prop("buttons").length).toBe(6);
  });
});
