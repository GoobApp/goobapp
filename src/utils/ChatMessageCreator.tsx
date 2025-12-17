import ChatMessageObject from "../types/ChatMessageObject";

const createChatObject = ({
  newUserDisplayName,
  newUserUUID,
  newUserProfilePicture,
  newMessageContent,
  newIsEdited = false,
}: {
  newUserDisplayName: string;
  newUserUUID: string;
  newUserProfilePicture: string | null;
  newMessageContent: string;
  newIsEdited: boolean;
}) => {
  let inputObject = {
    userDisplayName: newUserDisplayName,
    userUUID: newUserUUID,
    userProfilePicture: newUserProfilePicture,
    messageContent: newMessageContent,
    messageTime: new Date(),
    messageId: Date.now(), // This gets autoset by supabase but no reason not to set it also here (local testing)
    isEdited: newIsEdited,
  } as ChatMessageObject;

  return inputObject;
};

export default createChatObject;
