import "../../App.css";

const ChatSendButton = ({
  onSend,
  disabled,
}: {
  onSend: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      id="sendButton"
      className="chat-button"
      onClick={onSend}
      disabled={disabled}
    >
      ↑
    </button>
  );
};

export default ChatSendButton;
