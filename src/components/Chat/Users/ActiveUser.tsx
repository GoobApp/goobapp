import { useState } from "react";
import "../../../App.css";
import UserProfile from "../../../types/UserProfileObject";
import UserPanel from "./UserPanel";
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
    <main>
      <button
        className={isDarkBG ? "user-container-dark" : "user-container-light"}
        onClick={clickedUser}
      >
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
