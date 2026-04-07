import { Session } from "@supabase/supabase-js";
import {
  FormEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "../../App.css";
import EmojiList from "../../types/EmojiList";
import UserProfile from "../../types/UserProfileObject";
import createUIElement from "../../utils/UIElementCreator";
import UIPopup from "../../utils/UIPopup";
import ChatExtrasButton from "./ExtrasButton";
import "./Input.css";
import ChatSendButton from "./SendButton";

const ChatInput = forwardRef(
  (
    {
      onSend,
      session,
      activeUsers,
      isMini,
      groupId,
    }: {
      onSend: () => void;
      session: Session | null;
      activeUsers: UserProfile[];
      isMini: boolean;
      groupId: string | null;
    },
    ref,
  ) => {
    // Wrap the component with forwardRef so the parent can pass a ref;  useImperativeHandle exposes methods to that ref
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [textAreaValue, setTextAreaValue] = useState(""); // useState is used to make React update stuff on the screen when something changes
    const [isInputBlank, setIsInputBlank] = useState(true);
    const maxLength: number = 1201;

    const onChange = (event: FormEvent<HTMLTextAreaElement>) => {
      const target = event.currentTarget;
      setIsInputBlank(target.value == "");
      setTextAreaValue(target.value); // for some reason React makes setting vars a function with useState. probably because it needs to update the page
    };

    const onSubmit = (event: FormEvent | KeyboardEvent) => {
      event.preventDefault();
      if (textAreaValue.length <= maxLength) {
        if (!isInputBlank) {
          onSend(); // This will send the onSend function up to the parent
          if (textAreaRef.current) textAreaRef.current.value = "";
        }
      }
    };

    useImperativeHandle(ref, () => ({
      // Think of this as a more complex version of a public method in C#
      getInputValueToSend: () => {
        // This is one of these methods, and adding more is like adding to a dictionary. This one just returns the current value.
        if (!textAreaRef.current) return; // Typescript thing to ensure safety, otherwise error. Just makes sure inputRef is not null
        setTextAreaValue("");
        setIsInputBlank(true);
        return textAreaValue;
      },
    }));

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (document.activeElement) {
          if (document.activeElement instanceof HTMLElement) {
            let activeElement: HTMLElement = document.activeElement;
            if (
              activeElement instanceof HTMLInputElement ||
              activeElement instanceof HTMLTextAreaElement ||
              activeElement.isContentEditable
            ) {
              if (
                document.activeElement.parentElement?.parentElement?.id !=
                "chatInputForm"
              )
                return; // Don't refocus if something like an input is already focused!
            }
          }
        }

        if (event.key == "Enter" && !event.shiftKey) {
          if (textAreaRef.current) {
            if (document.activeElement == textAreaRef.current) {
              // Check to make sure it's the focused element before you submit!!
              onSubmit(event);
            }
          }

          event.preventDefault(); // Prevent the default beheivor of stuff (textarea, form, etc). In this case its for textarea
          return;
        }

        // This will focus the input box any time any character is pressed, as long as it's a valid character.
        const otherKeys = [
          "Shift",
          "CapsLock",
          "ArrowDown",
          "ArrowUp",
          "ArrowRight",
          "ArrowLeft",
          "Tab",
          "Escape",
          "F1",
          "F2",
          "F3",
          "F4",
          "F5",
          "F6",
          "F7",
          "F8",
          "F9",
          "F10",
          "F11",
          "F12",
          "Home",
          "End",
          "PageUp",
          "PageDown",
          "Insert",
          " ",
        ];

        if (
          (event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            otherKeys.includes(event.key)) &&
          !(
            ((navigator.userAgent.includes("Mac") && event.metaKey) ||
              (!navigator.userAgent.includes("Mac") && event.ctrlKey)) &&
            ["v", "a", "b", "i"].includes(event.key.toLowerCase())
          ) // V is paste, A is select all, B is bold, and I is italics
        ) {
          return; // Don't refocus if it's not a valid character
        }

        textAreaRef.current?.focus(); // Focus the text area if everythings good!

        if (
          ((navigator.userAgent.includes("Mac") && event.metaKey) ||
            (!navigator.userAgent.includes("Mac") && event.ctrlKey)) &&
          ["b", "i"].includes(event.key.toLowerCase())
        ) {
          event.preventDefault();
          const textArea = textAreaRef.current;
          if (textArea) {
            let thingToInsert = "*";
            switch (event.key) {
              case "b":
                thingToInsert = "**";
                break;
              case "i":
                thingToInsert = "*";
                break;
              default:
                break;
            }

            const start = textArea.selectionStart;
            const end = textArea.selectionEnd;
            const selection = textArea.value.slice(start, end);

            // TODO: press ctrl b/i if already italics should undo italics
            const replacement = thingToInsert + selection + thingToInsert;

            // Use insertText to replace the selection and preserve the undo stack.
            // i hate javascript
            // Otherwise, I'd just use textArea.setRangeText()
            document.execCommand("insertText", false, replacement);
            textArea.setSelectionRange(
              start + thingToInsert.length,
              end + thingToInsert.length,
            );
          }
        }

        if (document.activeElement !== textAreaRef.current) {
          if (!textAreaRef.current || isMini)
            // Only refocus if it's not already focused and not mini!!
            return; // Typescript thing to ensure safety, otherwise error. Just makes sure inputRef is not null
          textAreaRef.current.focus(); // Focus the text area
          const range = document.createRange(); // Create a new range object
          const selection = window.getSelection(); // Get the current selection object
          range.selectNodeContents(textAreaRef.current); // Select the element (more advanced than that i think but who knows)
          range.collapse(false); // Place the cursor at the end
          selection?.removeAllRanges(); // Remove existing selections

          // Add the new range to the selection
          selection?.addRange(range);
        }
      };

      document.addEventListener("keydown", handleKeyDown); // Do this always when on key down

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      }; // Once everything is done and cleaning up, remove the event listener. Not a great garbage collection in react/js D:
    }, [textAreaValue]);

    useEffect(() => {
      const emojiMatch = textAreaValue.match(emojiInputRegex);
      if (emojiMatch) {
        setEmojiStart(emojiMatch[0].split(":")[1]);
      }

      const atUsersMatch = textAreaValue.match(atUsersInputRegex);
      if (atUsersMatch) {
        setAtUsersStart(atUsersMatch[0].split("@")[1]);
      }
    }, [textAreaValue]);

    const [emojiStart, setEmojiStart] = useState<string>("");
    const [atUsersStart, setAtUsersStart] = useState<string>("");

    useEffect(() => {
      const emojis = Object.entries(EmojiList).filter(([name, emoji]) => {
        return name.includes(emojiStart);
      });

      setActiveEmojisUI(emojis);
    }, [emojiStart]);

    useEffect(() => {
      if (!activeUsers) return;
      const users = activeUsers.filter((user) => {
        return user.username.toLowerCase().includes(atUsersStart.toLowerCase());
      });

      setAtUsersUI(users);
    }, [atUsersStart, activeUsers]);

    const emojiInputRegex = /(^|\s|[(]):(?![^\s]*[\s:])[^\s]*/; // I hate regex
    const atUsersInputRegex = /(^|\s|[(])@(?![^\s]*[\s])[^\s]*/; // This is probably the worst regex you'll ever see

    const [activeEmojisUI, setActiveEmojisUI] = useState<[string, string][]>();
    const [atUsersUI, setAtUsersUI] = useState<UserProfile[]>();

    return (
      <div className="chat-input-form-container">
        {emojiInputRegex.test(textAreaValue) && activeEmojisUI && (
          <UIPopup
            startingChar=":"
            textAreaRef={textAreaRef}
            elements={activeEmojisUI.slice(0, 5).map(([name, emoji]) => {
              return createUIElement({
                newPicture: null,
                newEmoji: emoji,
                newName: name,
                newKey: name,
                newSurroundingChar: ":",
              });
            })}
          />
        )}

        {atUsersInputRegex.test(textAreaValue) && atUsersUI && (
          <UIPopup
            startingChar="@"
            textAreaRef={textAreaRef}
            elements={atUsersUI.slice(0, 5).map((user) => {
              return createUIElement({
                newPicture: user.userProfilePicture,
                newEmoji: null,
                newName: user.username,
                newKey: user.userUUID,
                newSurroundingChar: null,
              });
            })}
          />
        )}

        <form
          className="chat-input-form"
          id="chatInputForm"
          onSubmit={onSubmit}
          autoComplete="off"
        >
          <ChatExtrasButton
            session={session}
            groupId={groupId}
          ></ChatExtrasButton>
          <div className="chat-input-div" role="textbox">
            <textarea
              className="chat-input"
              id="chatInput"
              ref={textAreaRef}
              onInput={onChange}
            />
            {isInputBlank && (
              <p className="chat-input-placeholder">Type here...</p>
            )}
          </div>
          <ChatSendButton
            onSend={onSend}
            disabled={textAreaValue.length > maxLength}
          ></ChatSendButton>
        </form>
      </div>
    );
  },
);
ChatInput.displayName = "ChatInput";

export default ChatInput;
