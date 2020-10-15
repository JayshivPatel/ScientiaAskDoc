import React, { useEffect, useState } from "react"
import styles from "./style.module.scss"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faSeedling, 
  faSun, 
  faCandyCane, 
  faEgg, 
  faUmbrellaBeach,
  faChevronRight, 
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons"
import { Term } from "constants/types"
import ReactToolTip from "react-tooltip"

interface Props {
  term: Term
  showSecondaryMenu: boolean,
  setTerm: React.Dispatch<React.SetStateAction<Term>>
  setShowSecondaryMenu: (set: boolean) => void
  style?: React.CSSProperties
}


const TermSwitcher: React.FC<Props> = ({ 
  term,
  showSecondaryMenu,
  setTerm,
  setShowSecondaryMenu,
  style 
}) => {

  const TERM_GROUP_SWITCH_ID = "term_group_switch" // component id of term group switch button.

  const primaryButtons: [Term, IconDefinition][] = [
    ["Autumn", faCanadianMapleLeaf],
    ["Spring", faSeedling],
    ["Summer", faSun],
  ]

  const secondaryButtons: [Term, IconDefinition][] = [
    ["Christmas", faCandyCane],
    ["Easter", faEgg],
    ["Jun-Sept", faUmbrellaBeach],
  ]

  const [hoverTermGroupSwitch, setHoverTermGroupSwitch] = useState(false)

  const isHoliday = (term: Term) => secondaryButtons.map(([a, _]) => a).includes(term)
  const isTermPresent = (isHoliday(term) === showSecondaryMenu)
  const activeTermGroupSwitch = !hoverTermGroupSwitch && !isTermPresent
  const selectedTermIcon = [...primaryButtons, ...secondaryButtons].find(([a, _]) => a === term)?.[1]!! 

  const makeButton = ([termName, termIcon]: [Term, IconDefinition]) => (
    <Button
      id={termName}
      key={termName}
      data-tip data-for={termName}
      className={styles.termSwitch}
      active={term === termName}
      onClick={() => {
        setShowSecondaryMenu(false)
        setTerm(termName)
        document.getElementById(termName)?.focus()
      }}
      variant="secondary">
      <FontAwesomeIcon icon={termIcon} fixedWidth />
      <ReactToolTip id={termName} place="top" effect="solid">{termName}</ReactToolTip>
    </Button>
  )

  // Force focus onto button when it is active, to avoid ugly grey buttons.
  useEffect(() => {
    if (activeTermGroupSwitch) {
      document.getElementById(TERM_GROUP_SWITCH_ID)?.focus()
    } else if (isTermPresent) {
      // FIXME: Incorrect focusing
      document.getElementById(term)?.focus()
    }
  }, [activeTermGroupSwitch])
  
  /* Term group switch behaviour:
   *   1. [active && icon is selected term]: not hovering, selected term is not in the current term group.
   *   2. [not active && icon is arrow]: hovering, or selected term in current term group.
   */
  const termGroupSwitch = (
    <Button
      id={TERM_GROUP_SWITCH_ID}
      data-tip data-for={"Click to expand"}
      className={styles.termSwitch}
      active={activeTermGroupSwitch}

      onClick={() => setShowSecondaryMenu(!showSecondaryMenu)}
      onMouseEnter={() => setHoverTermGroupSwitch(true)}
      onMouseLeave={() => setHoverTermGroupSwitch(false)}
      variant="secondary">
      <FontAwesomeIcon icon={
        activeTermGroupSwitch 
          ? selectedTermIcon
          : faChevronRight
        } 
        fixedWidth 
      />
      <ReactToolTip id={"more"} place="top" effect="solid">{"more"}</ReactToolTip>
    </Button>
  )

  const allButtons = [...(showSecondaryMenu ? secondaryButtons : primaryButtons).map(makeButton), termGroupSwitch]

  // Only handles 3 main terms, use leftbar for holidays
  return (
    <div style={style} className={styles.timelineTermSwitcher}>
      <ButtonGroup style={{ float: "right" }}>
        {allButtons}
      </ButtonGroup>
    </div>
  )
}

export default TermSwitcher
