import '../App.css';

const ChatSendButton = ({onSend}) => {
    return (
        <button
        id='sendButton'
        className='chat-extras-button'
        onClick={onSend}
        >
        +
        </button>
    )
}

export default ChatSendButton;