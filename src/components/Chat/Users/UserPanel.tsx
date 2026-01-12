import {
  FocusEvent,
  FocusEventHandler,
  MouseEvent,
  useEffect,
  useRef,
} from "react";
import "../../../App.css";
import { socket } from "../../../socket";
import UserProfileObject from "../../../types/UserProfileObject";
import "./Users.css";

const UserPanel = ({
  user,
  clientUser,
  onClose,
}: {
  user: UserProfileObject;
  clientUser: UserProfileObject;
  onClose: FocusEventHandler<HTMLDivElement> | undefined;
}) => {
  const giveRole = () => {
    const role = window.prompt("Role name to give?");
    if (role != null) {
      socket.emit("give user role", user.userUUID, role);
    }
  };

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (panel) panel.focus();
  }, []);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!panelRef.current?.contains(event.relatedTarget)) {
      onClose?.(event);
    }
  };

  return (
    <div
      className="user-panel-div"
      onBlur={handleBlur}
      tabIndex={-1}
      ref={panelRef}
    >
      <div className="user-panel-background">
        <img
          src={user.userProfilePicture}
          className="user-panel-background-image"
        ></img>
      </div>
      <p className="user-panel-username">{user.username}</p>
      <img
        src={user.userProfilePicture}
        className="user-panel-profile-picture"
      ></img>
      {user.userRole && (
        <span className="user-panel-role">{user.userRole}</span>
      )}
      {clientUser.userRole == "Owner" && (
        <button className="user-panel-button" onClick={giveRole}>
          Give user role
        </button>
      )}
    </div>
  );
};

export default UserPanel;

export const BotPanel = ({
  username,
  profile_picture,
  bot_call,
  onClose,
  clientUser,
}: {
  username: string;
  profile_picture: string;
  bot_call: string;
  clientUser: UserProfileObject;
  onClose: FocusEventHandler<HTMLDivElement> | undefined;
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (panel) panel.focus();
  }, []);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!panelRef.current?.contains(event.relatedTarget)) {
      onClose?.(event);
    }
  };

  const customSystemPrompt = (event: MouseEvent<HTMLButtonElement>) => {
    const prompt = window.prompt("What do you want to set the prompt to?");
    if (prompt !== null) {
      socket.emit("set system prompt", prompt);
    }
  };

  const addToSystemPrompt = (event: MouseEvent<HTMLButtonElement>) => {
    const prompt = window.prompt(
      "What do you want to add the prompt to? NOTE: This will remove the original added prompt"
    );
    if (prompt !== null) {
      socket.emit("add to system prompt", prompt);
    }
  };

  const resetSystemPrompt = (event: MouseEvent<HTMLButtonElement>) => {
    if (
      window.confirm(
        "Are you sure you want to reset the system prompt back to default?"
      )
    ) {
      socket.emit("reset system prompt");
    }
  };

  return (
    <div
      className="user-panel-div"
      onBlur={handleBlur}
      tabIndex={-1}
      ref={panelRef}
    >
      <div className="user-panel-background">
        <img
          src={profile_picture}
          className="user-panel-background-image"
        ></img>
      </div>
      <p className="user-panel-username">{username}</p>
      <img src={profile_picture} className="user-panel-profile-picture"></img>
      <span className="user-panel-role">Bot</span>
      <p>Use {bot_call} to ask</p>
      {clientUser.userRole == "Owner" && (
        <button className="user-panel-button" onClick={customSystemPrompt}>
          Custom system prompt (this commit only)
        </button>
      )}
      {clientUser.userRole == "Owner" && (
        <button className="user-panel-button" onClick={addToSystemPrompt}>
          Add to system prompt (this commit only)
        </button>
      )}
      {clientUser.userRole == "Owner" && (
        <button className="user-panel-button" onClick={resetSystemPrompt}>
          Reset system prompt
        </button>
      )}
    </div>
  );
};
