import { useState } from "react";
import "../../../App.css";
import UserProfile from "../../../types/UserProfileObject";
import UserPanel, { BotPanel } from "./UserPanel";
import "./Users.css";

const UserDisplay = ({
  userData,
  isDarkBG,
  clientUserData,
}: {
  userData: UserProfile;
  isDarkBG: boolean;
  clientUserData: UserProfile;
}) => {
  const [openedUserMenu, setOpenedUserMenu] = useState(false);

  const clickedUser = () => {
    setOpenedUserMenu(!openedUserMenu);
  };

  return (
    <main className={isDarkBG ? "user-container-dark" : "user-container-light"}>
      <button className={"user-container-button"} onClick={clickedUser}>
        <img
          src={userData.userProfilePicture}
          alt=""
          className="user-profile-picture"
        />

        <span className="username">
          {userData.userID == "0" ? "Deleted user" : userData.username}
        </span>
        {userData.userRole && <span className="role">{userData.userRole}</span>}
      </button>

      {openedUserMenu && (
        <UserPanel
          user={userData}
          clientUser={clientUserData}
          onClose={() => {
            setOpenedUserMenu(false);
          }}
        ></UserPanel>
      )}
    </main>
  );
};

export default UserDisplay;

export const BotDisplay = ({
  botName,
  botCall,
  botProfilePicture,
}: {
  botName: string;
  botCall: string;
  botProfilePicture: string;
}) => {
  const [openedUserMenu, setOpenedUserMenu] = useState(false);

  const clickedUser = () => {
    setOpenedUserMenu(!openedUserMenu);
  };

  return (
    <div className={"user-container-dark"}>
      <button className={"user-container-button"} onClick={clickedUser}>
        <img src={botProfilePicture} alt="" className="user-profile-picture" />

        <div className="stacked-div">
          <span className="username">{botName}</span>
          <span className="username bot-call">Use {botCall} to ask</span>
        </div>

        <span className="role">{"Bot"}</span>
      </button>

      {openedUserMenu && (
        <BotPanel
          username={botName}
          bot_call={botCall}
          profile_picture={botProfilePicture}
          onClose={() => {
            setOpenedUserMenu(false);
          }}
        ></BotPanel>
      )}
    </div>
  );
};
