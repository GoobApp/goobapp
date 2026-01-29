import type { Session } from "@supabase/supabase-js";
import { useLocation } from "react-router";
import "../../App.css";
import UserProfileObject from "../../types/UserProfileObject";
import isTauri from "../../utils/EnvironmentInfo";
import LoginSignupButtons from "./LoginSignupButtons";
import "./Profile.css";
import ProfilePictureButton from "./ProfilePictureButton";

const TopBar = ({
  profile,
  session,
}: {
  profile: UserProfileObject;
  session: Session | null;
}) => {
  const location = useLocation();
  return (
    <div
      className={isTauri ? "profile-top-bar tauri-bar" : "profile-top-bar"}
      data-tauri-drag-region
    >
      <div
        id="profileTopBar"
        className={
          isTauri ? "top-bar-content tauri-top-bar-content" : "top-bar-content"
        }
      >
        <p className="title-text">
          GoobApp{" "}
          {location.pathname.replaceAll("/", " -> ") == " -> "
            ? ""
            : location.pathname.replaceAll("/", " -> ")}
        </p>

        {session ? (
          <ProfilePictureButton profile={profile}></ProfilePictureButton>
        ) : (
          <LoginSignupButtons></LoginSignupButtons>
        )}
      </div>
    </div>
  );
};

export default TopBar;
