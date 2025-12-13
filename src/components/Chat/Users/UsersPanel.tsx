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
      <p>Active users ({maxUsers})</p>
      {activeUsers.map((value: UserProfile, index: number) => {
        return (
          <UserDisplay
            userID={value.userID}
            displayName={value.username}
            profilePicture={value.userProfilePicture}
            isDarkBG={index % 2 == 0}
          ></UserDisplay>
        );
      })}
    </div>
  );
};

export default ChatUsersPanel;
