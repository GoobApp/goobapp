import { useNavigate } from "react-router";
import "../../App.css";
import "./List.css";

const GamesList = () => {
  const navigate = useNavigate();

  return (
    <div className={"games-list"}>
      <button
        className="games-list-button"
        onClick={() => navigate("/games/plat", { viewTransition: true })}
      >
        Plat
      </button>
      <button
        className="games-list-button"
        onClick={() => navigate("/games/br2", { viewTransition: true })}
      >
        Banana Run 2
      </button>
      <button
        className="games-list-button"
        onClick={() => navigate("/games/br3", { viewTransition: true })}
      >
        Banana Run 3
      </button>

      <button
        className="games-list-button"
        onClick={() => navigate("/games/cfp", { viewTransition: true })}
      >
        Click For Points Web
      </button>

      <button
        className="games-list-button"
        onClick={() =>
          navigate("/games/amazing-game-idk-name-yet", { viewTransition: true })
        }
      >
        Amazing Game IDK Name Yet (Scratch)
      </button>
    </div>
  );
};

export default GamesList;
