// import { auth } from "./firebase.config";
// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";

// Create a new user with the given email and password
// const registerUser = async (email, password) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };

// Sign in a user
// const loginUser = async (email, password) => {
//   return signInWithEmailAndPassword(auth, email, password);
// };

// Sign in using Google
// const signInWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   const result = await signInWithPopup(auth, provider);
//   // return result.user;
//   return result;
// };

// Logout the user
// const logout = async () => {
//   return auth.signOut(auth);
// };

// Add more Firebase authentication methods as needed...
// reset password
// export const passwordReset = (email) => {
//   return sendPasswordResetEmail(auth, email)
// };

// change password
// export const passwordChange = (password) => {
//   return updatePassword(auth.currentUser, password)
// }
// // send email verification
// export const sendEmailVerification = () => {
//   return sendEmailVerification(auth.currentUser, { url: `${window.location.origin}/home`});
// }

// export { registerUser, loginUser, signInWithGoogle, logout };
