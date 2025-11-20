import '../App.css';

const MessageObject = ({displayName, content, profilePicture, showAvatar}) => {
  return (
    <div
    className='chat-message-container'>
        {showAvatar ? <img src={profilePicture} alt="Profile Picture" className="chat-message-profile-picture"/> : <></>}
        {showAvatar ? <p className='chat-message-display-name'>{displayName}</p> : <></>}
        {showAvatar ? <p className='chat-message-content'>{content}</p> : <p className='chat-message-content-no-avatar'>{content}</p>}
    </div>
  );
};

export default MessageObject;
