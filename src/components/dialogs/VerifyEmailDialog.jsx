'use client';

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Backdrop } from "@mui/material";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";

const VerifyEmailDialog = ({ open, onClose }) => {
  const router = useRouter();
  const auth = getAuth();

  const [countdown, setCountdown] = useState(15);
  const [timerStopped, setTimerStopped] = useState(false);
  const [message, setMessage] = useState("");

  // Get email from localStorage
  const email =
    typeof window !== "undefined" ? localStorage.getItem("emailForSignUp") : "";

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

  // Send verification email when dialog opens
  useEffect(() => {
    if (!open) return;
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      sendEmailVerification(user)
        .then(() => console.log("✅ Verification email sent"))
        .catch((err) => console.error("❌ Failed to send verification email:", err));
    }
  }, [open, auth]);

  // Resend verification email
  const handleResendEmail = () => {
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

  // Open Gmail
  const handleOpenGmail = () => window.open("https://mail.google.com", "_blank");

  // Change email
  const handleChangeEmail = () => onClose();

  // ✅ Auto-check for email verification every 2 seconds
  // ✅ Auto-check for email verification every 2 seconds
useEffect(() => {
  if (!open) return;

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
}, [open, auth, onClose, router]);


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
                    color: "#A6A6A6",
                    fontSize: "16px",
                    marginBottom: "20px",
                    fontFamily: "Encode Sans, sans-serif",
                  }}
                >
                  {message}
                </p>
              ) : (
                <p
                  style={{
                    color: "#A6A6A6",
                    fontSize: "16px",
                    marginBottom: "20px",
                    fontFamily: "Encode Sans, sans-serif",
                    lineHeight: "1.5",
                  }}
                >
                  Check {email} to verify your account and get started
                </p>
              )}

              {!message && (
                <>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "24px", gap: "20px" }}>
                    <button
                      onClick={handleOpenGmail}
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
                        fontFamily: 'Encode Sans, sans-serif'
                      }}
                    >
                      Open Gmail
                    </button>

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
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VerifyEmailDialog;
