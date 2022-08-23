import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import { useUser } from '../../../lib/user.context'
import { Button } from '../../../styles/_app.style'

const users = ['adumble', 'rweasley', 'hgranger', 'triddle', 'ssnape']

const options = users.map((u) => {
  return {
    value: u,
    label: u,
  }
})

const animatedComponents = makeAnimated()

const Groups = () => {
  const { userDetails } = useUser()

  const [unparsedSelected, setUnparsedSelected] = useState([])
  const [membersToInvite, setMembersToInvite] = useState([])
  const [groupMembers, setGroupMembers] = useState([userDetails?.login])

  useEffect(() => {
    setMembersToInvite(unparsedSelected.map(({ value, label }) => value))
  }, [unparsedSelected])

  const onInvite = () => {
    console.log(`Inviting: ${membersToInvite}`)
    console.log('Suppose they all accepted...')
    membersToInvite.forEach((m) => addMember(m))
  }

  const addMember = (newMember: string) => {
    setGroupMembers([...groupMembers, newMember])
  }

  return (
    <>
      <h6>Members</h6>
      <ul>
        {groupMembers.map((m) => (
          <li>{m}</li>
        ))}
      </ul>

      <Select
        options={options}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        value={unparsedSelected}
        onChange={(selectedOptions: any) => setUnparsedSelected(selectedOptions)}
      />

      <Button onClick={onInvite}>Invite</Button>
    </>
  )
}

export default Groups
