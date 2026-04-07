import UIElement from "../types/UIElementObject";

const createUIElement = ({
  newPicture,
  newEmoji,
  newName,
  newKey,
  newSurroundingChar,
}: {
  newPicture: string | null;
  newEmoji: string | null;
  newName: string;
  newKey: string | number;
  newSurroundingChar: string | null;
}) => {
  let inputObject = {
    picture: newPicture,
    emoji: newEmoji,
    name: newName,
    key: newKey,
    surroundingChar: newSurroundingChar,
  } as UIElement;

  return inputObject;
};

export default createUIElement;
