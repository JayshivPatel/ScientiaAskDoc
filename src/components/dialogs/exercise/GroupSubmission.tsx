import React, { useEffect, useState } from 'react'
import { PersonPlusFill, Send, X } from 'react-bootstrap-icons'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import { useUser } from '../../../lib/user.context'
import { Button } from '../../../styles/_app.style'

// Hard-coded options, remove later
const users = ['adumble', 'rweasley', 'hgranger', 'triddle', 'ssnape', 'abc123', 'def456', 'ghi789']

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
  const [leader, setLeader] = useState('')
  const [inviteMode, setInviteMode] = useState(false)

  useEffect(() => {
    console.log(inviteMode)
  }, [inviteMode])

  // Setup start states:
  useEffect(() => {
    setGroupMembers(getGroupMembers())
    setInviteOptions(getInviteOptions())
    setPeopleInvited(getPeopleInvited())
    setLeader(getLeader())
  }, [])

  const isLeader = leader === userDetails?.login

  // Obtain from exercise info once implemented
  const GROUP_SIZE = 4

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

  const getLeader = () => {
    // Replace with Axios call
    return userDetails ? userDetails.login : ''
  }

  // Operations:
  useEffect(() => {
    setMembersToInvite(unparsedSelected.map(({ value, label }) => value))
  }, [unparsedSelected])

  const onInvite = () => {
    console.log(`Inviting: ${membersToInvite}`)
    membersToInvite.forEach((m) => sendInvite(m))
    // Add next line when Axios calls implemented, to fetch all people now invited:
    // setPeopleInvited(getPeopleInvited)
  }

  // TODO: remove along with 'Accept all invites' button, for dev purposes only
  const acceptInvite = (newMember: string) => {
    setGroupMembers((prev) => [...prev, newMember])
  }

  const sendInvite = (receiver: string) => {
    // Replace next line with Axios call
    setPeopleInvited((prev) => [...prev, receiver])
  }

  return (
    <div>
      <ul style={{ marginBottom: '1rem', listStyleType: 'none' }}>
        {groupMembers.map((m) => (
          <li>{`${m}${m === leader ? ' (Leader)' : ''}`}</li>
        ))}
      </ul>

      {peopleInvited.length > 0 && (
        <>
          <h6>Invited:</h6>
          <ul style={{ marginBottom: '1rem', listStyleType: 'none' }}>
            {peopleInvited.map((p) => (
              <li>{p}</li>
            ))}
          </ul>
        </>
      )}

      {isLeader && (
        <>
          {!inviteMode ? (
            <Button
              type="button"
              onClick={() => {
                setInviteMode(true)
              }}
              style={{ width: 'auto', padding: '0.5rem', float: 'right' }}
            >
              <PersonPlusFill /> Invite
            </Button>
          ) : (
            <>
              <Select
                options={inviteOptions!}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                value={unparsedSelected}
                onChange={(selectedOptions: any) => setUnparsedSelected(selectedOptions)}
                isOptionDisabled={() =>
                  unparsedSelected.length >=
                  GROUP_SIZE - (groupMembers.length + peopleInvited.length)
                }
              />

              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                  type="button"
                  onClick={() => {
                    setUnparsedSelected([])
                    setInviteMode(false)
                  }}
                  style={{ width: 'auto', padding: '0.5rem', marginLeft: '0.5rem' }}
                >
                  <X /> Cancel
                </Button>

                <Button
                  type="button"
                  onClick={() => {
                    onInvite()
                    setUnparsedSelected([])
                    setInviteMode(false)
                  }}
                  style={{ width: 'auto', padding: '0.5rem', marginLeft: '0.5rem' }}
                  disabled={unparsedSelected.length === 0}
                >
                  <Send /> Send
                </Button>
              </div>
            </>
          )}
        </>
      )}

      {
        // TODO: Remove this button later, it's just for dev purposes
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
