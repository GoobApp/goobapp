import "../../../App.css";
import UserProfile from "../../../types/UserProfileObject";
import UserDisplay, { BotDisplay } from "./ActiveUser";

const ChatUsersPanel = ({
  activeUsers,
  maxUsers,
  clientUser,
}: {
  activeUsers: UserProfile[];
  maxUsers: number;
  clientUser: UserProfile;
}) => {
  return (
    <div id="chatUsersPanelContainer" className="chat-users-panel-container">
      <p>Active users ({maxUsers + 1})</p>
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

      <BotDisplay
        isDarkBG={activeUsers.length % 2 == 0}
        botName="Goofy Goober"
        botCall="@goob"
        botProfilePicture="https://raw.githubusercontent.com/GoobApp/backend/refs/heads/main/goofy-goober.png"
      ></BotDisplay>
    </div>
  );
};

export default ChatUsersPanel;
