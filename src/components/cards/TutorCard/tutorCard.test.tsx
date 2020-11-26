import React from "react";
import { mount } from "enzyme";
import TutorCard from "./index";
import Image from "react-bootstrap/Image";

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
