import { MouseEvent, useEffect } from "react";
import "../../../App.css";
import useClickOutside from "../../../hooks/useClickOutside";
import UserProfileObject from "../../../types/UserProfileObject";
import { socket } from "../../../utils/Socket";
import "./Users.css";

const UserPanel = ({
  user,
  clientUser,
  onClose,
}: {
  user: UserProfileObject;
  clientUser: UserProfileObject;
  onClose: () => void;
}) => {
  const giveRole = () => {
    const role = window.prompt("Role name to give?");
    if (role != null) {
      socket.emit("give user role", user.userUUID, role);
    }
  };

  const panelRef = useClickOutside(onClose);

  useEffect(() => {
    const panel = panelRef.current;
    if (panel) panel.focus();
  }, []);

  return (
    <div>
      <div className="panel-form user-panel-div" tabIndex={-1} ref={panelRef}>
        <div className="user-panel-background">
          <img
            draggable={false}
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
  onClose: () => void;
}) => {
  const panelRef = useClickOutside(onClose);

  useEffect(() => {
    const panel = panelRef.current;
    if (panel) panel.focus();
  }, []);

  const customSystemPrompt = (event: MouseEvent<HTMLButtonElement>) => {
    const prompt = window.prompt("What do you want to set the prompt to?");
    if (prompt !== null) {
      socket.emit("set system prompt", prompt);
    }
  };

  const addToSystemPrompt = (event: MouseEvent<HTMLButtonElement>) => {
    const prompt = window.prompt(
      "What do you want to add the prompt to? NOTE: This will remove the original added prompt",
    );
    if (prompt !== null) {
      socket.emit("add to system prompt", prompt);
    }
  };

  const resetSystemPrompt = (event: MouseEvent<HTMLButtonElement>) => {
    if (
      window.confirm(
        "Are you sure you want to reset the system prompt back to default?",
      )
    ) {
      socket.emit("reset system prompt");
    }
  };

  return (
    <div>
      <div className="panel-form user-panel-div" tabIndex={-1} ref={panelRef}>
        <div className="user-panel-background">
          <img
            src={profile_picture}
            draggable={false}
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
    </div>
  );
};
