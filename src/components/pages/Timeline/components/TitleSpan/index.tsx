import React from 'react'
import styles from './style.module.scss'

interface Props {
  isSingleDay: boolean,
  prefix: string,
  title: string
  hasIcon: boolean
}

const TitleSpan: React.FC<Props> = ({
  isSingleDay,
  prefix,
  title,
  hasIcon
}) => (
  <span
    className={styles.eventTitle}
    style={{
      fontSize: isSingleDay ? "0rem" : "1rem",
      marginRight: hasIcon ? "1.5rem" : "0"
    }}>
    <span
      className={styles.eventPrefix}
      style={{
        fontSize: isSingleDay ? "0.9rem" : "1rem",
      }}>
      {prefix}
    </span>
    &nbsp;{title}
  </span>
)

export default TitleSpan