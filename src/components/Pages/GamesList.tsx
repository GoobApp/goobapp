import { useNavigate } from "react-router";
import "../../App.css";
import "./List.css";

const GamesList = () => {
  const navigate = useNavigate();

  return (
    <main className="list-window">
      <h1>Games</h1>
      <div className="list">
        <button
          className="button"
          onClick={() => navigate("/games/plat", { viewTransition: true })}
        >
          Plat
        </button>
        <button
          className="button"
          onClick={() => navigate("/games/br2", { viewTransition: true })}
        >
          Banana Run 2
        </button>
        <button
          className="list-button"
          onClick={() => navigate("/games/br3", { viewTransition: true })}
        >
          Banana Run 3
        </button>

        <button
          className="list-button"
          onClick={() => navigate("/games/cfp", { viewTransition: true })}
        >
          Click For Points Web
        </button>

        <button
          className="list-button"
          onClick={() => navigate("/games/c&p", { viewTransition: true })}
        >
          Clicks & Points
        </button>

        <button
          className="list-button"
          onClick={() =>
            navigate("/games/amazing-game-idk-name-yet", {
              viewTransition: true,
            })
          }
        >
          Amazing Game IDK Name Yet (Scratch)
        </button>
      </div>
      <p className="centered">
        Games by{" "}
        <a
          href={"https://precontation.github.io/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          Precontation
        </a>
      </p>
    </main>
  );
};

export default GamesList;
