import "../App.css";
import GooberImage from "../assets/images/goofy_goober.png";
import "../components/Pages/List.css";

const Loading = ({ className }: { className: string }) => {
  return (
    <main className={className}>
      <div className={"chat-messages loading"}>
        <img className="loading-animation" src={GooberImage} />
        <p>Loading...</p>
      </div>
    </main>
  );
};

export default Loading;
