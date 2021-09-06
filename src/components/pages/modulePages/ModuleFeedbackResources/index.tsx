import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Feedback } from "../../../../constants/types"
import { request } from "../../../../utils/api"
import { api, methods } from "../../../../constants/routes"
import Dandruff from "../../../headings/Dandruff"
import LoadingScreen from "../../../suspense/LoadingScreen"
import FileCardsView from "./components/FileCardsView"

interface ModuleFeedbackProps {
  year: string
  moduleTitle: string
  moduleID: string
}

const ModuleFeedbackResources: React.FC<ModuleFeedbackProps> = ({
  year,
  moduleTitle,
  moduleID,
}: ModuleFeedbackProps) => {
  const [isLoaded, setIsLoaded] = useState<Boolean>(false)
  const [error, setError] = useState<string>("")

  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([])
  useEffect(() => {
    request({
      endpoint: api.EMARKING_FEEDBACK,
      method: methods.GET,
      body: { year: year, course: moduleID },
      onSuccess: (feedback: Feedback[]) => {
        setFeedbackItems(feedback)
        setIsLoaded(true)
      },
      onError: (message) => {
        setError(message)
        setIsLoaded(true)
      },
    })
  }, [year, moduleID])

  const view = () => {
    return <FileCardsView feedbackItems={feedbackItems} />
  }

  return (
    <>
      <Helmet>
        <title>Feedback | {moduleTitle} | Scientia</title>
      </Helmet>
      <Dandruff
        heading={moduleTitle ? `${moduleID} - ${moduleTitle}` : moduleID}
      />

      <LoadingScreen error={error} isLoaded={isLoaded} successful={view()} />
    </>
  )
}

export default ModuleFeedbackResources
