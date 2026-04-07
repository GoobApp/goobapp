import { RefObject, useEffect, useRef, useState } from "react";
import "../App.css";
import UIElement from "../types/UIElementObject";

const UIPopup = ({
  startingChar,
  textAreaRef,
  elements,
}: {
  startingChar: string;
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
  elements: (UIElement | null)[];
}) => {
  const [selectedElementIndex, setSelectedElementIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedElementIndex(0);
  }, [elements]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // ----- Tab complete -----
      if (event.key == "Tab") {
        if (!textAreaRef.current) return;
        if (!elements[selectedElementIndex]) return;

        let i = 0;
        let selectionIndexUntilStart = textAreaRef.current.selectionStart;
        while (
          textAreaRef.current.value[selectionIndexUntilStart] != startingChar &&
          i < 1000
        ) {
          i += 1;
          selectionIndexUntilStart -= 1;
        }

        let textToInsert = elements[selectedElementIndex]?.name.slice(i - 1);
        if (elements[selectedElementIndex].surroundingChar != null) {
          textToInsert += elements[selectedElementIndex].surroundingChar;
        }
        textToInsert += " "; // Add a space for UX

        // Use insertText to replace the selection and preserve the undo stack.
        // i hate javascript
        // Otherwise, I'd just use textArea.setRangeText()
        document.execCommand("insertText", false, textToInsert);

        event.preventDefault();
        return;
      }

      // ----- Up down switching thing -----
      let key: "up" | "down";
      if (event.key == "ArrowUp") {
        key = "up";
      } else if (event.key == "ArrowDown") {
        key = "down";
      } else {
        return;
      }

      event.preventDefault();

      setSelectedElementIndex((prevSelectedIndex) => {
        let index = prevSelectedIndex;
        if (key == "up") index -= 1;
        else index += 1;

        if (index >= elements.length) {
          index = 0;
        } else if (index < 0) {
          index = elements.length - 1;
        }

        return index;
      });
    };

    document.addEventListener("keydown", handleKeyDown); // Do this always when on key down

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }; // Once everything is done and cleaning up, remove the event listener. Not a great garbage collection in react/js D:
  });

  return (
    <div className="ui-popup-container" ref={containerRef}>
      {elements.map((element, index) => {
        if (!element) return null;

        return (
          <div
            key={element.name}
            className={`ui-popup-element ${index == selectedElementIndex ? "selected-element" : ""}`}
          >
            {element.emoji && (
              <img
                src={element.emoji}
                className="ui-popup-emoji"
                alt={element.name}
                key={element.key}
              />
            )}
            {element.picture && (
              <img
                src={element.picture}
                className="user-profile-picture"
                alt={element.name}
                key={element.key}
              />
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
