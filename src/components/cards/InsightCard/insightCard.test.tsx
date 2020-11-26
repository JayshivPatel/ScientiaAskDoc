import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Container from "react-bootstrap/Container";
import { faFileCode } from "@fortawesome/free-solid-svg-icons";
import InsightCard from "./index";
import WriteParagraph from "./paragraph";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

configure({ adapter: new Adapter() });

describe("<InsightCard />", () => {
  const paragraph = WriteParagraph.begin().write("first").bold("second").end();
  const timestamp = new Date();
  const onClick = jest.fn();
  const wrapper = mount(
    <InsightCard
      paragraph={paragraph}
      timestamp={timestamp}
      image={{ kind: "icon", icon: faFileCode }}
      onClick={onClick}
    />
  );
  it("Check important flag", () => {
    expect(wrapper.find(Container).hasClass("important")).toBeFalsy();
    wrapper.setProps({ important: true }).update();
    expect(wrapper.find(Container).hasClass("important")).toBeTruthy();
  });
  it("Check ok flag", () => {
    expect(wrapper.find(Container).hasClass("ok")).toBeFalsy();
    wrapper.setProps({ ok: true }).update();
    expect(wrapper.find(Container).hasClass("ok")).toBeTruthy();
  });
  it("Check paragraph display", () => {
    expect(wrapper.find(".insightBoldText").text()).toBe("second");
  });
  it("Check timestamp", () => {
    const text = moment(timestamp).fromNow();
    expect(wrapper.find(".insightAddress").text()).toBe(text);
  });
  it("Check image", () => {
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(faFileCode);
  });
  it("Check card onClick", () => {
    onClick.mockClear();
    wrapper.find(Container).simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});
