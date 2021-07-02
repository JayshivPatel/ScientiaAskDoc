import React from "react"
import { mount } from "enzyme"
import { faFileAlt, faFileCode } from "@fortawesome/free-solid-svg-icons"
import BottomBar from "./index"
import BottomBarItem from "./components/BottomBarItem"
import { BrowserRouter } from "react-router-dom"

describe("<BottomBar />", () => {
  const pages = [
    { name: "Page 1", path: "Page 1 URL", icon: faFileCode },
    { name: "Page 2", path: "Page 2 URL", icon: faFileAlt },
  ]
  const wrapper = mount(
    <BrowserRouter>
      <BottomBar pages={pages} />
    </BrowserRouter>
  )
  it("renders one <BottomBarItem/> per given page", () => {
    expect(wrapper.find(BottomBarItem).length).toBe(2)
  })
})
