// src/app/verify-email/page.js
"use client";

import React, { useEffect, useState } from "react";
import { getAuth, sendEmailVerification, applyActionCode } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const auth = getAuth();

  const [message, setMessage] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(0);

  // get email from localStorage (set during signup)
  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("emailForSignUp") || ""
      : "";

  // When page mounts, check URL for oobCode (verification link)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get("oobCode");
    const mode = urlParams.get("mode");

    // If user opened a verification link (mode=verifyEmail or oobCode present)
    if ((mode === "verifyEmail" || oobCode) && oobCode) {
      setMessage("Verifying your email...");
      applyActionCode(auth, oobCode)
        .then(() => {
          setMessage("✅ Email verified successfully! Redirecting...");
          setTimeout(() => {
            router.replace("/onboarding/screen1");
          }, 800);
        })
        .catch((err) => {
          console.error("Error applying action code:", err);
          setMessage("❌ Invalid or expired verification link.");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Countdown effect for resend button
  useEffect(() => {
    let intervalId;

    if (isResending) {
      intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setIsResending(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isResending]);

  // Automatically start countdown and send email on page load if user is logged in
  useEffect(() => {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      handleResend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resend handler
  const handleResend = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert(
        "No signed-in user found. Please sign in again (or sign up) before resending the verification email."
      );
      return;
    }

    if (user.emailVerified) {
      alert("Your email is already verified.");
      return;
    }

    try {
      await sendEmailVerification(user); // send email
      alert("✅ Verification email sent!");

      // Start countdown
      setIsResending(true);
      setTimer(45);
    } catch (err) {
      console.error("Failed to resend verification email:", err);
      alert("Failed to resend verification email. Try again later.");
      setIsResending(false);
      setTimer(0);
    }
  };

  const handleOpenGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  const handleChangeEmail = () => {
    router.push("/signup");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 50% 45%, rgba(63,209,255,0.08) 0%, rgba(63,209,255,0.02) 25%, transparent 50%), #010A10",
        padding: 24,
        boxSizing: "border-box",
        color: "white",
        fontFamily: "'Encode Sans', sans-serif",
      }}
    >
      <div
        style={{
          width: 460,
          background: "#0C1217",
          padding: 36,
          borderRadius: 12,
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <img
            src="/landingPageIcons/flutter_icon.svg"
            alt="Logo"
            width={56}
            height={56}
          />
        </div>

        <h1
          style={{ margin: 0, fontSize: 20, fontWeight: 500, color: "#FFFFFF" }}
        >
          Verify your email
        </h1>

        <p style={{ color: "#A6A6A6", marginTop: 10, marginBottom: 22 }}>
          {message ||
            `Check ${
              email || "your email"
            } to verify your account and get started.`}
        </p>

        {!message && (
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <button
              onClick={handleOpenGmail}
              style={{
                background: "#0F1C25",
                color: "#FFFFFF",
                border: "1px solid #2E3942",
                borderRadius: 8,
                padding: "12px 20px",
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "Encode Sans, sans-serif",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                  fill="#EA4335"
                />
              </svg>
              Open Gmail
            </button>

            <button
              onClick={handleResend}
              disabled={isResending}
              style={{
                background: "#0F1C25",
                color: "#FFFFFF",
                border: "1px solid #2E3942",
                borderRadius: 8,
                padding: "12px 20px",
                fontSize: 16,
                fontWeight: 500,
                cursor: isResending ? "not-allowed" : "pointer",
                fontFamily: "Encode Sans, sans-serif",
              }}
            >
              {isResending ? `Resend in ${timer}s` : "Resend Email"}
            </button>
          </div>
        )}

        <div style={{ color: "#A6A6A6", fontSize: 14 }}>
          Not your email?{" "}
          <button
            onClick={handleChangeEmail}
            style={{
              background: "none",
              border: "none",
              color: "#3FD1FF",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Change email
          </button>
        </div>
      </div>
    </div>
  );
}
