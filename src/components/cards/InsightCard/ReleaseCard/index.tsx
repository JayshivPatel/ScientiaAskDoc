import { faPenFancy } from '@fortawesome/free-solid-svg-icons'
import { TimelineEvent } from 'constants/types'
import ModalController from 'contexts/ModalController'
import React, { useContext } from 'react'
import InsightCard from '..'
import WriteParagraph from '../paragraph'

interface Props {
  event: TimelineEvent,
}

const ReleaseCard: React.FC<Props> = ({
  event,
}) => {

  const Modals = useContext(ModalController)

  const paragraph = WriteParagraph.begin()
    .bold(event.prefix)
    .write(' ')
    .bold(event.title)
    .write(' under ')
    .bold(event.moduleCode)
    .write(' has just released')
    .end()

  return (
    <InsightCard
      paragraph={paragraph} 
      image={{ kind: 'icon', icon: faPenFancy }} 
      timestamp={event.endDate} 
      onClick={() => Modals.EventModal.show(event)}
    />
  )
}

export default ReleaseCard