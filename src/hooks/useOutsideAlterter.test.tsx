import { renderHook } from '@testing-library/react-hooks'
import { mount } from 'enzyme'
import React from 'react'
import { useRef } from 'react'
import useOutsideAlerter, {} from './useOutsideAlerter'

describe("Test 'useOutsiderAlerter' hook", () => {

  const mockEventListener = (): any => {
    const map: { [s: string]: EventListenerOrEventListenerObject} = {}
    document.addEventListener = jest.fn((event, callback) => {
      map[event] = callback;
    })
    document.removeEventListener = jest.fn()
    return map
  }

  const Component: React.FC<{ callback: () => void }> = ({ callback }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(wrapperRef, callback)
    return <div ref={wrapperRef}/>
  }

  it('Should trigger callback when not click on the component', async () => {
    const callback = jest.fn()
    const map = mockEventListener()
    mount(<Component callback={callback} />)
    await map.mousedown({ target: document.createElement('a'), button: 0 })
    expect(callback).toBeCalled()
  })

  it('Should not trigger callback click on the component', async () => {
    const callback = jest.fn()
    const map = mockEventListener()
    const wrapper = mount(<Component callback={callback} />)
    await map.mousedown({ target: wrapper.find('Component').getDOMNode(), button: 0 })
    expect(callback).not.toBeCalled()
  })

  it('Should not trigger callback when click with other button', async () => {
    const callback = jest.fn()
    const map = mockEventListener()
    mount(<Component callback={callback} />)
    await map.mousedown({ target: document.createElement('a'), button: 1 })
    expect(callback).not.toBeCalled()
  })

  it('Should remove last event listener on ref change', async () => {
    const callback1 = () => {}
    const callback2 = () => {}
    const ref1 = renderHook(() => useRef<HTMLDivElement>(null))
    const ref2 = renderHook(() => useRef<HTMLDivElement>(null))
    const MutableRefComponent: React.FC<{myRef: React.RefObject<HTMLDivElement>, callback: () => void}> = ({myRef, callback}) => {
      useOutsideAlerter(myRef, callback)
      return <div/>
    }

    mockEventListener()

    const wrapper = mount(<MutableRefComponent myRef={ref1.result.current} callback={callback1}/>)
    expect(document.addEventListener).toBeCalledWith('mousedown', expect.anything())
    wrapper.setProps({ myRef: ref2.result.current, callback: callback2 })
    expect(document.removeEventListener).toBeCalledWith('mousedown', expect.anything())
    expect(document.addEventListener).toBeCalledWith('mousedown', expect.anything())


  })
})