import { Link } from "react-router";
import "../App.css";
const GamesList = () => {
  return (
    <div className={"games-list"}>
      <Link to={"/games/plat"}>
        <button className="games-list-button">Plat</button>
      </Link>
      <Link to={"/games/br2"}>
        <button className="games-list-button">Banana Run 2</button>
      </Link>
      <Link to={"/games/br3"}>
        <button className="games-list-button">Banana Run 3</button>
      </Link>
      <Link to={"/games/cfp"}>
        <button className="games-list-button">Click For Points Web</button>
      </Link>
    </div>
  );
};

export default GamesList;
