import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../../App.css";
import useClickOutside from "../../hooks/useClickOutside";
import UserProfileObject from "../../types/UserProfileObject";
import isTauri from "../../utils/EnvironmentInfo";
import { Client } from "../supabase/Client";
import "./Profile.css";

const ProfilePanel = ({
  profile,
  onClose,
}: {
  profile: UserProfileObject;
  onClose: () => void;
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSettings = () => {
    onClose();
    navigate("/settings", { viewTransition: true });
  };

  const handleLogOut = async () => {
    try {
      setError(null);
      setIsLoggingOut(true);
      if (!Client) return;
      const { error } = await Client.auth.signOut();
      if (error) throw error;
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error!");
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    const panel = panelRef.current;
    if (panel) panel.focus();
  }, []);

  const panelRef = useClickOutside(onClose);

  return (
    <div
      className={
        isTauri
          ? "profile-panel-div panel-div tauri-panel-form"
          : "profile-panel-div profile-panel-not-tauri"
      }
      tabIndex={-1}
      ref={panelRef}
    >
      <p className="profile-panel-username">Hello, {profile.username}!</p>
      <div className="profile-panel-background">
        <img
          src={profile.userProfilePicture}
          className="profile-panel-background-image"
          draggable={false}
        ></img>
      </div>
      <img
        src={profile.userProfilePicture}
        className="profile-panel-profile-picture"
      ></img>
      {profile.userRole && (
        <span className="profile-panel-role">{profile.userRole}</span>
      )}
      <button className="profile-panel-button" onClick={handleSettings}>
        Settings
      </button>
      <button className="profile-panel-button" onClick={handleLogOut}>
        {isLoggingOut ? "Loading..." : "Log Out"}
        <div className="error-message">{error}</div>
      </button>
    </div>
  );
};

export default ProfilePanel;
