import ChatMessageObject from "../types/ChatMessageObject";

const createChatObject = ({
  newUserDisplayName,
  newUserUUID,
  newUserProfilePicture,
  newUserRole,
  newMessageContent,
  newMessageImageURL,
  newIsEdited = false,
}: {
  newUserDisplayName: string;
  newUserUUID: string;
  newUserProfilePicture: string | null;
  newUserRole: string | null;
  newMessageContent: string;
  newMessageImageURL: string | null;
  newIsEdited: boolean;
}) => {
  let inputObject = {
    userDisplayName: newUserDisplayName,
    userUUID: newUserUUID,
    userProfilePicture: newUserProfilePicture,
    userRole: newUserRole,
    messageContent: newMessageContent,
    messageImageUrl: newMessageImageURL,
    messageTime: new Date(),
    messageId: Date.now(), // This gets autoset by supabase but no reason not to set it also here (local testing)
    isEdited: newIsEdited,
  } as ChatMessageObject;

  return inputObject;
};

export default createChatObject;
