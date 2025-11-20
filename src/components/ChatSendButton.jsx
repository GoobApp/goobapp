import '../App.css';

const ChatSendButton = ({onSend}) => {
    return (
        <button
        id='sendButton'
        className='chat-button'
        onClick={onSend}
        >
        ↑
        </button>
    )
}

export default ChatSendButton;