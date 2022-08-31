import axios from 'axios'
import React from 'react'

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    let messageLower = message.toLowerCase()

    if (messageLower.includes('hello')) {
      actions.initialGreeting()
      return
    }

    if (
      messageLower.includes('who are you') ||
      messageLower.includes('what is your name') ||
      messageLower.includes('when were you made')
    ) {
      actions.outputInfo()
      return
    }

    if (
      messageLower.includes('tell me what you can do') ||
      messageLower.includes('what can you do')
    ) {
      actions.displayTopics()
      return
    }

    const messageToSend = { message: messageLower }

    axios
      .post('https://ask-doc-example-2.herokuapp.com/askdoc/chat-api/v1', messageToSend)
      .then((response) => {
        processOutput(response)
      })
      .catch((err) => {
        actions.outputMessage("Unfortunately, I'm having trouble connecting...")
        console.log(err)
      })

    async function processOutput(input) {
      const array = input.data.keyword_link_pair
      const length = array.length

      if (
        array === null ||
        array === undefined ||
        array === [] ||
        length === 0 ||
        array[0] === ''
      ) {
        await new Promise((r) => setTimeout(r, 1000))
        actions.generateBubbles([
          { keyword: 'EdStem', link: 'https://edstem.org/us/login' },
          { keyword: 'DoC FAQs', link: '/2122/questions' },
        ])
        return
      }

      actions.generateBubbles(input.data.keyword_link_pair)
    }
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        })
      })}
    </div>
  )
}

export default MessageParser
