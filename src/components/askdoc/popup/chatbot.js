import { ChatDots, Robot } from 'react-bootstrap-icons'
import Chatbot from 'react-chatbot-kit'
import { createChatBotMessage } from 'react-chatbot-kit'
import Popup from 'reactjs-popup'

import { Button } from '../../../styles/_app.style'
import { styled } from '../../../styles/stitches.config'
import ActionProvider from '../ActionProvider'
import MessageParser from '../MessageParser'
import Bubbles from './Bubbles'
import Lists from './Lists'
import Warper from './Warper'
import './react-chatbot-kit.css'

const settings = {
  initialMessages: [
    createChatBotMessage(
      'Welcome! I am AskDoc! I can help quickly find relevant links! What would you like to find out more about today?'
    ),
    createChatBotMessage(
      'If you are stuck or don\'t know what I am an expert on, try asking me: "What can you do"'
    ),
  ],
  botName: 'AskDoC',
  widgets: [
    {
      widgetName: 'Bubbles',
      widgetFunc: (props) => <Bubbles {...props} />,
    },
    {
      widgetName: 'Lists',
      widgetFunc: (props) => <Lists {...props} />,
    },
  ],
  customComponents: {
    botAvatar: () => <Robot size={40} />,
  },
}

const ChatContainer = styled('div', {
  'background-color': '$subtleBackground',
  'border-top-right-radius': '15px',
  'border-top-left-radius': '15px',
  border: '2px dashed $elementBorder',
})

const CustomModal = () => (
  <Popup
    trigger={
      <Button css={{ padding: '5px', width: '200px', 'font-size': '18px' }}>
        <ChatDots size={18} />
        AskDoC: Chatbot
      </Button>
    }
    modal
  >
    {() => (
      <ChatContainer>
        <div className="react-chatbot-kit">
          <Chatbot
            config={settings}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      </ChatContainer>
    )}
  </Popup>
)

export default Warper(CustomModal)
