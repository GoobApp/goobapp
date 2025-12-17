import { useNavigate } from "react-router";
import "../../App.css";
import "./List.css";

const ExtrasList = () => {
  const navigate = useNavigate();

  return (
    <div className={"games-list"}>
      <button
        className="games-list-button"
        onClick={() => navigate("/extras/search", { viewTransition: true })}
      >
        Search
      </button>
    </div>
  );
};

export default ExtrasList;
