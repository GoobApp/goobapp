import { useRef, useState } from 'react';
import './App.css';
import ChatExtrasButton from './components/ChatExtrasButton';
import ChatInput from './components/ChatInput';
import ChatSendButton from './components/ChatSendButton';
import ChatWindow from './components/ChatWindow';
import SwitcherPanel from './components/SwitcherPanel';
import createChatObject from './utils/ChatMessageObject';
import ChatUsersPanel from './components/ChatUsersPanel';
import ProfileTopBar from './components/ProfileTopBar';

const App = () => {
  let [ messages, setMessages ] = useState([])
  const chatInputRef = useRef(null);
  const chatWindowRef = useRef(null);

  const addNewInput = (newMessage) => {
        if (messages.length < 200)
        {
          setMessages(messages.concat({ newMessage }))
        }
        else
        {
          let newMessages = messages.slice(1)
          setMessages(newMessages.concat({ newMessage }))
        }
    }

  const handleMessageSent = () => {
    const contentText = chatInputRef.current.getInputValueToSend();
    chatWindowRef.current.scrollToBottom();
    if (contentText.trim() != '') {
      const tempProfilePic = "https://picsum.photos/512/512";
      chatWindowRef.current.scrollToBottom();
      addNewInput(createChatObject('John Doe', 0, tempProfilePic, contentText))
    }
  }

  return (
    <div className='wrapper'>
      <ProfileTopBar></ProfileTopBar>
      <SwitcherPanel></SwitcherPanel>
      <ChatWindow messages={messages} ref={chatWindowRef}></ChatWindow>
      <ChatExtrasButton></ChatExtrasButton>
      <ChatInput onSend={handleMessageSent} ref={chatInputRef}></ChatInput>
      <ChatSendButton onSend={handleMessageSent}></ChatSendButton>
      <ChatUsersPanel></ChatUsersPanel>
    </div>
  );
}

export default App;
