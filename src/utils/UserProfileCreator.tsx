import UserProfile from "../types/UserProfileObject";

const createProfileObject = ({
  newUserDisplayName,
  newUserProfilePicture,
  newUserID,
  newUserUUID,
}: {
  newUserDisplayName: string | null;
  newUserProfilePicture: string | null;
  newUserID: string | null;
  newUserUUID: string | null;
}) => {
  let inputObject = {
    username: newUserDisplayName,
    userProfilePicture: newUserProfilePicture,
    userID: newUserID,
    userUUID: newUserUUID,
  } as UserProfile;

  return inputObject;
};

export default createProfileObject;
