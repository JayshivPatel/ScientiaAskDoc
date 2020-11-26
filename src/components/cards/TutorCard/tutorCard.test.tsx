import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TutorCard from "./index";
import Image from "react-bootstrap/Image";

configure({ adapter: new Adapter() });

describe("<TutorCard />", () => {
  const name = "Test Name";
  const email = "Test Email";
  const address = "Test Address";
  const image = "Test Image";
  const wrapper = mount(
    <TutorCard name={name} email={email} address={address} image={image} />
  );
  it("Check name", () => {
    expect(wrapper.find(".tutorName").text()).toBe(name);
  });
  it("Check email", () => {
    expect(wrapper.find(".tutorEmail").text()).toBe(email);
  });
  it("Check address", () => {
    expect(wrapper.find(".tutorAddress").text()).toBe(address);
  });
  it("Check image", () => {
    expect(wrapper.find(Image).prop("src")).toBe(image);
  });
});
