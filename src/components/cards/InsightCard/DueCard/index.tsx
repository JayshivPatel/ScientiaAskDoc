import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { TimelineEvent } from 'constants/types'
import React from 'react'
import InsightCard from '..'

interface Props {
  event: TimelineEvent,
  onEventClick: (event: TimelineEvent) => void
}

const DueCard: React.FC<Props> = ({
  event,
  onEventClick,
}) => {

  const paragraph = <>
    <p><b>{event.title}</b> under <b>{event.moduleCode}</b> is due soon.</p>
  </>

  return (
    <InsightCard
      paragraph={paragraph} 
      image={{ kind: 'icon', icon: faExclamationCircle }} 
      timestamp={event.endDate} 
      onClick={() => onEventClick(event)}
      important
    />
  )
}

export default DueCard