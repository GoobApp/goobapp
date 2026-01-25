import { Session } from "@supabase/supabase-js";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { maxMessages } from "../../App";
import "../../App.css";
import Loading from "../../Loading";
import { socket } from "../../socket";
import ChatInputRef from "../../types/ChatInputRef";
import {
  default as ChatMessage,
  default as ChatMessageObject,
} from "../../types/ChatMessageObject";
import UserProfile from "../../types/UserProfileObject";
import createChatObject from "../../utils/ChatMessageCreator";
import ChatInput from "./Input";
import Messages from "./Messages";

type ChatWindowProps = {
  clientProfile: UserProfile;
  session: Session | null;
  setDMUsers: (users: UserProfile[]) => void;
};

type MessagesRef = {
  scrollToBottom: () => void;
};

const GroupChatWindow = forwardRef<MessagesRef, ChatWindowProps>(
  (props, ref) => {
    // Wrap the component with forwardRef so the parent can pass a ref;  useImperativeHandle exposes methods to that ref
    const chatInputRef = useRef<ChatInputRef>(null);
    const messagesRef = useRef<MessagesRef>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [users, setUsers] = useState<UserProfile[]>([]);
    const params = useParams();
    const [finishedLoadingMessages, setFinishedLoadingMessages] =
      useState(false);

    const sendMessage = (contentText: string) => {
      if (!props.clientProfile.userUUID) {
        console.error("No userUUID!");
        return;
      }

      if (contentText.trim() != "") {
        // Make sure the content isn't blank!
        let message: ChatMessageObject = createChatObject({
          newUserDisplayName: props.clientProfile.username,
          newUserUUID: props.clientProfile.userUUID,
          newUserProfilePicture: props.clientProfile.userProfilePicture,
          newUserRole: props.clientProfile.userRole,
          newMessageContent: contentText,
          newMessageImageURL: null,
          newIsEdited: false,
        });

        socket.emit("dm message sent", message, params.groupId);
      }
    };

    const onReceiveMessage = (msg: ChatMessage) => {
      msg.messageTime = new Date(msg.messageTime);

      setMessages((prevMessages) =>
        prevMessages.concat(msg).slice(0, maxMessages),
      );
    };

    const onRecentMessagesReceived = (messages: ChatMessage[]) => {
      setFinishedLoadingMessages(true);
      messages.forEach((message) => {
        message.messageTime = new Date(message.messageTime);
      });

      setMessages(messages.reverse().slice(0, maxMessages)); // TODO: just add, though rn its calling the useeffect twice so it kinda breaks if i do that
    };

    const onUsersRecieved = (users: UserProfile[]) => {
      setUsers(users);
      props.setDMUsers(users);
    };

    const onDMNewUser = (user: UserProfile) => {
      setUsers((prevUsers) => {
        let newUsers = prevUsers.concat(user);
        props.setDMUsers(newUsers);
        return newUsers;
      });
    };

    useEffect(() => {
      messagesRef.current?.scrollToBottom(); // Scroll to bottom when page loads
      socket.emit("join group room", params.groupId);
      socket.emit("dm request recent messages", params.groupId);
      socket.emit("dm request all users", params.groupId);

      socket.on("dm receive message", onReceiveMessage);
      socket.on("dm recent messages received", onRecentMessagesReceived);
      socket.on("dm all users received", onUsersRecieved);
      socket.on("DM add new user", onDMNewUser);
      return () => {
        socket.off("dm receive message", onReceiveMessage);
        socket.off("dm recent messages received", onRecentMessagesReceived);
        socket.off("dm all users received", onUsersRecieved);
        socket.off("DM add new user", onDMNewUser);
      };
    }, [params.groupId]);

    const handleSent = () => {
      if (!chatInputRef) return;
      const value = chatInputRef.current?.getInputValueToSend();
      messagesRef.current?.scrollToBottom();
      if (value) sendMessage(value);
    };

    return (
      <main id="groupChatWindow" className={"chat-window group"}>
        {finishedLoadingMessages ? (
          <>
            <Messages
              messages={messages}
              sendMessage={sendMessage}
              ref={messagesRef}
              clientProfile={props.clientProfile}
            ></Messages>
            <ChatInput
              onSend={handleSent}
              ref={chatInputRef}
              session={props.session}
              activeUsers={users}
              isMini={false}
              groupId={params.groupId ? params.groupId : null} // Probably should error out but whatever
            ></ChatInput>
          </>
        ) : (
          <Loading className="chat-messages" />
        )}
      </main>
    );
  },
);

export default GroupChatWindow;
