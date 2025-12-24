"use client";

import React, { useState, useEffect } from "react";
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
  signOut,
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
  const [signUpDisabled, setSignUpDisabled] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

  const auth = getAuth();
  const router = useRouter();

  const handleLoginClick = () => {
    onClose();
    onShowLogin();
  };

  useEffect(() => {
    const valid =
      isValidEmail(signUpData.email) &&
      signUpData.password &&
      signUpData.confirmPassword &&
      signUpData.password === signUpData.confirmPassword &&
      signUpData.password.length >= 6;

    setSignUpDisabled(!valid);
  }, [signUpData]);

  const handleCreateAccount = async () => {
    const { email, password, confirmPassword } = signUpData;

    if (!isValidEmail(email)) {
      setMessage({ text: "❌ Invalid email format!", type: "error" });
      return;
    }
    if (password !== confirmPassword || password.length < 6) {
      setMessage({ text: "❌ Passwords don't match or too short!", type: "error" });
      return;
    }

    setMessage({ text: "", type: "" });

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save email for verification screen
      localStorage.setItem("emailForSignUp", email);

      // Send verification email with redirect back to home/login
      const actionCodeSettings = {
        url: `${window.location.origin}/`, // Change to "/login" or your preferred page
        handleCodeInApp: false,
      };

      await sendEmailVerification(user, actionCodeSettings);

      // Sign out immediately — force verification first
      await signOut(auth);

      setMessage({ text: "✅ Account created! Check your email to verify.", type: "success" });
      setVerifyEmailOpen(true);

    } catch (error) {
      let msg = "Signup failed. Try again.";
      if (error.code === "auth/email-already-in-use") {
        msg = "❌ This email is already registered. Try logging in.";
      } else if (error.code === "auth/weak-password") {
        msg = "❌ Password too weak (minimum 6 characters).";
      } else if (error.code === "auth/invalid-email") {
        msg = "❌ Invalid email address.";
      }
      setMessage({ text: msg, type: "error" });
    }
  };

  const handleCloseVerifyEmail = () => {
    setVerifyEmailOpen(false);
    onClose();
    localStorage.removeItem("emailForSignUp");
  };

  return (
    <>
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
              }}
            >
              <h2 style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "400", textAlign: "left" }}>
                Create your account
              </h2>
              <h3 style={{ color: "#A6A6A6", fontSize: "14px", marginBottom: "30px", textAlign: "left" }}>
                Join Flutter Kanpur Community!
              </h3>

              <GoogleButton onClick={async () => { await signInWithGoogle(); onClose(); }} />

              <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
                <div style={{ flex: 1, height: "1px", background: "#E5E8EC", opacity: 0.3 }}></div>
                <span style={{ padding: "0 10px", color: "#A6A6A6" }}>or</span>
                <div style={{ flex: 1, height: "1px", background: "#E5E8EC", opacity: 0.3 }}></div>
              </div>

              <InputComponent
                type="email"
                placeholder="Email - abc@xyz.com"
                value={signUpData.email}
                onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
              />

              <div style={{ margin: "15px 0", position: "relative" }}>
                <InputComponent
                  type={showPassword ? "text" : "password"}
                  placeholder="Password - 123456"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                />
                <ShowPasswordButtonComponent
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>

              <InputComponent
                type="password"
                placeholder="Confirm Password"
                value={signUpData.confirmPassword}
                onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
              />

              {message.text && (
                <p
                  style={{
                    color: message.type === "error" ? "red" : "#00FF99",
                    marginTop: "20px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  {message.text}
                </p>
              )}

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

              <CustomloginSignUpButton
                buttontext="Login"
                conditionText="Already have an account?"
                onClick={handleLoginClick}
              />
            </div>

            <div style={{ textAlign: "center", marginTop: "20px", color: "#A6A6A6", fontSize: "12px" }}>
              <div>By creating account you agree to our</div>
              <div>Terms of Service & Privacy Policy</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <VerifyEmailDialog
        open={verifyEmailOpen}
        onClose={handleCloseVerifyEmail}
        email={signUpData.email}
      />
    </>
  );
};

export default SignupDialog;