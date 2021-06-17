import React from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import useLocalStorage from "react-use-localstorage"
import styles from "./style.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimes} from "@fortawesome/free-solid-svg-icons"
import TextEntrySetting from "./components/TextEntrySetting"
import ButtonGroupSetting from "./components/ButtonGroupSetting"
import DropDownSetting from "./components/DropDownSetting"
import SettingsSection from "./components/SettingsSection"

interface Props {
  show: boolean
  onHide: any
  fileView: string
  setDarkTheme: (toSet: boolean) => any
  onCardViewClick: (event: React.MouseEvent) => void
  onListViewClick: (event: React.MouseEvent) => void
  year: string
  setYear: Function
}

const SettingsModal: React.FC<Props> = ({
  show,
  onHide,
  fileView,
  setDarkTheme,
  onCardViewClick,
  onListViewClick,
  year,
  setYear,
}) => {
  const [interfaceSize, setInterfaceSize] = useLocalStorage(
    "interfaceSize",
    "90"
  )

  const [theme, setTheme] = useLocalStorage("theme", "default")
  // const [calendarID, setCalendarID] = useLocalStorage("calendarID", "")

  return (
    <Modal
      className={styles.settingsModal}
      dialogClassName={styles.modal}
      show={show}
      onHide={onHide}
      centered>
      <Modal.Header className={styles.modalHeader}>
        <Modal.Title>Settings</Modal.Title>
        <Button
          variant="secondary"
          className={styles.sectionHeaderButton}
          onClick={onHide}>
          <FontAwesomeIcon className={styles.buttonIcon} icon={faTimes} />
        </Button>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <SettingsSection heading="Interface" isFirst>
          <TextEntrySetting
            heading="Size"
            value={interfaceSize}
            setValue={setInterfaceSize}
            confirmValue={(value: any) => {
              document.documentElement.style.fontSize = `${value}%`
            }}
          />

          <ButtonGroupSetting
            heading="Theme"
            value={theme}
            buttons={[
              { value: "default", text: "Default" },
              { value: "light", text: "Light" },
              { value: "dark", text: "Dark" },
            ]}
            onClick={(value: any) => {
              if (value === "default") {
                let mq = window.matchMedia("(prefers-color-scheme: dark)")
                mq.addListener((mq) => setDarkTheme(mq.matches))
                setDarkTheme(mq.matches)
              }
              setDarkTheme(value === "dark")
              setTheme(value)
            }}
          />

          <ButtonGroupSetting
            heading="File View"
            value={fileView}
            buttons={[
              { value: "card", text: "Card" },
              { value: "list", text: "List" },
            ]}
            onClick={(value: any, e: any) => {
              value === "card" ? onCardViewClick(e) : onListViewClick(e)
            }}
          />
        </SettingsSection>

        <SettingsSection heading="Data">
          <DropDownSetting
            heading="Year"
            onChange={setYear}
            value={year}
            options={[
              { value: "2021", text: "2020 - 2021" },
              { value: "1920", text: "2019 - 2020" },
              { value: "1819", text: "2018 - 2019" },
              { value: "1718", text: "2017 - 2018" },
            ]}
          />

          
          {/* <TextEntrySetting
            heading="Calendar ID"
            value={calendarID}
            setValue={setCalendarID}
          />

          {calendarID === "" ? (
            <Alert variant="primary" className={styles.dontBreakOut}>
              Open{" "}
              <Alert.Link
                href="https://www.imperial.ac.uk/timetabling/mytimetable/"
                target="_blank"
              >
                this link
              </Alert.Link>
              , and enter your long email. You should receive an email
              containing:
              <br />
              webcal://www.imperial.ac.uk/timetabling/mytimetable/ical/
              <code>CALENDAR_ID</code>/schedule.ics
              <br />
              Please enter <code>CALENDAR_ID</code> in the box above.
            </Alert>
          ) : null} */}
         
        </SettingsSection>
      </Modal.Body>
    </Modal>
  )
}

export default SettingsModal
