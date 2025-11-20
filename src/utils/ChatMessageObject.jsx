const createChatObject = (newUserDisplayName, newUserID, newUserProfilePicture, newUserContent) => {
    let inputObject = {
        userDisplayName: newUserDisplayName,
        userID: newUserID,
        userProfilePicture: newUserProfilePicture,
        userContent: newUserContent,
        messageId: Date.now()
    }

    return inputObject;
}

export default createChatObject;