import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { TimelineEvent } from 'constants/types'
import ModalController from 'contexts/ModalController'
import React, { useContext } from 'react'
import InsightCard from '..'

interface Props {
  event: TimelineEvent,
}

const DueCard: React.FC<Props> = ({
  event,
}) => {

  const Modals = useContext(ModalController)

  if (event.status === 'complete') {
    const paragraph = <>
      <p><b>{event.prefix}</b> <b>{event.title}</b> under <b>{event.moduleCode}</b> is due soon.</p>
      <p>You have successfully submitted your work!</p>
    </>
    return (
      <InsightCard
        paragraph={paragraph} 
        image={{ kind: 'icon', icon: faExclamationCircle }} 
        timestamp={event.endDate} 
        onClick={() => Modals.showEventModal(event)}
        ok
      />
    )
  }

  const paragraph = <>
    <p><b>{event.prefix}</b> <b>{event.title}</b> under <b>{event.moduleCode}</b> is due soon.</p>
  </>

  return (
    <InsightCard
      paragraph={paragraph} 
      image={{ kind: 'icon', icon: faExclamationCircle }} 
      timestamp={event.endDate} 
      onClick={() => Modals.showEventModal(event)}
      important
    />
  )
}

export default DueCard