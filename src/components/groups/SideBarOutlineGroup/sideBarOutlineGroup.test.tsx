import React from "react";
import { mount } from "enzyme";
import SideBarOutlineGroup from "./index";
import { BrowserRouter } from "react-router-dom";
import SideBarTabGroup from "../SideBarTabGroup";

describe("<SideBarOutlineGroup />", () => {
  const wrapper = mount(
    <BrowserRouter>
      <SideBarOutlineGroup />
    </BrowserRouter>
  );
  it("Check all", () => {
    expect(wrapper.find(SideBarTabGroup)).toBeDefined();
    expect(wrapper.find(SideBarTabGroup).prop("title")).toBe("Outline");
    expect(wrapper.find(SideBarTabGroup).prop("buttons").length).toBe(5);
  });
});
