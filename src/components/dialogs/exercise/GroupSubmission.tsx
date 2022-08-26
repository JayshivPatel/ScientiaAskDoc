import React, { useEffect, useState } from 'react'
import { Send } from 'react-bootstrap-icons'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import { useUser } from '../../../lib/user.context'
import { Button } from '../../../styles/_app.style'

// Hard-coded options, remove later
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

  // Setup start states
  useEffect(() => {
    setGroupMembers(getGroupMembers())
    setInviteOptions(getInviteOptions())
    setPeopleInvited(getPeopleInvited())
  }, [])

  const getGroupMembers = () => {
    // Replace with Axios call
    return [userDetails?.login]
  }

  const getInviteOptions = () => {
    // Replace with Axios call
    return options
  }

  const getPeopleInvited = () => {
    // Replace with Axios call
    return peopleInvited
  }

  useEffect(() => {
    setMembersToInvite(unparsedSelected.map(({ value, label }) => value))
  }, [unparsedSelected])

  const onInvite = () => {
    console.log(`Inviting: ${membersToInvite}`)
    membersToInvite.forEach((m) => sendInvite(m))
    // Add next line when Axios calls implemented, to fetch all people now invited:
    // setPeopleInvited(getPeopleInvited)
  }

  const acceptInvite = (newMember: string) => {
    // Replace next line with Axios call
    setGroupMembers((prev) => [...prev, newMember])
  }

  const sendInvite = (receiver: string) => {
    // Replace next line with Axios call
    setPeopleInvited((prev) => [...prev, receiver])
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
