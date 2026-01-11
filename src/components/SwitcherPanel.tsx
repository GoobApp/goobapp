import { Link, useNavigate } from "react-router";
import "../App.css";
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
