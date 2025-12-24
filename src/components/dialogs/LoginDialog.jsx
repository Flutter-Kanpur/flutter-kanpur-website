"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import ApplyNowButton from "@/components/buttons/ApplyNowButton";
import GoogleButton from "../buttons/continueWithGoogleButton/googleButton";
import InputComponent from "../inputComponent/InputComponent";
import ShowPasswordButtonComponent from "../buttons/customShowPasswordButton/ShowPasswordButtonComponent";
import CustomloginSignUpButton from "../buttons/customComponents/CustomComponents";
import {
  signInUserWithEmailAndPassword,
  signInWithGoogle,
} from "@/lib/firebase/server/auth";
import { checkUserExistsInFirestore } from "@/lib/firebase/server/server-actions";
import { useRouter } from "next/navigation";
import { isValidEmail } from "@/lib/utils/utils";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";

const LoginDialog = ({
  open,
  onClose,
  onShowSignup,
  setloginData,
  loginData,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const auth = getAuth();
  const router = useRouter();

  const handleSignUpClick = () => {
    onClose();
    onShowSignup();
  };

  useEffect(() => {
    const valid =
      isValidEmail(loginData.email) &&
      loginData.password &&
      loginData.password.length >= 6;
    setLoginDisabled(!valid);
  }, [loginData]);
const handleUserLogin = async () => {
  setErrorMsg("");
  setLoading(true);

  try {
    // Directly attempt login — no pre-check needed anymore
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginData.email,
      loginData.password
    );
    const user = userCredential.user;

    // Block if not verified
    if (!user.emailVerified) {
      await signOut(auth);
      setErrorMsg("❌ Please verify your email first. Check your inbox!");
      setLoading(false);
      return;
    }

    setLoading(true); // 🆕 start loader

    try {
      // 🆕 STEP 1: Check instantly if user exists
      const signInMethods = await fetchSignInMethodsForEmail(
        auth,
        loginData.email
      );
      if (signInMethods.length === 0) {
        setErrorMsg("User does not exist!");
        setLoading(false);
        return;
      }

      // 🆕 STEP 2: Proceed with actual login
      const response = await signInUserWithEmailAndPassword(
        loginData.email,
        loginData.password
      );

      if (response && response.user) {
        const user = response.user;
        
        // Reload user to get latest emailVerified status
        await user.reload();
        
        // Check if email is verified
        if (!user.emailVerified) {
          setLoading(false);
          setErrorMsg("Please verify your email before logging in. Check your inbox for the verification link.");
          // Redirect to verify-email page
          setTimeout(() => {
            onClose();
            router.push("/verify-email");
          }, 2000);
          return;
        }
        
        // Check if user exists in Firestore (has completed onboarding)
        const userExists = await checkUserExistsInFirestore(user.email);
        
        setLoading(false);
        onClose();
        
        if (!userExists) {
          // User hasn't completed onboarding - redirect to onboarding
          router.push("/onboarding/screen1");
        } else {
          // User exists - redirect to home
          window.location.href = "/";
        }
      }
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/wrong-password") {
        setErrorMsg("Incorrect password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setErrorMsg("Invalid email format.");
      } else {
        setErrorMsg("Login failed. Please try again.");
      }
    }
  }

  };

  return (
    <>
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
        open={open}
        onClick={onClose}
      />

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            borderRadius: "0",
            maxHeight: "100vh",
            overflow: "hidden",
          },
        }}
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
      >
        <DialogContent style={{ padding: 0, backgroundColor: "transparent" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              position: "relative",
              padding: "20px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <img
                src="/landingPageIcons/flutter_icon.svg"
                alt="Flutter Logo"
                width="56"
                height="56"
              />
            </div>

            <div
              style={{
                background: "#010A10",
                borderRadius: "12px",
                padding: "40px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                maxWidth: "400px",
                width: "100%",
                position: "relative",
              }}
            >
              {loading && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(0,0,0,0.6)",
                    borderRadius: "12px",
                    zIndex: 10,
                  }}
                >
                  <CircularProgress size={36} style={{ color: "#fff" }} />
                </div>
              )}

              <div>
                <h2
                  style={{
                    color: "#FFFFFF",
                    fontSize: "20px",
                    fontWeight: "400",
                    marginBottom: "2px",
                    textAlign: "left",
                    fontFamily: "Encode Sans, sans-serif",
                  }}
                >
                  Login to your account
                </h2>
                <h3
                  style={{
                    color: "#A6A6A6",
                    fontSize: "14px",
                    fontWeight: "400",
                    marginBottom: "30px",
                    textAlign: "left",
                    fontFamily: "Encode Sans, sans-serif",
                  }}
                >
                  Welcome Back to Flutter Kanpur!
                </h3>

                <GoogleButton
                  onClick={async () => {
                    try {
                      await signInWithGoogle();
                      const user = auth.currentUser;
                      
                      if (user) {
                        // Check if user exists in Firestore
                        const userExists = await checkUserExistsInFirestore(user.email);
                        
                        onClose();
                        
                        if (!userExists) {
                          // New user - redirect to onboarding
                          router.push("/onboarding/screen1");
                        } else {
                          // Existing user - redirect to home
                          window.location.href = "/";
                        }
                      }
                    } catch (error) {
                      console.error("Error with Google sign in:", error);
                      setErrorMsg("Failed to sign in with Google. Please try again.");
                    }
                  }}
                />

              <GoogleButton onClick={async () => { await signInWithGoogle(); onClose(); }} />

              <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
                <div style={{ flex: 1, height: "1px", background: "#E5E8EC", opacity: 0.3 }}></div>
                <span style={{ padding: "0 10px", color: "#A6A6A6" }}>or</span>
                <div style={{ flex: 1, height: "1px", background: "#E5E8EC", opacity: 0.3 }}></div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <InputComponent
                  type="email"
                  placeholder="Email - abc@xyz.com"
                  value={loginData.email}
                  onChange={(e) => setloginData({ ...loginData, email: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: "15px", position: "relative" }}>
                <InputComponent
                  type={showPassword ? "text" : "password"}
                  placeholder="Password - 123456"
                  value={loginData.password}
                  onChange={(e) => setloginData({ ...loginData, password: e.target.value })}
                />
                <ShowPasswordButtonComponent
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>

              {errorMsg && (
                <div style={{ color: "red", fontSize: "14px", textAlign: "center", marginBottom: "15px" }}>
                  {errorMsg}
                </div>
              )}

              <div style={{ marginTop: "40px" }}>
                <ApplyNowButton
                  disabled={loginDisabled || loading}
                  text={loading ? "Checking..." : "CONTINUE"}
                  width="100%"
                  height="48px"
                  fontSize="14px"
                  onClick={handleUserLogin}
                />
              </div>

              <CustomloginSignUpButton
                buttontext="Sign up"
                conditionText="Don't have an account?"
                onClick={handleSignUpClick}
              />
            </div>

            <div style={{ textAlign: "center", marginTop: "20px", color: "#A6A6A6", fontSize: "12px" }}>
              <div>By logging in you agree to our</div>
              <div>Terms of Service & Privacy Policy</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginDialog;