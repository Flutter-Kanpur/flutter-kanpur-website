import { createUserWithEmailAndPassword, GoogleAuthProvider, sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithPopup,sendEmailVerification } from "firebase/auth";
import { auth } from "./setup";
const isDev = process.env.NODE_ENV === "development";
const projectDomain = isDev ? "http://localhost:3000" : process.env.PROJECT_DOMAIN;



export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error signing in with Google", error);
    }
}

export async function signOut() {
    try {
        return auth.signOut();
    } catch (error) {
        console.error("Error signing out with Google", error);
    }
}


export const signUpUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!userCredential.user) throw new Error("User not created");
    return userCredential.user;
  } catch (error) {
    throw error; // ✅ important
  }
};

export const signInUserWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // (userCredential, "user credential from signin");
        if (userCredential.user) {
            return userCredential.user;
        } else {
            throw new Error("User not signed in");
        }
    } catch (error) {
        console.error("Error signing up with email and password", error);
        throw error;
    }
}



export const actionCodeSettings = {
  url: `${projectDomain}/m-verify-email/m-success`,
  handleCodeInApp: true,
  iOS: { bundleId: "com.example.ios" },
  android: {
    packageName: "com.example.android",
    installApp: true,
    minimumVersion: "12",
  },
  linkDomain: process.env.PROJECT_DOMAIN,
};


export const sendVerificationEmail = async (user) => {
  try {
    await sendEmailVerification(user, actionCodeSettings);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw error;
  }
};

export const signInLinkToEmail = async (email) => {
    try {
        const response = await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        // (response, "response from sendSignInLinkToEmail")
    } catch (error) {
        console.error(error, "error from sendSignInLinkToEmail")
    }
}