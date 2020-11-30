import React from "react";
import { mount } from "enzyme";
import { faFileAlt, faFileCode } from "@fortawesome/free-solid-svg-icons";
import BottomBar from "./index";
import BottomBarItem from "./components/BottomBarItem";
import { BrowserRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

describe("<BottomBar />", () => {
  const pages = [
    { name: "Test Page 1", path: "/Test Path 1", icon: faFileCode },
    { name: "Test Page 2", path: "/Test Path 2", icon: faFileAlt },
  ];
  const wrapper = mount(
    <BrowserRouter>
      <BottomBar pages={pages} />
    </BrowserRouter>
  );
  it("Check item number", () => {
    expect(wrapper.find(BottomBarItem).length).toBe(2);
  });
  it("Check item properties", () => {
    expect(wrapper.find(Button).at(0).prop("id")).toBe(
      "bottom-" + pages[0].name
    );
    expect(wrapper.find(Button).at(0).prop("to")).toBe(pages[0].path);
    expect(wrapper.find(FontAwesomeIcon).at(0).prop("icon")).toBe(
      pages[0].icon
    );
    expect(wrapper.find(Button).at(1).prop("id")).toBe(
      "bottom-" + pages[1].name
    );
    expect(wrapper.find(Button).at(1).prop("to")).toBe(pages[1].path);
    expect(wrapper.find(FontAwesomeIcon).at(1).prop("icon")).toBe(
      pages[1].icon
    );
  });
});
