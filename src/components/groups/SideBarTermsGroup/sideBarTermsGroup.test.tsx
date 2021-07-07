import React from "react";
import { mount } from "enzyme";
import { OldTerm } from "../../../constants/types";
import SideBarTermsGroup from "./index";
import SideBarTabGroup from "../SideBarTabGroup";
import Button from "react-bootstrap/Button";
import { BrowserRouter } from "react-router-dom";

describe("<SideBarTermsGroup />", () => {
  const term: OldTerm = "Autumn";
  const setTerm = jest.fn();
  const wrapper = mount(
    <BrowserRouter>
      <SideBarTermsGroup term={term} setTerm={setTerm} />
    </BrowserRouter>
  );
  it("Test all", () => {
    expect(wrapper.find(SideBarTabGroup)).toHaveLength(1);
    expect(wrapper.find(SideBarTabGroup).prop("title")).toBe("Terms");
    expect(wrapper.find(SideBarTabGroup).prop("buttons")).toHaveLength(6);
    setTerm.mockClear();
    wrapper.find(Button).at(0).simulate("click");
    expect(setTerm).toHaveBeenCalled();
  });
});
