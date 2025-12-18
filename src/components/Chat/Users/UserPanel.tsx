import { FocusEvent, FocusEventHandler, useEffect, useRef } from "react";
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
      <p className="user-panel-username">{user.username}</p>
      <img
        src={user.userProfilePicture}
        className="user-panel-profile-picture"
      ></img>
      {clientUser.userRole == "Owner" && (
        <button className="user-panel-button" onClick={giveRole}>
          Give user role
        </button>
      )}
    </div>
  );
};

export default UserPanel;
