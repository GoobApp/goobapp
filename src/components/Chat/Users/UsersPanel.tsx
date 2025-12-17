import "../../../App.css";
import UserProfile from "../../../types/UserProfileObject";
import UserDisplay from "./ActiveUser";

const ChatUsersPanel = ({
  activeUsers,
  maxUsers,
}: {
  activeUsers: UserProfile[];
  maxUsers: number;
}) => {
  return (
    <div id="chatUsersPanelContainer" className="chat-users-panel-container">
      {activeUsers.length > 0 && <p>Active users ({maxUsers})</p>}
      {activeUsers.map((value: UserProfile, index: number) => {
        return (
          <UserDisplay
            userData={value}
            isDarkBG={index % 2 == 0}
            key={index}
          ></UserDisplay>
        );
      })}
    </div>
  );
};

export default ChatUsersPanel;
