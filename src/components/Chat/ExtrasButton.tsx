import { Session } from "@supabase/supabase-js";
import { ChangeEvent, useRef } from "react";
import "../../App.css";
import { SERVER_URL } from "../../socket";

const ChatExtrasButton = ({
  session,
  groupId,
}: {
  session: Session | null;
  groupId: string | null;
}) => {
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

    formData.append("image", file);
    if (groupId) formData.append("groupId", groupId);

    const headers = new Headers();

    const token = session?.access_token;
    if (!token) {
      console.error("Missing session token; aborting upload.");
      return;
    }
    headers.append("Authorization", `Bearer ${token}`);
    let bytes = await file.arrayBuffer();

    let bytes = await file.arrayBuffer();

    fetch(`${SERVER_URL}/upload`, {
      method: "POST",
      body: formData,
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          // If the response is not OK, parse the body for a custom message
          // and throw an error to trigger the .catch block.
          return response.json().then((errorData) => {
            throw new Error(
              errorData.message || `HTTP error! status: ${response.status}`,
            );
          });
        }
      })
      .catch((error) => {
        console.log("Fetch error:", error.message);
      });
  };

  return (
    <div className="chat-button">
      <button type="button" className="chat-button" onClick={handleClick}>
        <div className="chat-extras-text">+</div>
      </button>
      <input
        type="file"
        className="chat-extras-upload-input"
        ref={inputRef}
        onChange={handleInputClick}
        accept="image/*"
      />
    </div>
  );
};

export default ChatExtrasButton;
