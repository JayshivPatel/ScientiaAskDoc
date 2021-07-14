import React from "react"
import { mount } from "enzyme"
import TutorCard from "./index"
import Image from "react-bootstrap/Image"

describe("<TutorCard />", () => {
  const name = "Alan Turing"
  const email = "aturing@bletchley.co.uk"
  const address = "1 Bletchley Park"
  const image = "alan_touring.jpg"
  const wrapper = mount(
    <TutorCard name={name} email={email} address={address} image={image} />
  )
  it("displays given details", () => {
    expect(wrapper.find(".tutorName").text()).toBe(name)
    expect(wrapper.find(".tutorEmail").text()).toBe(email)
    expect(wrapper.find(".tutorAddress").text()).toBe(address)
    expect(wrapper.find(Image).prop("src")).toBe(image)
  })
})
