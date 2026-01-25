import { Session } from "@supabase/supabase-js";
import {
  ChangeEvent,
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
    }: {
      onSend: () => void;
      session: Session | null;
      activeUsers: UserProfile[];
    },
    ref,
  ) => {
    // Wrap the component with forwardRef so the parent can pass a ref;  useImperativeHandle exposes methods to that ref
    const textAreaRef = useRef<HTMLParagraphElement>(null);
    const [textAreaValue, setTextAreaValue] = useState(""); // useState is used to make React update stuff on the screen when something changes
    const [isInputBlank, setIsInputBlank] = useState(true);
    const maxLength: number = 1201;

    const onChange = (event: ChangeEvent<HTMLParagraphElement>) => {
      setIsInputBlank(event.target.textContent == "");
      setTextAreaValue(event.target.innerText); // for some reason React makes setting vars a function with useState. probably because it needs to update the page
    };

    const onSubmit = (event: FormEvent | KeyboardEvent) => {
      event.preventDefault();
      if (textAreaValue.length <= maxLength) {
        if (!isInputBlank) {
          onSend(); // This will send the onSend function up to the parent
        }
      }
    };

    useImperativeHandle(ref, () => ({
      // Think of this as a more complex version of a public method in C#
      getInputValueToSend: () => {
        // This is one of these methods, and adding more is like adding to a dictionary. This one just returns the current value.
        if (!textAreaRef.current) return; // Typescript thing to ensure safety, otherwise error. Just makes sure inputRef is not null
        textAreaRef.current.innerHTML = "<br>";
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
            onSubmit(event);
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

        if (
          ((navigator.userAgent.includes("Mac") && event.metaKey) ||
            (!navigator.userAgent.includes("Mac") && event.ctrlKey)) &&
          ["b", "i"].includes(event.key.toLowerCase())
        ) {
          event.preventDefault();
          if (textAreaRef.current) {
            const selection = window.getSelection();
            if (!selection) return;

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

            // FIXME: These next ~130 lines are some of the worst code I've ever written in my life. Be warned
            let selectionRange = selection.getRangeAt(0);
            let start = selectionRange.startOffset;
            let end = selectionRange.endOffset;
            let is_already_bold = false;
            let is_already_italics = false;
            let is_weird_ctrl_z_issue_thing_yeah_idk_man = false;
            let thingToInsertAmount = 0;

            const range = document.createRange();

            if (selectionRange.toString() == "") {
              document.execCommand(
                "insertText",
                true,
                thingToInsert + thingToInsert,
              ); // TODO: Replace with a non-deprecated command that still has ctrl-z functionality

              selectionRange = selection.getRangeAt(0);
              start = selectionRange.startOffset;
              end = selectionRange.endOffset;

              range.setStart(
                selectionRange.startContainer,
                start - thingToInsert.length,
              );
              range.setEnd(
                selectionRange.endContainer,
                end - thingToInsert.length,
              );

              selection.removeAllRanges();
              selection.addRange(range);
              return;
            }

            selectionRange = selection.getRangeAt(0);
            start = selectionRange.startOffset;
            end = selectionRange.endOffset;
            range.setStart(selectionRange.startContainer, start - 1); // Checking for if already created
            range.setEnd(selectionRange.endContainer, end + 1); // Checking for if already created
            let rangeString = range.toString();
            if (
              rangeString[0] == "*" &&
              rangeString[rangeString.length - 1] == "*"
            ) {
              is_already_italics = true;
              thingToInsertAmount = 1;
              range.setStart(selectionRange.startContainer, start - 2); // Checking for if already created
              range.setEnd(selectionRange.endContainer, end + 2); // Checking for if already created
              rangeString = range.toString();
              if (
                rangeString[0] == "*" &&
                rangeString[rangeString.length - 1] == "*"
              ) {
                is_already_italics = false;
                is_already_bold = true;
                thingToInsertAmount = 2;
                range.setStart(selectionRange.startContainer, start - 3); // Checking for if already created
                range.setEnd(selectionRange.endContainer, end + 3); // Checking for if already created
                rangeString = range.toString();
                if (
                  rangeString[0] == "*" &&
                  rangeString[rangeString.length - 1] == "*"
                ) {
                  is_already_italics = true;
                  thingToInsertAmount = 3;
                }
              }
            }

            range.setStart(selectionRange.startContainer, start); // Checking for if already created
            range.setEnd(selectionRange.endContainer, end); // Checking for if already created
            rangeString = range.toString();
            if (
              rangeString[0] == "*" &&
              rangeString[rangeString.length - 1] == "*"
            ) {
              is_weird_ctrl_z_issue_thing_yeah_idk_man = true;
              is_already_italics = true;
              thingToInsertAmount = 1;
              range.setStart(selectionRange.startContainer, start + 1); // Checking for if already created
              range.setEnd(selectionRange.endContainer, end - 1); // Checking for if already created
              rangeString = range.toString();
              if (
                rangeString[0] == "*" &&
                rangeString[rangeString.length - 1] == "*"
              ) {
                is_already_italics = false;
                is_already_bold = true;
                thingToInsertAmount = 2;
                range.setStart(selectionRange.startContainer, start + 2); // Checking for if already created
                range.setEnd(selectionRange.endContainer, end - 2); // Checking for if already created
                rangeString = range.toString();
                if (
                  rangeString[0] == "*" &&
                  rangeString[rangeString.length - 1] == "*"
                ) {
                  is_already_italics = true;
                  thingToInsertAmount = 3;
                }
              }
            }

            range.setStart(
              selectionRange.startContainer,
              is_weird_ctrl_z_issue_thing_yeah_idk_man
                ? start
                : start - thingToInsertAmount,
            );
            range.setEnd(
              selectionRange.endContainer,
              is_weird_ctrl_z_issue_thing_yeah_idk_man
                ? end
                : end + thingToInsertAmount,
            );

            selection.removeAllRanges();
            selection.addRange(range);

            rangeString = range.toString();
            document.execCommand(
              "insertText",
              true,
              is_weird_ctrl_z_issue_thing_yeah_idk_man
                ? rangeString.substring(
                    thingToInsertAmount,
                    rangeString.length - thingToInsertAmount,
                  )
                : is_already_bold || is_already_italics
                  ? rangeString.substring(
                      thingToInsertAmount,
                      rangeString.length - thingToInsertAmount,
                    )
                  : thingToInsert + range.toString() + thingToInsert,
            ); // TODO: Replace with a non-deprecated command that still has ctrl-z functionality

            range.setStart(
              selectionRange.startContainer,
              is_weird_ctrl_z_issue_thing_yeah_idk_man
                ? start
                : is_already_bold || is_already_italics
                  ? start - thingToInsert.length
                  : start + thingToInsert.length,
            );
            range.setEnd(
              selectionRange.endContainer,
              is_weird_ctrl_z_issue_thing_yeah_idk_man
                ? end - thingToInsert.length - thingToInsert.length
                : is_already_bold || is_already_italics
                  ? end - thingToInsert.length
                  : end + thingToInsert.length,
            );

            selection.removeAllRanges();
            selection.addRange(range);
          }
        }

        if (document.activeElement !== textAreaRef.current) {
          if (!textAreaRef.current)
            // Only refocus if it's not already focused
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
      if (textAreaRef.current?.innerText == "") {
        textAreaRef.current.innerHTML = "<br>";
      }
    }, [textAreaRef]);

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
            elements={activeEmojisUI.slice(0, 5).map(([name, emoji]) => {
              return createUIElement({
                newPicture: null,
                newEmoji: emoji,
                newName: name,
                newKey: name,
              });
            })}
          />
        )}

        {atUsersInputRegex.test(textAreaValue) && atUsersUI && (
          <UIPopup
            elements={atUsersUI.slice(0, 5).map((user) => {
              return createUIElement({
                newPicture: user.userProfilePicture,
                newEmoji: null,
                newName: user.username,
                newKey: user.userUUID,
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
          <ChatExtrasButton session={session}></ChatExtrasButton>
          <div className="chat-input-div" role="textbox">
            <div
              contentEditable={"plaintext-only"}
              className="chat-input"
              id="chatInput"
              ref={textAreaRef}
              onInput={onChange}
            ></div>
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
