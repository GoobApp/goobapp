import { useLayoutEffect, useRef } from 'react';
import '../App.css';
import MessageObject from './ChatMessage';

const ChatWindow = (props) => {
    const scrollContainerRef = useRef(null);
    let wasAtBottom = useRef(true)

    useLayoutEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const handleScroll = () => {
            wasAtBottom.current = 
            el.scrollTop + el.clientHeight
            > el.scrollHeight - 200
        };

        handleScroll()
        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, [])

    useLayoutEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        if (wasAtBottom.current) {
            el.scrollTop = el.scrollHeight;
        }
    }, [props.messages]);


    return (
        <div
        id='chatWindow'
        className='chat-window'
        ref={scrollContainerRef}
        >

        {props.messages.map((message, index) => {
            let showAvatar = false;
            if (index === 0) {
                showAvatar = true;
            }
            else
            {
                let prev = props.messages[index - 1];
                if (prev.newMessage.userID !== message.newMessage.userID) {
                    showAvatar = true;
                }
            }
        
        return (
            <MessageObject key={message.newMessage.messageId} profilePicture={message.newMessage.userProfilePicture} displayName={message.newMessage.userDisplayName} content={message.newMessage.userContent} showAvatar={showAvatar}></MessageObject>
        )})}
        </div>
    )
}

export default ChatWindow;