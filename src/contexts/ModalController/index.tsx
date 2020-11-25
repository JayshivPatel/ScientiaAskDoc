import { CalendarEvent, TimelineEvent } from 'constants/types'
import React from 'react'

interface Context {
  EventModal: {
    show: (e?: TimelineEvent) => void
    hide: () => void
  },
  CalendarModal: {
    show: (e?: CalendarEvent) => void
    hide: () => void
  },
  SettingsModal: {
    show: () => void
    hide: () => void
  }
}

const ModalController = React.createContext<Context>({
  EventModal: {
    show: _ => {},
    hide: () => {}
  },
  CalendarModal: {
    show: _ => {},
    hide: () => {}
  },
  SettingsModal: {
    show: () => {},
    hide: () => {}
  }
  
})

export default ModalController