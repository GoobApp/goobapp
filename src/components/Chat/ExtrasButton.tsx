import { ChangeEvent, useRef } from "react";
import "../../App.css";
import { socket } from "../../socket";

const ChatExtrasButton = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleInputClick = async (event: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    if (!event.currentTarget.files) return;

    const file = event.currentTarget.files[0];

    if (!file.type.startsWith("image/")) {
      console.error("Not an image file!");
      return;
    }

    formData.append("file", file);

    let bytes = await file.arrayBuffer();

    console.log(bytes);
    socket.emit("upload image", bytes, file.type);
  };

  return (
    <main>
      <button className="chat-extras-button" onClick={handleClick}>
        <div className="chat-extras-text">+</div>
      </button>
      <input
        type="file"
        className="chat-extras-upload-input"
        ref={inputRef}
        onChange={handleInputClick}
        accept="image/*"
      />
    </main>
  );
};

export default ChatExtrasButton;
