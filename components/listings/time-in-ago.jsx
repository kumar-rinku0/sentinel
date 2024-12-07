import React from 'react'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

const TimeInAgo = ({ createdAt }) => {
  const timeAgo = new TimeAgo('en-IN')
  const time = timeAgo.format(new Date(createdAt));
  return (
    <div>
      {time}
    </div>
  )
}

export default TimeInAgo