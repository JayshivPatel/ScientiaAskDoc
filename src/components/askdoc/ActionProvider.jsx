import React from 'react'
import { createCustomMessage } from 'react-chatbot-kit'

export const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  function updateStatus(toUpdate) {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, toUpdate],
    }))
  }

  function displayTopics() {
    const list = createChatBotMessage('Here are the list of things I can assist with:', {
      widget: 'Lists',
    })
    updateStatus(list)
  }

  function initialGreeting() {
    const initialMessage = createChatBotMessage(
      'Hello, I am the AskDoC chatBot, and I can try to help you out! If you are stuck, try asking me what I can do'
    )
    updateStatus(initialMessage)
  }

  function outputMessage(message) {
    const Message = createChatBotMessage(message)
    updateStatus(Message)
  }

  function outputLinks(link, text) {
    const webLink = createCustomMessage(text, 'link', { payload: { url: link, term: text } })
    updateStatus(webLink)
  }

  function outputInfo() {
    const output = createChatBotMessage("Hey, I'm AskDoC! I was created in August 2022 :)")
    updateStatus(output)
  }

  function generateBubbles(input) {
    const length = input.length
    var string
    if (input[0].keyword === 'EdStem') {
      string =
        "Sorry, but I couldn't find anything. Please see EdStem for more help, or check out our student written DoC FAQs!"
    } else if (length === 1) {
      string = 'This might help:'
    } else {
      string = 'Maybe these will be helpful:'
    }
    const bubbles = createChatBotMessage(string, {
      widget: 'Bubbles',
      payload: input,
    })
    updateStatus(bubbles)
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            displayTopics,
            initialGreeting,
            outputLinks,
            outputMessage,
            outputInfo,
            generateBubbles,
          },
        })
      })}
    </div>
  )
}

export default ActionProvider
