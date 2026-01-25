import { useNavigate } from "react-router";
import "../../App.css";
import "./List.css";

const ExtrasList = () => {
  const navigate = useNavigate();

  return (
    <main className="list-window">
      <h1>Extras</h1>
      <div className={"list"}>
        <button
          className="list-button"
          onClick={() => navigate("/extras/search", { viewTransition: true })}
        >
          Search
        </button>
      </div>
    </main>
  );
};

export default ExtrasList;
