import React, { useEffect, useState } from 'react'
import { PersonPlusFill, Send, X } from 'react-bootstrap-icons'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import { useUser } from '../../../lib/user.context'
import { Button } from '../../../styles/_app.style'
import {
  GroupHeader,
  GroupWrapper,
  InviteButtonsWrapper,
  InviteModeButton,
  StudentList,
} from '../../../styles/exerciseDialog.style'

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

  // Setup start states:
  useEffect(() => {
    setGroupMembers(getGroupMembers())
    setInviteOptions(getInviteOptions())
    setPeopleInvited(getPeopleInvited())
    setLeader(getLeader())
  }, [])

  const isLeader = leader === userDetails?.login

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
      <GroupWrapper>
        <GroupHeader>Members:</GroupHeader>
        <StudentList>
          {groupMembers.map((m) => (
            <li>{`${m}${m === leader ? ' (Leader)' : ''}`}</li>
          ))}
        </StudentList>

        {peopleInvited.length > 0 && (
          <div style={{ marginTop: '0.5rem' }}>
            <GroupHeader>Invited:</GroupHeader>
            <StudentList>
              {peopleInvited.map((p) => (
                <li>{p}</li>
              ))}
            </StudentList>
          </div>
        )}
      </GroupWrapper>

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
              />

              <InviteButtonsWrapper>
                <InviteModeButton
                  type="button"
                  onClick={() => {
                    setUnparsedSelected([])
                    setInviteMode(false)
                  }}
                >
                  <X /> Cancel
                </InviteModeButton>

                <InviteModeButton
                  type="button"
                  onClick={() => {
                    onInvite()
                    setUnparsedSelected([])
                    setInviteMode(false)
                  }}
                  disabled={unparsedSelected.length === 0}
                >
                  <Send /> Send
                </InviteModeButton>
              </InviteButtonsWrapper>
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
