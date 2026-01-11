import { Session } from "@supabase/supabase-js";
import { forwardRef, useEffect, useRef } from "react";
import "../../App.css";
import ChatInputRef from "../../types/ChatInputRef";
import ChatMessageObject from "../../types/ChatMessageObject";
import UserProfile from "../../types/UserProfileObject";
import ChatInput from "./Input";
import Messages from "./Messages";

type ChatWindowProps = {
  messages: ChatMessageObject[];
  sendMessage: (contentText: string) => void;
  clientProfile: UserProfile;
  isMini: boolean;
  session: Session | null;
};

type MessagesRef = {
  scrollToBottom: () => void;
};

const ChatWindow = forwardRef<MessagesRef, ChatWindowProps>((props, ref) => {
  // Wrap the component with forwardRef so the parent can pass a ref;  useImperativeHandle exposes methods to that ref
  const chatInputRef = useRef<ChatInputRef>(null);
  const messagesRef = useRef<MessagesRef>(null);

  useEffect(() => {
    messagesRef.current?.scrollToBottom(); // Scroll to bottom when page loads
  }, []);

  const handleSent = () => {
    if (!chatInputRef) return;
    const value = chatInputRef.current?.getInputValueToSend();
    messagesRef.current?.scrollToBottom();
    if (value) props.sendMessage(value);
  };

  return (
    <main
      id="chatWindow"
      className={props.isMini ? "chat-mini-window" : "chat-window"}
    >
      <Messages
        messages={props.messages}
        sendMessage={props.sendMessage}
        ref={messagesRef}
        clientProfile={props.clientProfile}
      ></Messages>
      <ChatInput
        onSend={handleSent}
        ref={chatInputRef}
        session={props.session}
      ></ChatInput>
    </main>
  );
});

export default ChatWindow;
