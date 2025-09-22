import { createUserWithEmailAndPassword, GoogleAuthProvider, sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "./setup";
const isDev = process.env.ENV === "dev";
const projectDomain = isDev ? "http://localhost:3000" : process.env.PROJECT_DOMAIN;

console.log(isDev, projectDomain, "env variables in auth.js");


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
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential, "user credential from signup");
        if (userCredential.user) {
            return userCredential.user;
        } else {
            throw new Error("User not created");
        }
    } catch (error) {
        console.error("Error signing up with email and password", error);
    }
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential, "user credential from signin");
        if (userCredential.user) {
            return userCredential.user;
        } else {
            throw new Error("User not signed in");
        }
    } catch (error) {
        console.error("Error signing up with email and password", error);
    }
}


export const actionCodeSettings = {
    // url: 'https://www.example.com/finishSignUp?cartId=1234',
    url: `${projectDomain}/verify-email`,
    // This must be true.
    handleCodeInApp: true,
    iOS: {
        bundleId: 'com.example.ios'
    },
    android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
    },
    // The domain must be configured in Firebase Hosting and owned by the project.
    linkDomain: process.env.PROJECT_DOMAIN
};

export const signInLinkToEmail = async (email) => {
    try {
        const response = await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        console.log(response, "response from sendSignInLinkToEmail")
    } catch (error) {
        console.error(error, "error from sendSignInLinkToEmail")
    }
}