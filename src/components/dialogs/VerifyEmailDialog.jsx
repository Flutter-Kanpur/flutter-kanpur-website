'use client';

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Backdrop } from "@mui/material";
import { getAuth, sendEmailVerification, fetchSignInMethodsForEmail } from "firebase/auth";
import { useRouter } from "next/navigation";

const VerifyEmailDialog = ({ open, onClose }) => {
  const router = useRouter();
  const auth = getAuth();

  const [countdown, setCountdown] = useState(15);
  const [timerStopped, setTimerStopped] = useState(false);
  const [message, setMessage] = useState("");
  const [emailExists, setEmailExists] = useState(true);
  const email =
    typeof window !== "undefined" ? localStorage.getItem("emailForSignUp") : "";

  // Check if email exists in Firebase Auth when dialog opens
  useEffect(() => {
    const checkEmailExists = async () => {
      if (!open || !email) return;

      try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        // console.log(signInMethods, "signInMethods in verifyEmail")
        // if (signInMethods.length === 0) {
        //   setEmailExists(false);
        //   setMessage("❌ This email doesn't exist in our system. Please sign up first.");
        // } else {
        //   setEmailExists(true);
        // }
      } catch (error) {
        console.error("Error checking email existence:", error);
        setEmailExists(false);
        setMessage("❌ Unable to verify email. Please try again.");
      }
    };

    checkEmailExists();
  }, [open, email, auth]);

  // Countdown timer
  useEffect(() => {
    if (timerStopped) return;
    if (countdown <= 0) {
      setTimerStopped(true);
      return;
    }
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown, timerStopped]);

  // Remove automatic email sending when dialog opens
  // Email will only be sent when user clicks "Open Email" button

  // Resend verification email
  const handleResendEmail = () => {
    if (emailExists === false) {
      alert("❌ Email doesn't exist in our system. Please sign up first.");
      return;
    }

    const user = auth.currentUser;
    if (!user) return alert("User not found or not logged in!");
    if (user.emailVerified) return alert("Email already verified!");

    sendEmailVerification(user)
      .then(() => {
        alert("✅ Verification email resent!");
        setCountdown(15);
        setTimerStopped(false);
      })
      .catch((error) => console.error("❌ Failed to resend email:", error));
  };

  // Smart email provider detection and redirection
  const getEmailProviderUrl = (email) => {
    if (!email) return "https://mail.google.com";

    const domain = email.split("@")[1]?.toLowerCase();

    switch (domain) {
      case "gmail.com":
      case "googlemail.com":
        return "https://mail.google.com";
      case "outlook.com":
      case "hotmail.com":
      case "live.com":
      case "msn.com":
        return "https://outlook.live.com";
      case "yahoo.com":
      case "ymail.com":
        return "https://mail.yahoo.com";
      case "icloud.com":
      case "me.com":
      case "mac.com":
        return "https://www.icloud.com/mail";
      default:
        return "https://mail.google.com";
    }
  };

  // Handle opening email and sending verification
  const handleOpenEmail = async () => {
    // First, send verification email if user exists and email is not verified
    // const user = auth.currentUser;
    // if (user && !user.emailVerified && emailExists === true) {
    //   try {
    //     await sendEmailVerification(user);
    //     // ("✅ Verification email sent");
    //     setMessage("✅ Verification email sent! Check your inbox.");

    //     // Start countdown timer for resend functionality
    //     setCountdown(15);
    //     setTimerStopped(false);

    //   } catch (error) {
    //     console.error("❌ Failed to send verification email:", error);
    //     setMessage("❌ Failed to send verification email. Please try again.");
    //     return;
    //   }
    // }
    alert("Please check your email for the verification link.");

    // Then open email provider
    try {
      const emailUrl = getEmailProviderUrl(email);
      // Try to open in new tab
      const newWindow = window.open(emailUrl, "_blank", "noopener,noreferrer");

      // // If popup was blocked, fallback to current tab
      // if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      //   window.location.href = emailUrl;
      // }
    } catch (error) {
      console.error("Failed to open email provider:", error);
      // Fallback: redirect current tab to Gmail
      // window.location.href = "https://mail.google.com";
    }
  };

  // Change email
  const handleChangeEmail = () => onClose();

  // ✅ Auto-check for email verification every 2 seconds (only after verification email is sent)
  useEffect(() => {
    if (!open || emailExists !== true || !message.includes("✅ Verification email sent")) return;

    const interval = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          await user.reload(); // refresh user data from Firebase
          if (user.emailVerified) {
            clearInterval(interval);
            setMessage("✅ Email verified successfully!");
            onClose();
            router.replace("/onboarding/screen1"); // redirect automatically
          }
        } catch (err) {
          console.error("Error checking email verification:", err);
        }
      }
    }, 2000); // check every 2 seconds

    return () => clearInterval(interval);
  }, [open, auth, onClose, router, emailExists, message]);


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
            overflow: "auto",
            maxHeight: "100vh",
          }}
        >
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
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <img
                src="/landingPageIcons/flutter_icon.svg"
                alt="Flutter Logo"
                width="56"
                height="56"
              />
            </div>

            <div
              style={{
                background: "#0C1217",
                borderRadius: "12px",
                padding: "40px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
                maxWidth: "500px",
                width: "100%",
                textAlign: "left",
              }}
            >
              <h1
                style={{
                  color: "#FFFFFF",
                  fontSize: "20px",
                  fontWeight: "400",
                  marginBottom: "10px",
                  fontFamily: "Encode Sans, sans-serif",
                }}
              >
                Verify your email
              </h1>

              {message ? (
                <p
                  style={{
                    color: emailExists === false ? "#FF6B6B" : "#A6A6A6",
                    fontSize: "16px",
                    marginBottom: "20px",
                    fontFamily: "Encode Sans, sans-serif",
                  }}
                >
                  {message}
                </p>
              ) : emailExists === null ? (
                <p
                  style={{
                    color: "#A6A6A6",
                    fontSize: "16px",
                    marginBottom: "20px",
                    fontFamily: "Encode Sans, sans-serif",
                    lineHeight: "1.5",
                  }}
                >
                  Checking email...
                </p>
              ) : emailExists === true ? (
                <p
                  style={{
                    color: "#A6A6A6",
                    fontSize: "16px",
                    marginBottom: "20px",
                    fontFamily: "Encode Sans, sans-serif",
                    lineHeight: "1.5",
                  }}
                >
                  Click "Open Email" to send verification email to {email} and access your inbox
                </p>
              ) : null}

              {!message && emailExists === true && (
                <>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "24px", gap: "20px" }}>
                    <button
                      onClick={handleOpenEmail}
                      style={{
                        background: '#0F1C25',
                        color: '#FFFFFF',
                        border: '1px solid #2E3942',
                        borderRadius: '8px',
                        padding: '12px 20px',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontFamily: 'Encode Sans, sans-serif',
                        textDecoration: 'none'
                      }}
                    >
                      Open Email
                    </button>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#A6A6A6", fontSize: "14px" }}>Not your email?</span>
                    <button
                      onClick={handleChangeEmail}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#3FD1FF",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Change email
                    </button>
                  </div>
                </>
              )}

              {message && message.includes("✅ Verification email sent") && emailExists === true && (
                <>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "24px", gap: "20px" }}>
                    {timerStopped ? (
                      <button
                        onClick={handleResendEmail}
                        style={{
                          background: "#0F1C25",
                          color: "#FFFFFF",
                          border: "1px solid #2E3942",
                          borderRadius: "8px",
                          padding: "12px 20px",
                          fontSize: "16px",
                          fontWeight: "500",
                          cursor: "pointer",
                        }}
                      >
                        Resend email
                      </button>
                    ) : (
                      <span style={{ color: "#FFFFFF", fontSize: "14px" }}>
                        Resend email in {countdown}s
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#A6A6A6", fontSize: "14px" }}>Not your email?</span>
                    <button
                      onClick={handleChangeEmail}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#3FD1FF",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Change email
                    </button>
                  </div>
                </>
              )}

              {emailExists === false && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "20px" }}>
                  <span style={{ color: "#A6A6A6", fontSize: "14px" }}>Need to create an account?</span>
                  <button
                    onClick={handleChangeEmail}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#3FD1FF",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Sign up instead
                  </button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VerifyEmailDialog;
