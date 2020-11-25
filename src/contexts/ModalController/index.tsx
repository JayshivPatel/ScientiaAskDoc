import { TimelineEvent } from 'constants/types'
import React from 'react'

interface Context {
  showEventModal: (e?: TimelineEvent) => void
  hideEventModal: () => void
}

const ModalController = React.createContext<Context>({
  showEventModal: _ => {},
  hideEventModal: () => {},
})

export default ModalController