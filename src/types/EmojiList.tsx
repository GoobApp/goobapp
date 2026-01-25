import cursor from "../assets/images/emojis/c&p/cursor.png";
import dumb from "../assets/images/emojis/c&p/dumb.png";
import melon from "../assets/images/emojis/c&p/melon.png";
import button from "../assets/images/emojis/cfp/button.png";
import clicked from "../assets/images/emojis/cfp/clicked.png";
import goob from "../assets/images/goofy_goober.png";

export interface EmojiDict {
  [key: string]: string; // Keys are strings, values are strings
}

export const EmojiList: EmojiDict = {
  goob: goob,
  button: button,
  clicked: clicked,
  cursor: cursor,
  dumb_cursor: dumb,
  melon_cursor: melon,
};

export default EmojiList;
