import { FormEvent, useState } from "react";
import "../../App.css";
import { socket } from "../../socket";
import UserProfile from "../../types/UserProfileObject";
import { Client } from "../supabase/Client";
import "./SettingsPage.css";

const SettingsPage = ({ profile }: { profile: UserProfile }) => {
  const handleUsernameChange = async (event: FormEvent) => {
    event.preventDefault();
    if (!Client) return;
    const { data, error } = await Client.from("profiles")
      .update({ username: username })
      .eq("user_uuid", profile.userUUID);

    if (error) {
      console.error(error.message);
      setUsernameError(error.message);
    }
  };

  const handlePasswordChange = async (event: FormEvent) => {
    event.preventDefault();
    if (password != confPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    if (!Client) return;
    const { data, error } = await Client.auth.updateUser({
      password: password,
    });

    if (error) {
      console.error(error.message);
      setPasswordError(error.message);
    }
  };

  const handleProfilePictureChange = async (event: FormEvent) => {
    event.preventDefault();
    if (!Client) return;
    const { data, error } = await Client.from("profiles")
      .update({ profile_image_url: profileUrl })
      .eq("user_uuid", profile.userUUID);

    if (error) {
      console.error(error.message);
      setProfileURLError(error.message);
    }
  };

  const handleDeleteAccount = () => {
    socket.emit("delete account");
  };

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [profileUrl, setProfileURL] = useState<string>("");

  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [profileUrlError, setProfileURLError] = useState<string>("");

  return (
    <div className="settings-page">
      <div className="setting-panel">
        <h1 className="setting-element">Settings</h1>
      </div>
      <form className="setting-panel" onSubmit={handleUsernameChange}>
        <h2 className="setting-element">Change username</h2>
        <input
          placeholder="Username"
          className="setting-input"
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <button
          type="submit"
          className="setting-button"
          disabled={username == ""}
        >
          Update
        </button>
        {usernameError != "" && (
          <p className="setting-error">Error: {usernameError}</p>
        )}
      </form>
      <form className="setting-panel" onSubmit={handlePasswordChange}>
        <h2 className="setting-element">Change password</h2>
        <input
          placeholder="Password"
          type="password"
          className="setting-input"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <input
          placeholder="Confirm password"
          type="password"
          className="setting-input"
          onChange={(event) => setConfPassword(event.target.value)}
        ></input>
        <button
          type="submit"
          className="setting-button"
          disabled={
            password == "" || confPassword == "" || password != confPassword
          }
        >
          Update
        </button>
        {password != confPassword && password != "" && confPassword != "" && (
          <p className="setting-error">Passwords do not match!</p>
        )}
        {passwordError != "" && (
          <p className="setting-error">Error: {passwordError}</p>
        )}
      </form>
      <form className="setting-panel" onSubmit={handleProfilePictureChange}>
        <h2 className="setting-element">Change profile picture</h2>
        <input
          placeholder="New profile picture link"
          className="setting-input"
          onChange={(event) => setProfileURL(event.target.value)}
        ></input>
        <button
          type="submit"
          className="setting-button"
          disabled={profileUrl == ""}
        >
          Update
        </button>
        {profileUrlError != "" && (
          <p className="setting-error">Error: {profileUrlError}</p>
        )}
      </form>
      {/* <button className="setting-delete-button" onClick={handleDeleteAccount}>
        Delete Account!
      </button> */}
    </div>
  );
};

export default SettingsPage;
