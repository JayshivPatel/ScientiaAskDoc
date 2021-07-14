import { RefObject, useEffect } from "react"
import { MAIN_MOUSE_BTN } from "../constants/global"

export default function useOutsideAlerter(
  ref: RefObject<HTMLDivElement>,
  callback: () => void
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      // event.preventDefault();
      if (
        event.button === MAIN_MOUSE_BTN &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        callback()
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}
