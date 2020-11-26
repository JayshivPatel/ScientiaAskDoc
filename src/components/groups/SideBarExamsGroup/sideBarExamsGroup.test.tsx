import React from "react";
import { mount } from "enzyme";
import SideBarExamsGroup from "./index";
import SideBarTabGroup from "../SideBarTabGroup";
import { BrowserRouter } from "react-router-dom";

describe("<SideBarExamsGroup />", () => {
  const wrapper = mount(
    <BrowserRouter>
      <SideBarExamsGroup />
    </BrowserRouter>
  );
  it("Check all", () => {
    expect(wrapper.find(SideBarTabGroup)).toHaveLength(1);
    expect(wrapper.find(SideBarTabGroup).prop("title")).toBe("Pages");
    expect(wrapper.find(SideBarTabGroup).prop("buttons").length).toBe(5);
  });
});
