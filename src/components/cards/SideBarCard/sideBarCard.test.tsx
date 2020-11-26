import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SideBarCard, { eventTypes } from "./index";
import Card from "react-bootstrap/Card";

configure({ adapter: new Adapter() });

describe("<SideBardCard />", () => {
  const type = eventTypes.BlueCard;
  const onClick = jest.fn();
  const wrapper = mount(<SideBarCard type={type} onClick={onClick} />);
  it("Check type", () => {
    expect(wrapper.find(Card).hasClass("sideBarBlueCard")).toBeTruthy();
    expect(wrapper.find(Card).hasClass("sideBarRedCard")).toBeFalsy();
    expect(wrapper.find(Card).hasClass("sideBarGreenCard")).toBeFalsy();
    expect(wrapper.find(Card).hasClass("sideBarIndigoCard")).toBeFalsy();
    expect(wrapper.find(Card).hasClass("sideBarCyanCard")).toBeFalsy();
  });
  it("Check title", () => {
    expect(wrapper.contains(<Card.Title></Card.Title>)).toBeFalsy();
    const title = "Test Title";
    wrapper.setProps({ title: title }).update();
    expect(wrapper.find(Card.Title).text()).toBe(title);
  });
  it("Check subtitle", () => {
    expect(wrapper.contains(<Card.Subtitle></Card.Subtitle>)).toBeFalsy();
    const subtitle = "Test Subtitle";
    wrapper.setProps({ subtitle: subtitle }).update();
    expect(wrapper.find(Card.Subtitle).text()).toBe(subtitle);
  });
  it("Check content", () => {
    wrapper.setProps({ subtitle: undefined }).update();
    expect(wrapper.find(Card).hasClass("sideBarEmptyCard")).toBeTruthy();
  });
  it("Check card onClick", () => {
    onClick.mockClear();
    wrapper.find(Card).simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});
