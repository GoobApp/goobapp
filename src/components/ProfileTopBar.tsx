import "../App.css";
import UserProfileObject from "../types/UserProfileObject";
import "./Profile.css";
import ProfilePictureButton from "./ProfilePictureButton";

const ProfileTopBar = ({ profile }: { profile: UserProfileObject }) => {
  return (
    <div id="profileTopBar" className="profile-top-bar">
      <p className="{title-text}">GoobApp</p>
      <ProfilePictureButton profile={profile}></ProfilePictureButton>
    </div>
  );
};

export default ProfileTopBar;
