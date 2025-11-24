import '../App.css';
import './ChatMessage.css';
// Is this the worst code i've ever written? I would care but if it works it works
const MessageDisplay = ({displayName, time, content, profilePicture, showAvatar, showSpacer}
  : {
    displayName: string,
    time: string,
    content: string,
    profilePicture: string,
    showAvatar: boolean,
    showSpacer: boolean
  }
) => {
  return (
    <div
      className={showSpacer ? 'chat-message-container-spaced' : 'chat-message-container'}>
        {showAvatar ? <img src={profilePicture} alt="" className="chat-message-profile-picture"/> : <></>}
        {showAvatar ? <p className='chat-message-display-name'>{displayName}</p> : <></>}
        {showAvatar ? <p className='chat-message-time'>{time}</p> : <></>}
        {showAvatar ? <p className='chat-message-content'>{content}</p> : <p className='chat-message-content-no-avatar'>{content}</p>}
    </div>
  );
};

export default MessageDisplay;
