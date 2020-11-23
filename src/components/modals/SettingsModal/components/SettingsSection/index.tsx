import React, { ReactElement } from "react"
import Form from "react-bootstrap/Form"
import styles from "./style.module.scss"

interface Props {
  heading: string
  children: ReactElement | (ReactElement | null)[]
  isFirst?: boolean
}

const SettingsSection: React.FC<Props> = ({ heading, children, isFirst }) => {
  return (
    <>
      <h5 className={!isFirst ? styles.modalSubHeading : ""}>{heading}</h5>
      <Form className={styles.interfaceGroup}>{children}</Form>
    </>
  )
}

export default SettingsSection
