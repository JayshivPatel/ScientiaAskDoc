import React, { useEffect, useState } from 'react'
import { Send } from 'react-bootstrap-icons'
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

interface MemberOption {
  value: string
  label: string
}

const animatedComponents = makeAnimated()

const Groups = () => {
  const { userDetails } = useUser()
  const [inviteOptions, setInviteOptions] = useState<MemberOption[] | null>(null)
  const [unparsedSelected, setUnparsedSelected] = useState([])
  const [membersToInvite, setMembersToInvite] = useState<string[]>([])
  const [peopleInvited, setPeopleInvited] = useState<string[]>([])
  const [groupMembers, setGroupMembers] = useState([userDetails?.login])

  useEffect(() => {
    setMembersToInvite(unparsedSelected.map(({ value, label }) => value))
  }, [unparsedSelected])

  const onInvite = () => {
    console.log(`Inviting: ${membersToInvite}`)
    membersToInvite.forEach((m) => sendInvite(m))
  }

  const acceptInvite = (newMember: string) => {
    setGroupMembers((prev) => [...prev, newMember])
  }

  const sendInvite = (receiver: string) => {
    setPeopleInvited((prev) => [...prev, receiver])
  }

  useEffect(() => {
    setInviteOptions(getInviteOptions())
  }, [])

  const getInviteOptions = () => {
    // Axios call
    return options
  }

  return (
    <div>
      <ul style={{ marginBottom: '1rem' }}>
        {groupMembers.map((m) => (
          <li>{m}</li>
        ))}
      </ul>

      {peopleInvited.length > 0 && (
        <>
          <h6>Invited:</h6>
          <ul style={{ marginBottom: '1rem' }}>
            {peopleInvited.map((p) => (
              <li>{p}</li>
            ))}
          </ul>
        </>
      )}

      <Select
        options={inviteOptions!}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        value={unparsedSelected}
        onChange={(selectedOptions: any) => setUnparsedSelected(selectedOptions)}
      />

      <Button
        type="button"
        onClick={() => {
          onInvite()
          setUnparsedSelected([])
        }}
        style={{ width: 'auto', padding: '0.5rem', float: 'right' }}
      >
        Invite <Send />
      </Button>

      {
        // Remove the button later, this is just for dev purposes
      }
      <Button
        type="button"
        onClick={() => {
          peopleInvited.forEach((p) => acceptInvite(p))
          setPeopleInvited([])
        }}
      >
        Accept all invites
      </Button>
    </div>
  )
}

export default Groups
