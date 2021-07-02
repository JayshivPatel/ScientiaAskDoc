import { renderHook } from "@testing-library/react-hooks"
import { mount } from "enzyme"
import React, { useRef } from "react"
import useOutsideAlerter from "./useOutsideAlerter"
import each from "jest-each"
import { MAIN_MOUSE_BTN } from "../constants/global"

const MOUSE_BUTTONS = [MAIN_MOUSE_BTN, 1, 2, 3, 4]

describe("useOutsiderAlerter hook", () => {
  const mockEventListener = (): any => {
    const map: { [s: string]: EventListenerOrEventListenerObject } = {}
    document.addEventListener = jest.fn((event, callback) => {
      map[event] = callback
    })
    document.removeEventListener = jest.fn()
    return map
  }

  const ReferenceComponent: React.FC<{ callback: () => void }> = ({
    callback,
  }) => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    useOutsideAlerter(wrapperRef, callback)
    return <div ref={wrapperRef} />
  }

  it("should trigger the wrapped component's callback when clicking on external element with main mouse button", async () => {
    const callback = jest.fn()
    const map = mockEventListener()
    const externalDOMNode = document.createElement("a")

    mount(<ReferenceComponent callback={callback} />)
    await map.mousedown({ target: externalDOMNode, button: MAIN_MOUSE_BTN })
    expect(callback).toBeCalled()
  })

  each(MOUSE_BUTTONS).it(
    "should not trigger the wrapped component's callback when clicking on internal element",
    async (btn) => {
      const callback = jest.fn()
      const map = mockEventListener()
      const wrappedComponent = mount(<ReferenceComponent callback={callback} />)
      const internalDOMNode = wrappedComponent
        .find("ReferenceComponent")
        .getDOMNode()
      await map.mousedown({ target: internalDOMNode, button: btn })
      expect(callback).not.toBeCalled()
    }
  )

  it("should remove last event listener on ref change", async () => {
    const callback1 = () => {}
    const callback2 = () => {}
    const ref1 = renderHook(() => useRef<HTMLDivElement>(null))
    const ref2 = renderHook(() => useRef<HTMLDivElement>(null))
    const MutableRefComponent: React.FC<{
      myRef: React.RefObject<HTMLDivElement>
      callback: () => void
    }> = ({ myRef, callback }) => {
      useOutsideAlerter(myRef, callback)
      return <div />
    }

    mockEventListener()

    const wrapper = mount(
      <MutableRefComponent myRef={ref1.result.current} callback={callback1} />
    )
    expect(document.addEventListener).toBeCalledWith(
      "mousedown",
      expect.anything()
    )
    wrapper.setProps({ myRef: ref2.result.current, callback: callback2 })
    expect(document.removeEventListener).toBeCalledWith(
      "mousedown",
      expect.anything()
    )
    expect(document.addEventListener).toBeCalledWith(
      "mousedown",
      expect.anything()
    )
  })
})
