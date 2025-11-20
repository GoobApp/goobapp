import { useRef, useState } from 'react';
import './App.css';
import ChatExtrasButton from './components/ChatExtrasButton';
import ChatInput from './components/ChatInput';
import ChatSendButton from './components/ChatSendButton';
import ChatWindow from './components/ChatWindow';
import SwitcherPanel from './components/SwitcherPanel';
import createChatObject from './utils/ChatMessageObject';

const App = () => {
  let [ messages, setMessages ] = useState([])
  const chatInputRef = useRef(null);

  const addNewInput = (newMessage) => {
        setMessages(messages.concat({ newMessage }))
    }

  const handleMessageSent = () => {
    const contentText = chatInputRef.current.getInputValueToSend();
    if (contentText != '') {
      const tempProfilePic = "https://picsum.photos/512/512";
      addNewInput(createChatObject('John Smith', 0, tempProfilePic, contentText))
    }
  }

  return (
    <div className='wrapper'>
      <ChatWindow messages={messages}></ChatWindow>
      <ChatExtrasButton></ChatExtrasButton>
      <ChatInput onSend={handleMessageSent} ref={chatInputRef}></ChatInput>
      <ChatSendButton onSend={handleMessageSent}></ChatSendButton>
      <SwitcherPanel></SwitcherPanel>
    </div>
  );
}

export default App;
