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
    <div id="switcherPanelContainer" className="switcher-panel-container">
      <button className="panel-button" onClick={handleChatButtonPressed}>
        Chat
      </button>
      <button
        className="panel-button"
        onClick={() => navigate("/games", { viewTransition: true })}
      >
        Games
      </button>

      <div className="footnotes">
        <Link to="/tos" className="footnote" viewTransition={true}>
          Terms Of Service
        </Link>
        <Link to="/privacy" className="footnote" viewTransition={true}>
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default SwitcherPanel;
