"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Backdrop } from "@mui/material";
import ApplyNowButton from "@/components/buttons/ApplyNowButton";
import VerifyEmailDialog from "./VerifyEmailDialog";
import GoogleButton from "../buttons/continueWithGoogleButton/googleButton";
import InputComponent from "../inputComponent/InputComponent";
import ShowPasswordButtonComponent from "../buttons/customShowPasswordButton/ShowPasswordButtonComponent";
import CustomloginSignUpButton from "../buttons/customComponents/CustomComponents";
import { signInWithGoogle } from "@/lib/firebase/server/auth";
import { isValidEmail } from "@/lib/utils/utils";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getAuth,
} from "firebase/auth";
import { useRouter } from "next/navigation";

const SignupDialog = ({
  open,
  onClose,
  onShowLogin,
  signUpData,
  setSignUpData,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [verifyEmailOpen, setVerifyEmailOpen] = useState(false);
  const [signUpDisabled, setsignUpDisabled] = useState(true);

  // NEW: message state for on-screen messages
  const [message, setMessage] = useState({ text: "", type: "" }); // ✅

  const auth = getAuth();
  const router = useRouter();

  const handleLoginClick = () => {
    onClose();
    onShowLogin();
  };

  useEffect(() => {
    if (!isValidEmail(signUpData.email)) {
      setsignUpDisabled(true);
      return;
    }
    if (
      signUpData.email &&
      signUpData.password &&
      signUpData.confirmPassword &&
      signUpData.password === signUpData.confirmPassword &&
      signUpData.password.length >= 6
    ) {
      setsignUpDisabled(false);
    } else {
      setsignUpDisabled(true);
    }
  }, [signUpData]);

  const handleCreateAccount = async () => {
    const { email, password, confirmPassword } = signUpData;

    //Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ text: "❌ Invalid email!", type: "error" });
      return;
    }

    // Password validation
    if (password !== confirmPassword || password.length < 6) {
      setMessage({
        text: "❌ Passwords do not match or are too short!",
        type: "error",
      });
      return;
    }

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save email to localStorage
      localStorage.setItem("emailForSignUp", email);

      // Send verification email
      await sendEmailVerification(user);

      //On-screen success message
      setMessage({
        text: "Verification email sent! Please check your inbox.",
        type: "success",
      });

      // Open VerifyEmailDialog
      setVerifyEmailOpen(true);
    } catch (error) {
      console.error("Error signing up:", error);

      // ✅ Handle Firebase error messages clearly
      let errorMessage = "Something went wrong!";

      if (error.code === "auth/invalid-email") {
        errorMessage = "❌ Invalid email!";
      } else if (error.code === "auth/email-already-in-use") {
        errorMessage = "❌ This email is already registered!";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "❌ Password should be at least 6 characters!";
      }

      setMessage({ text: errorMessage, type: "error" });
    }
  };

  const handleCloseVerifyEmail = () => {
    setVerifyEmailOpen(false);
  };

  return (
    <>
      {/* Only show backdrop when verify email dialog is NOT open */}
      {!verifyEmailOpen && (
        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backdropFilter: "blur(16px)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
          open={open}
          onClick={onClose}
        />
      )}

      <Dialog
        open={open && !verifyEmailOpen}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            borderRadius: "0",
            zIndex: (theme) => theme.zIndex.drawer + 2,
            maxHeight: "100vh",
            overflow: "hidden",
          },
        }}
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
      >
        <DialogContent
          style={{
            padding: 0,
            backgroundColor: "transparent",
            overflowY: "auto",
            maxHeight: "100vh",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>
            {`
      ::-webkit-scrollbar {
        display: none;
      }
    `}
          </style>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              position: "relative",
              padding: "20px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
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
              }}
            >
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
                Create your account
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
                Join Flutter Kanpur Community!
              </h3>

              <GoogleButton
                onClick={async () => {
                  await signInWithGoogle();
                  onClose();
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "#E5E8EC",
                    opacity: 0.3,
                  }}
                ></div>
              </div>

              <InputComponent
                type="email"
                placeholder="Email - abc@xyz.com"
                value={signUpData.email}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
              />

              <div style={{ marginBottom: "15px", position: "relative" }}>
                <InputComponent
                  type={showPassword ? "text" : "password"}
                  placeholder="Password - 123456"
                  value={signUpData.password}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, password: e.target.value })
                  }
                />
                <ShowPasswordButtonComponent
                  setShowPassword={setShowPassword}
                  showPassword={showPassword}
                />
              </div>

              <InputComponent
                type="password"
                placeholder="Confirm Password"
                value={signUpData.confirmPassword}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    confirmPassword: e.target.value,
                  })
                }
              />

              <div style={{ marginTop: "60px" }}>
                <ApplyNowButton
                  disabled={signUpDisabled}
                  text="CREATE ACCOUNT"
                  width="100%"
                  height="48px"
                  fontSize="14px"
                  onClick={handleCreateAccount}
                />
              </div>

              {/*Show success or error message on screen */}
              {message.text && (
                <p
                  style={{
                    color: message.type === "error" ? "red" : "#00FF99",
                    marginTop: "20px",
                    fontSize: "14px",
                    textAlign: "center",
                    fontFamily: "Encode Sans, sans-serif",
                  }}
                >
                  {message.text}
                </p>
              )}
              {/*END */}

              <CustomloginSignUpButton
                buttontext="Login"
                conditionText="Already have an account?"
                onClick={handleLoginClick}
              />
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                color: "#A6A6A6",
                fontSize: "12px",
                fontFamily: "Encode Sans, sans-serif",
              }}
            >
              <div>By creating account you agree to our</div>
              <div>Terms of Service & Privacy Policy</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/*Verify Email Dialog */}
      <VerifyEmailDialog
        open={verifyEmailOpen}
        onClose={handleCloseVerifyEmail}
        email={signUpData.email}
      />
    </>
  );
};

export default SignupDialog;
