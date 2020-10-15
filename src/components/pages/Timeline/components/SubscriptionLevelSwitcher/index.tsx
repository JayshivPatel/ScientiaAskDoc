import React from "react"
import styles from "./style.module.scss"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLeaf, faSeedling, faSun } from "@fortawesome/free-solid-svg-icons"
import { SubscriptionLevel, Term } from "constants/types"

interface Props {
  levelIsActive: (level: SubscriptionLevel) => boolean
  setSubscriptionLevel: (level: SubscriptionLevel) => void
  style?: React.CSSProperties
}
const SubscriptionLevelSwitcher: React.FC<Props> = ({ 
  levelIsActive,
  setSubscriptionLevel, 
  style 
}) => {

  const makeButton = (level: SubscriptionLevel) => (
    <Button
      className={styles.subscriptionLevelSwitch}
      active={levelIsActive(level)}
      onClick={() => setSubscriptionLevel(level)}
      variant="secondary">
      {/* <FontAwesomeIcon icon={faLeaf} fixedWidth /> */}
      {`Lv ${level}`}
    </Button>
  )

  // Only handles 3 main terms, use leftbar for holidays
  return (
    <div style={style} className={styles.subscriptionLevelSwitcher}>
      <ButtonGroup style={{ float: "right" }}>
        {([1, 2, 3] as SubscriptionLevel[]).map(makeButton)}
      </ButtonGroup>
    </div>
  )
}

export default SubscriptionLevelSwitcher
