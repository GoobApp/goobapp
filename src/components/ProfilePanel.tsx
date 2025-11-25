import "../App.css";
import UserProfileObject from "../types/UserProfileObject";
import "./Profile.css";

const ProfilePanel = ({ profile }: { profile: UserProfileObject }) => {
  const handleSettings = () => {};
  const handleLogOut = () => {};

  return (
    <div className="profile-panel-div">
      <p className="profile-panel-username">
        Hello, {profile.userDisplayName}!
      </p>
      <img
        src={profile.userProfilePicture}
        className="profile-panel-profile-picture"
      ></img>
      <button className="profile-panel-button" onClick={handleSettings}>
        Settings
      </button>
      <button className="profile-panel-button" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default ProfilePanel;
