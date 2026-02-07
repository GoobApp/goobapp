import { Link, useNavigate } from "react-router";
import "../App.css";
import isTauri from "../utils/EnvironmentInfo";
const SwitcherPanel = () => {
  const navigate = useNavigate();

  const handleChatButtonPressed = () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
    }

    Notification.requestPermission().then((result) => {
      console.log(result);
    });

    navigate("/", { viewTransition: true });
  };
  return (
    <nav id="switcherPanelContainer" className="switcher-panel-container">
      <button className="panel-button" onClick={handleChatButtonPressed}>
        Chat
      </button>
      <button
        className="panel-button"
        onClick={() => navigate("/groups", { viewTransition: true })}
      >
        Groups
      </button>
      <button
        className="panel-button"
        onClick={() => navigate("/games", { viewTransition: true })}
      >
        Games
      </button>
      <button
        className="panel-button"
        onClick={() => navigate("/extras", { viewTransition: true })}
      >
        Extras
      </button>

      <div className="footnotes">
        {!isTauri && (
          <a
            href="https://github.com/GoobApp/goobapp/releases/latest/"
            target="_blank"
            className="footnote"
          >
            Get the app!
          </a> // TODO: make this a custom thing instead of opening that
        )}
        <Link to="/tos" className="footnote" viewTransition={true}>
          Terms Of Service
        </Link>
        <Link to="/privacy" className="footnote" viewTransition={true}>
          Privacy Policy
        </Link>
        <em className="footnote">
          GoobApp v{import.meta.env.VITE_APP_VERSION}
        </em>
      </div>
    </nav>
  );
};

export default SwitcherPanel;
