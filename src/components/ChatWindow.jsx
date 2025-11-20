import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import '../App.css';
import MessageObject from './ChatMessage';

const ChatWindow =forwardRef((props, ref) => {
    const scrollContainerRef = useRef(null);
    let wasAtBottom = useRef(true)

    useImperativeHandle(ref, () => ({
            scrollToBottom: () => {
                const el = scrollContainerRef.current;
                if (!el) return;
                // wasAtBottom = true;
                el.scrollTop = el.scrollHeight;
            }
        }))

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
            let showSpacer = false;

            if (index === 0) {
                showAvatar = true;
                showSpacer = false;
            }
            else
            {
                let prev = props.messages[index - 1];
                if (prev.newMessage.userID !== message.newMessage.userID) {
                    showAvatar = true;
                    showSpacer = true;
                }
            }
        
        return (
            <MessageObject key={message.newMessage.messageId} profilePicture={message.newMessage.userProfilePicture} displayName={message.newMessage.userDisplayName} time={message.newMessage.messageTime.toLocaleString(undefined,{dateStyle: new Date().getDate != message.newMessage.messageTime.getDate() ? 'medium' : 'none', 'timeStyle': 'short'})} content={message.newMessage.userContent} showAvatar={showAvatar} showSpacer={showSpacer}></MessageObject>
        )})}
        </div>
    )
});

export default ChatWindow;