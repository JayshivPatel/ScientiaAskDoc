import React from "react";
import { mount } from "enzyme";
import { faFileCode } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter } from "react-router-dom";
import BottomBarItem from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

describe("<BottomBarItem />", () => {
  const page = { name: "Test Name", path: "/Test Path", icon: faFileCode };
  const wrapper = mount(
    <BrowserRouter>
      <BottomBarItem page={page} />
    </BrowserRouter>
  );
  it("Check name", () => {
    expect(wrapper.find(Button).prop("id")).toBe("bottom-" + page.name);
  });
  it("Check path", () => {
    expect(wrapper.find(Button).prop("to")).toBe(page.path);
  });
  it("Check icon", () => {
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(page.icon);
  });
});
