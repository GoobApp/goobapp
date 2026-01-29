import { useEffect, useState } from "react";
import "../../../App.css";
import UserProfile from "../../../types/UserProfileObject";
import { socket } from "../../../utils/Socket";
import UserDisplay from "./ActiveUser";

const DMUsersPanel = ({
  activeUsers,
  clientUser,
  groupId,
}: {
  activeUsers: UserProfile[];
  clientUser: UserProfile;
  groupId: string;
}) => {
  const addUser = () => {
    const user = prompt("Please enter the user's name (case sensitive)");
    if (user != null) {
      socket.emit("add DM user", user, groupId);
    }
  };

  const [dmUserErrorMessage, setDMUserErrorMessage] = useState<string | null>(
    null,
  );

  const onDMUserError = (errorMessage: string) => {
    setDMUserErrorMessage(errorMessage);
  };

  useEffect(() => {
    socket.on("add DM user error", onDMUserError);
    return () => {
      socket.off("add DM user error", onDMUserError);
    };
  });

  return (
    <header id="chatUsersPanelContainer" className="chat-users-panel-container">
      {activeUsers.length > 0 && <p>Users in group: ({activeUsers.length})</p>}
      {activeUsers.map((value: UserProfile, index: number) => {
        return (
          <UserDisplay
            userData={value}
            clientUserData={clientUser}
            isDarkBG={index % 2 == 0}
            key={index}
          ></UserDisplay>
        );
      })}
      {activeUsers.length > 0 && (
        <>
          <button onClick={addUser}>Add user...</button>
          {dmUserErrorMessage != null && (
            <p className="error-message">{dmUserErrorMessage}</p>
          )}
        </>
      )}
    </header>
  );
};

export default DMUsersPanel;
