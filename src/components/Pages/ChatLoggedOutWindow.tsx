import "./Other.css";

const ChatLoggedOutWindow = () => {
  return (
    <div className="logged-out-page">
      <h1 className="other-element">Welcome to GoobApp!</h1>
      <h2 className="other-element">
        To start chatting, log in or create a new account.
      </h2>
      <h4 className="other-element">
        Or, you can instead just play games on the left.
      </h4>
      <p className="other-element">
        GoobApp is a web-based global chatroom, with some extra little features
        on top.
      </p>
      <a
        className="other-element"
        href="https://github.com/GoobApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="github-link-container">
          View Project on GitHub
        </button>
      </a>

      <img src="/goofy_goober.png" className="goofy-goober"></img>
    </div>
  );
};

export default ChatLoggedOutWindow;
