import React from 'react'
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

const Groups = () => (
  <Select options={options} closeMenuOnSelect={false} components={animatedComponents} isMulti />
)

export default Groups
