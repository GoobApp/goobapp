import { useNavigate } from "react-router";
import "../App.css";
import { HapticButton } from "./ui/HapticButton";

const SwitcherPanel = () => {
  const navigate = useNavigate();

  const handleButtonPressed = (location: string) => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
    }

    Notification.requestPermission().then((result) => {
      console.log(result);
    });

    navigate(location, { viewTransition: true });
  };

  return (
    <nav id="switcherPanelContainer" className="switcher-panel-container">
      <HapticButton
        className="panel-button"
        onClick={() => handleButtonPressed("/")}
      >
        Chat
      </HapticButton>
      <HapticButton
        className="panel-button"
        onClick={() => handleButtonPressed("/groups")}
      >
        Groups
      </HapticButton>
      <HapticButton
        className="panel-button"
        onClick={() => handleButtonPressed("/games")}
      >
        Games
      </HapticButton>
      <HapticButton
        className="panel-button"
        onClick={() => handleButtonPressed("/extras")}
      >
        Extras
      </HapticButton>

      {/* <div className="footnotes">
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
      </div> */}
    </nav>
  );
};

export default SwitcherPanel;
