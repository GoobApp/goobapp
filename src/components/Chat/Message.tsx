import { useRef, useState } from "react";
import { Link } from "react-router";
import "../../App.css";
import ChatMessage from "../../types/ChatMessageObject";
import EmojiList from "../../types/EmojiList";
import UserProfile from "../../types/UserProfileObject";
import { socket } from "../../utils/Socket";
import "./Message.css";

interface MessageChunk {
  style: {
    italics: boolean;
    bold: boolean;
  };

  type: "text" | "emoji" | "link";

  content: string;
}

const MessageDisplay = ({
  message,
  showAvatar,
  showSpacer,
  clientProfile,
  groupId,
}: {
  message: ChatMessage;
  showAvatar: boolean;
  showSpacer: boolean;
  clientProfile: UserProfile;
  groupId: string | null;
}) => {
  const [showHover, setShowHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!message.messageContent && message.messageContent != "") return null;

  const urlSplitRegex =
    /(\b(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  const urlTestRegex = /^(https?|ftp|file):\/\//i;
  const markdownRegex = /([*]+[^*\s][^*]*[*]+)/gi;
  const emojiRegex = /(:[a-zA-Z0-9_]+:)/;

  let messageChunks: MessageChunk[] = [];
  const defaultMessageChunk: MessageChunk = {
    style: {
      italics: false,
      bold: false,
    },

    type: "text",
    content: message.messageContent,
  };

  messageChunks.push(defaultMessageChunk);

  messageChunks.forEach((object) => {
    let urlSplitContent = object.content.split(urlSplitRegex);
    let newObjects: MessageChunk[] = [];

    urlSplitContent.forEach((item) => {
      let newObject: MessageChunk = { ...object };
      newObject.style = { ...object.style };
      newObject.content = item;

      if (urlTestRegex.test(item)) {
        newObject.type = "link";
      }

      newObjects.push(newObject);
    });

    messageChunks.splice(messageChunks.indexOf(object), 1, ...newObjects);
  });

  messageChunks.forEach((object) => {
    let italicsSplitContent = object.content.split(markdownRegex);
    let newObjects: MessageChunk[] = [];

    if (object.type == "link") {
      return;
    }

    italicsSplitContent.forEach((item) => {
      let newObject: MessageChunk = { ...object };
      newObject.style = { ...object.style };
      newObject.content = item;

      if (item.length > 1 && item[0] === "*" && item[item.length - 1] === "*") {
        // Italics
        let newItem = item.slice(1, -1);
        if (
          newItem.length > 1 &&
          newItem[0] === "*" &&
          newItem[newItem.length - 1] === "*"
        ) {
          // Bold
          newItem = item.slice(2, -2);
          newObject.style.bold = true;

          if (
            newItem.length > 1 &&
            newItem[0] === "*" &&
            newItem[newItem.length - 1] === "*"
          ) {
            // Italics + Bold
            newItem = item.slice(3, -3);
            newObject.style.italics = true;
          }
        } else {
          newObject.style.italics = true;
        }

        newObject.content = newItem;
      } else {
        newObject.style.italics = false;
      }

      if (newObject.content != "") {
        newObjects.push(newObject);
      }
    });

    messageChunks.splice(messageChunks.indexOf(object), 1, ...newObjects);
  });

  messageChunks.forEach((object) => {
    let emojiSplitContent = object.content.split(emojiRegex);
    let newObjects: MessageChunk[] = [];

    if (object.type == "link") {
      return;
    }

    emojiSplitContent.forEach((item) => {
      let newObject: MessageChunk = { ...object };
      newObject.style = { ...object.style };
      newObject.content = item;

      if (item[0] === ":" && item[item.length - 1] === ":") {
        const emojiName = item.slice(1, item.length - 1);
        if (emojiName in EmojiList) {
          newObject.type = "emoji";
          newObject.content = emojiName;
        }
      }

      if (newObject.content != "") {
        newObjects.push(newObject);
      }
    });

    messageChunks.splice(messageChunks.indexOf(object), 1, ...newObjects);
  });

  const styledContent = messageChunks.map((object, index) => {
    let node;

    switch (object.type) {
      case "emoji":
        node = (
          <img
            className={
              messageChunks.length == 1
                ? "chat-message-content-emoji big-emoji"
                : "chat-message-content-emoji"
            }
            src={EmojiList[object.content]}
            key={index}
            draggable={false}
          />
        );
        break;
      case "link":
        node = (
          <Link
            to={`/extras/search/?q=${object.content}`}
            viewTransition={true}
            key={index}
          >
            {object.content}
          </Link>
        );
        break;
      case "text":
        node = (
          <p className="chat-message-content-text" key={index}>
            {object.content}
          </p>
        );
        break;
      default: // Should never happen but doesn't hurt
        node = (
          <p className="chat-message-content-text" key={index}>
            {object.content}
          </p>
        );
        break;
    }

    if (object.style.bold) {
      node = <b key={index}>{node}</b>;
    }
    if (object.style.italics) {
      node = <i key={index}>{node}</i>;
    }

    return node;
  });

  const editClicked = () => {
    const ref = contentRef.current;
    if (ref) {
      setIsEditing(true);
      setTimeout(() => {
        ref.contentEditable = "true";
        ref.focus();
        let range = document.createRange();
        range.selectNodeContents(ref);
        let sel = window.getSelection()!;
        sel.removeAllRanges();
        sel.addRange(range);
      }, 0);
    }
  };

  const replyClicked = () => {
    console.warn("Reply not implemented!");
  };

  const deleteClicked = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this message?",
    );
    if (shouldDelete) {
      if (groupId != null)
        socket.emit("dm delete message", message.messageId, groupId);
      else socket.emit("delete message", message.messageId);
    }
  };

  const finishEdit = () => {
    const ref = contentRef.current;
    if (!ref) return;
    if (groupId != null)
      socket.emit("dm edit message", message.messageId, ref.innerText, groupId);
    else socket.emit("edit message", message.messageId, ref.innerText);
    cancelEdit();
  };

  const cancelEdit = () => {
    const ref = contentRef.current;
    if (!ref) return;
    ref.innerText = message.messageContent;
    ref.contentEditable = "false";
    setIsEditing(false);
  };

  const mouseOver = () => {
    setShowHover(true);
  };

  const mouseLeave = () => {
    setShowHover(false);
  };

  return (
    <div
      className={`
        ${
          showHover
            ? "chat-message-container-container-hover"
            : "chat-message-container-container"
        }
        ${showSpacer && "top-spacer"} ${message.messageContent?.toLowerCase().includes("@" + clientProfile.username?.toLowerCase()) && "pinged"}
        `}
      onMouseOver={mouseOver}
      onMouseLeave={mouseLeave}
    >
      <div className={"chat-message-container"}>
        {showAvatar ? (
          <img
            src={
              message.userProfilePicture == ""
                ? undefined
                : message.userProfilePicture
            }
            alt=""
            className="chat-message-profile-picture"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div className="chat-message-no-avatar"></div>
        )}
        {showAvatar && (
          <p className="chat-message-display-name">
            {message.userUUID == "" ? "Deleted user" : message.userDisplayName}
          </p>
        )}
        {showAvatar && message.userRole && (
          <span className="chat-message-role">{message.userRole}</span>
        )}
        {showAvatar && (
          <p className="chat-message-time">
            {message.messageTime.toLocaleString(undefined, {
              dateStyle:
                new Date().getDate() != message.messageTime.getDate()
                  ? "medium"
                  : undefined,
              timeStyle: "short",
            })}
          </p>
        )}

        <div className="chat-message-content">
          <div className="chat-message-content" ref={contentRef}>
            {isEditing ? message.messageContent : styledContent}
          </div>
          {message.isEdited && <p className="chat-message-edited"> (edited)</p>}
          {message.messageImageUrl && (
            <div>
              <br />
              <img
                loading="lazy"
                src={message.messageImageUrl}
                className="chat-message-image"
              />
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="editing-hover-div">
          <button className="hover-button" onClick={finishEdit}>
            Edit
          </button>
          <button className="hover-button" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      )}
      {!isEditing && showHover && (
        <div className="hover-div">
          {((clientProfile.userUUID == message.userUUID &&
            message.messageId != null) ||
            clientProfile.userRole == "Owner") && (
            <button className="hover-button" onClick={editClicked}>
              Edit
            </button>
          )}
          {/* <button className="hover-button" onClick={replyClicked}>
            Reply
          </button>
          */}

          {((clientProfile.userUUID == message.userUUID &&
            message.messageId != null) ||
            clientProfile.userRole == "Owner") && (
            <button className="hover-button" onClick={deleteClicked}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageDisplay;
