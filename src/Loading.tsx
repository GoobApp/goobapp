import "./App.css";
import GooberImage from "./assets/images/goofy_goober.png";

const Loading = ({ isMini }: { isMini: boolean }) => {
  return (
    <main
      id="chatWindow"
      className={isMini ? "chat-mini-window" : "chat-window"}
    >
      <div id="chatMessages" className="chat-messages loading">
        <img className="loading-animation" src={GooberImage} />
        <p>Loading...</p>
      </div>
    </main>
  );
};

export default Loading;
