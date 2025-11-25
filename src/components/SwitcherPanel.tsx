import "../App.css";

const SwitcherPanel = () => {
  return (
    <div id="switcherPanelContainer" className="switcher-panel-container">
      <p>Active users:</p>
      <button className="panel-button">you</button>
      <button className="panel-button">probably noone else</button>
    </div>
  );
};

export default SwitcherPanel;
