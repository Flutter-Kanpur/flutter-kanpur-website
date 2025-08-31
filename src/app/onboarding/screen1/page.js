"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  const handleContinue = () => {
    if (fullName.trim() && username.trim()) {
      router.push("/onboarding/screen2");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div style={pageStyles.wrapper}>
      {/* Top left email */}
      <div style={pageStyles.topLeft}>
        <div style={{ fontSize: 12, color: "#2E3942" }}>Logged in as :</div>
        <div style={{ fontSize: 12, color: "#A6A6A6", marginTop: 6 }}>
          angelicasingh.design@gmail.com
        </div>
      </div>

      {/* Top right logout */}
      <button
        style={pageStyles.logoutBtn}
        onClick={() => {
          alert("Logout clicked");
        }}
      >
        Logout
      </button>

      {/* Card */}
      <div style={pageStyles.card}>
        <h2 style={pageStyles.title}>Basic Information</h2>
        <p style={pageStyles.subtitle}>Personal Details</p>

        {/* Full Name */}
        <div style={styles.inputWrapper}>
          <input
            className="textInput"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            style={styles.input}
          />
        </div>

        {/* Username */}
        <div style={styles.inputWrapper}>
          <input
            className="textInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={styles.input}
          />
        </div>

        {/* Continue button */}
        <div style={{ position: "relative", marginTop: 28 }}>
          <button onClick={handleContinue} style={styles.pillButton}>
            <span style={{ position: "relative", zIndex: 2 }}>CONTINUE</span>
          </button>
        </div>

        {/* Go back */}
        <div
          onClick={() => router.back()}
          style={{
            textAlign: "center",
            marginTop: 12,
            color: "#A6A6A6",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Go back
        </div>
      </div>

      {/* Placeholder styles (cross-browser) */}
      <style jsx>{`
        /* Placeholder color (white) and full opacity */
        .textInput::placeholder {
          color: #ffffff;
          opacity: 1;
        }
        .textInput::-webkit-input-placeholder {
          color: #ffffff;
          opacity: 1;
        }
        .textInput:-moz-placeholder,
        .textInput::-moz-placeholder {
          color: #ffffff;
          opacity: 1;
        }
        .textInput:-ms-input-placeholder {
          color: #ffffff;
          opacity: 1;
        }

        /* Autofill fix: keep background + text color consistent */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #ffffff !important;
          box-shadow: 0 0 0px 1000px #0F1C25 inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}

/* Page-level styles */
const pageStyles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(circle at 50% 45%, rgba(63,209,255,0.15) 0%, rgba(63,209,255,0.05) 25%, transparent 50%), radial-gradient(circle at 50% 40%, #010A10 0%, #010A10 100%)",
    padding: "48px",
    position: "relative",
    fontFamily: "'Encode Sans', sans-serif",
  },
  topLeft: {
    position: "absolute",
    top: 18,
    left: 22,
    color: "#9AA3A7",
  },
  logoutBtn: {
    position: "absolute",
    top: 14,
    right: 22,
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: 6,
    fontSize: 13,
    cursor: "pointer",
  },

  /* Card dimension W:457 H:397, borderRadius:15 */
  card: {
    width: 457,
    height: 397,
    maxWidth: "92vw",
    background: "#0C1217",
    borderRadius: 15,
    padding: "28px 32px",
    border: "1px solid rgba(255,255,255,0.04)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
    textAlign: "left",
    boxSizing: "border-box",
  },

  title: {
    margin: 0,
    color: "#E6F9FF",
    fontSize: 20, // h1 to 20px as requested
    fontWeight: 500,
    marginBottom: 6,
  },
  subtitle: {
    margin: 0,
    color: "#A6A6A6",
    fontSize: 12, // p to 12px as requested
    marginBottom: 18,
  },
};

/* Component-level styles */
const styles = {

  inputWrapper: {
    background:
      "linear-gradient(#0F1C25, #00F1C25) padding-box, linear-gradient(90deg, #0F1C25, #0F1C25) border-box",
    borderRadius: 8,
    marginBottom: 14,
    padding: "1.5px",
    boxSizing: "border-box",
    border: "1px solid #2E3942",
  },

  /* input background should be #0F1C25, placeholder white text handled in styled-jsx */
  input: {
    width: "100%",
    padding: "12px 14px",
    background: "#0C1217", // input background
    border: "none",
    borderRadius: 6,
    color: "#ffffff", // typed text white
    fontSize: 14,
    boxSizing: "border-box",
  },

  pillButton: {
    width: 400,
    maxWidth: "75vw",
    height: 44,
    borderRadius: 44,
    border: "none",
    /* Use double background trick to create gradient border while keeping inner fill dark */
    background:
      "linear-gradient(#0C1217, #0C1217) padding-box, linear-gradient(90deg, #37ABFF, #0C1217) border-box",
    /* ensure inner area uses padding-box so gradient shows as border */
    WebkitBackgroundClip: "padding-box, border-box",
    backgroundClip: "padding-box, border-box",
    boxShadow: "inset 0 -8px 20px rgba(0,0,0,0.6)",
    cursor: "pointer",
    color: "#fff",
    fontSize: 14,
    fontWeight: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "visible",
    marginTop: 8,
  },
};
