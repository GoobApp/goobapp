import "../App.css";
import UIElement from "../types/UIElementObject";

const UIPopup = ({ elements }: { elements: (UIElement | null)[] }) => {
  return (
    <div className="ui-popup-container">
      {elements.map((element, index) => {
        if (!element) return null;
        return (
          <div key={element.name} className="ui-popup-element">
            {element.emoji && (
              <img src={element.emoji} className="ui-popup-emoji" alt={element.name} />
            )}
            <p>{element.name}</p>
          </div>
          // TODO: Replace with button
        );
      })}
    </div>
  );
};

export default UIPopup;
