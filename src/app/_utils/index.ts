import { UserCredential } from "firebase/auth";

export const extractClientDetails = (userCredential: UserCredential) => {
  const {
    email,
    emailVerified,
    displayName,
    phoneNumber,
    photoURL,
    isAnonymous,
  } = userCredential.user;
  return {
    email,
    emailVerified,
    displayName,
    phoneNumber,
    photoURL,
    isAnonymous,
  };
};
