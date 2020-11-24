import React from "react"
import Image from "react-bootstrap/Image"
import Container from "react-bootstrap/Container"
import styles from "./style.module.scss"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"
import classNames from "classnames"

export interface Props {
  important?: boolean
  paragraph: JSX.Element
  timestamp: Date
  image: { kind: 'icon', icon: IconDefinition } | { kind: 'img', image: string}
  onClick: (e: React.MouseEvent) => void 
}

const InsightCard: React.FC<Props> = ({
  important,
  paragraph,
  timestamp,
  image,
  onClick
}) => {

  const imageDisplay = (() => {
    switch(image.kind) {
      case 'icon':
        return <FontAwesomeIcon icon={image.icon} size={'3x'} style={{ marginRight: '0.7rem', color: important ? 'var(--pink-background)' : undefined }}/>
      case 'img':
        return <Image className={styles.insightImage} src={image.image} />
    }
  })()

  return (
    <>
      <Container
        className={classNames(styles.insightContainer, important ? styles.important : undefined)}
        onClick={onClick}>
        {imageDisplay}
        <div>
          {paragraph}
          <p className={styles.insightAddress}>{moment(timestamp).fromNow()}</p>
        </div>
      </Container>
    </>
  )
}

export default InsightCard
