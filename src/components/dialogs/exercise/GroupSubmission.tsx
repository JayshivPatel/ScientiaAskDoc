import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const users = ['hpotter', 'adumble', 'rweasley', 'hgranger']

const options = users.map((u) => {
  return {
    value: u,
    label: u,
  }
})

const animatedComponents = makeAnimated()

const Groups = ({ selected, setSelected }: { selected: any; setSelected: any }) => {
  const handleChange = (selectedOptions: any) => {
    setSelected(selectedOptions)
  }

  return (
    <Select
      options={options}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      value={selected}
      onChange={handleChange}
    />
  )
}

export default Groups
