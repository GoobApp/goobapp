import UIElement from "../types/UIElementObject";

const createUIElement = ({
  newPicture,
  newEmoji,
  newName,
  newKey,
}: {
  newPicture: string | null;
  newEmoji: string | null;
  newName: string;
  newKey: string | number;
}) => {
  let inputObject = {
    picture: newPicture,
    emoji: newEmoji,
    name: newName,
    key: newKey,
  } as UIElement;

  return inputObject;
};

export default createUIElement;
