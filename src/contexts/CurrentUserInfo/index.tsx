import { PersonInfo } from 'constants/types'
import React from 'react'

export const defaultUserInfo: PersonInfo = {
  name: "Branden Ritter",
  email: "branden.ritter20@imperial.ac.uk",
  id: "BR819",
  cid: "01343896",
  dep: "Department of Computing",
  extra: {
    kind: "student",
    year: "First Year Undergraduate",
    course: "MEng Computing (AI)",
  }
}

const CurrentUserInfo = React.createContext({
  info: defaultUserInfo,
  onChangeCurrentUserInfo: (newInfo: PersonInfo) => {}
})

export default CurrentUserInfo