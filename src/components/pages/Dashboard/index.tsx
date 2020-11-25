import React, { useContext, useEffect, useState } from "react"
import MyBreadcrumbs from "components/headings/MyBreadcrumbs"
import PersonCard from "components/cards/PersonCard"
import PageButtonGroup from "components/groups/PageButtonGroup"
import InsightCardGroup from "components/groups/TutorCardGroup"

import {
  faGlobe,
  faFileAlt,
  faPrint,
  faFileInvoice,
  faDatabase,
  faQuestionCircle,
  faBug,
} from "@fortawesome/free-solid-svg-icons"
import CurrentUserInfo from "contexts/CurrentUserInfo"
import { Insight, PersonInfo, TimelineEvent } from "constants/types"
import { request } from "utils/api"
import { api, methods } from "constants/routes"
import LoadingScreen from "components/suspense/LoadingScreen"
import moment from "moment"
import styles from "./style.module.scss"

interface Props {
  onEventClick: (e: TimelineEvent) => void
}

const Dashboard: React.FC<Props> = ({
  onEventClick
}) => {

  const { info } = useContext(CurrentUserInfo)

  const [insights, setInsights] = useState<Insight[]>(dummyInsights)
  const [loaded, setLoaded] = useState<boolean>(false)

  const updateInsights = () => {
    setLoaded(false)
    request<Insight[]>({
      api: api.EMARKING_ME_DASHBOARD(),
      method: methods.GET
    })
    .then(insights => insights.map(insight => {
      switch(insight.kind) {
        case 'due':
        case 'release':
          insight.event.startDate = moment(insight.event.startDate).toDate()
          insight.event.endDate = moment(insight.event.endDate).toDate()
      }
      return insight
    }))
    .then(insights => {
      console.log(insights)
      setInsights(insights)
    })
    .finally(() => {
      setLoaded(true)
    })
  }

  useEffect(updateInsights, [])

  return (
    <>
      <MyBreadcrumbs />
      <PersonCard info={info()}/>
      <PageButtonGroup buttons={buttons} style={{ marginTop: "2.8rem" }} />
      <div
        style={{
          marginTop: "1.875rem",
        }}>
        <h4 className={styles.insightTitle}>Insights</h4>
        <LoadingScreen
          isLoaded={loaded}
          successful={
            <InsightCardGroup 
              title="Insights" 
              insights={insights}
              onEventClick={onEventClick}
            />}
        />
      </div>

    </>
  )
}

const dummyInsights: Insight[] = []

const buttons = [
  {
    title: "My Record",
    icon: faFileInvoice,
    url: "https://cate.doc.ic.ac.uk/student.cgi?key=2019",
  },
  {
    title: "My Website",
    icon: faGlobe,
    url: `https://www.doc.ic.ac.uk/~br819/`,
  },
  {
    title: "My Imperial",
    icon: faFileAlt,
    url: "https://my.imperial.ac.uk/HomeScreen.aspx",
  },
  {
    title: "TeachDB",
    icon: faDatabase,
    url: "https://teachdb.doc.ic.ac.uk/db/",
  },
  {
    title: "ICT Guides",
    icon: faQuestionCircle,
    url: "https://www.imperial.ac.uk/admin-services/ict/self-service/",
  },
  {
    title: "CSG Guides",
    icon: faQuestionCircle,
    url: "https://www.imperial.ac.uk/computing/csg/guides/",
  },
  {
    title: "Printing",
    icon: faPrint,
    url: "https://ictprintservice.imperial.ac.uk/safecom/webuser.dll/login",
  },
  {
    title: "Report Bugs",
    icon: faBug,
    url: "https://gitlab.doc.ic.ac.uk/edtech/scientia/-/issues/new",
  },
]

const tutors: {
  name: string
  email: string
  address: string
  image: string
}[] = [
  {
    name: "Dr. Zahid Barr",
    email: "zahid.barr@imperial.ac.uk",
    address: "373, Huxley Building",
    image: "/images/tutors/tutor-1.png",
  },
  {
    name: "Dr. Rosalind Baker",
    email: "rosalind.baker@imperial.ac.uk",
    address: "590, Huxley Building",
    image: "/images/tutors/tutor-2.png",
  },
  {
    name: "Mr. Subhaan Wicks",
    email: "subhaan.wicks16@imperial.ac.uk",
    address: "Huxley Building",
    image: "/images/tutors/tutor-3.png",
  },
  {
    name: "Mr. Jack Wu",
    email: "jack.wu16@imperial.ac.uk",
    address: "Huxley Building",
    image: "/images/tutors/tutor-4.jpeg",
  },
  {
    name: "Ms. Sarah Park",
    email: "sarah.park16@imperial.ac.uk",
    address: "Huxley Building",
    image: "/images/tutors/tutor-5.jpeg",
  },
]

const personCard: PersonInfo = {
  name: "Branden Ritter",
  email: "branden.ritter20@imperial.ac.uk",
  id: "BR819",
  cid: "01343896",
  dep: "Department of Computing",
  extra: {
    kind: 'staff',
    title: 'Lecturer'
  }
}
export default Dashboard
