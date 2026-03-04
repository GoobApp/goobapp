import "../../App.css";
import { HapticButton } from "../ui/HapticButton";

const ChatSendButton = ({
  onSend,
  disabled,
}: {
  onSend: () => void;
  disabled: boolean;
}) => {
  return (
    <HapticButton
      id="sendButton"
      className="chat-button"
      onClick={onSend}
      disabled={disabled}
    >
      ↑
    </HapticButton>
  );
};

export default ChatSendButton;
