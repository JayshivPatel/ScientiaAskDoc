import React from "react"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"

interface Props {
  heading: string
  onChange: Function
  value: any
  options: {
    value: any
    text: string
  }[]
}

const DropDownSetting: React.FC<Props> = ({
  heading,
  value,
  options,
  onChange,
}) => {
  return (
    <Form.Group style={{ alignItems: "center" }} as={Row}>
      <Form.Label column xs="8" sm="8" lg="9">
        {heading}
      </Form.Label>
      <Col xs="4" sm="4" lg="3">
        <Form.Control
          as="select"
          onChange={(e) => {
            onChange(e.target.value)
          }}
          value={value}>
          {options.map(({ text, value }) => (
            <option value={value} key={value}>
              {text}
            </option>
          ))}
        </Form.Control>
      </Col>
    </Form.Group>
  )
}

export default DropDownSetting
