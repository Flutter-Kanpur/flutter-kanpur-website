"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import LogoutButton from "@/components/components/ui/LogoutButton";

export default function Page() {
  const router = useRouter();
  const auth = getAuth();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Fetch logged-in user's email from Firebase
  useEffect(() => {
    const user = auth.currentUser;
    if (user && user.email) {
      setUserEmail(user.email);
    }
  }, [auth]);

  const handleContinue = () => {
    if (!fullName.trim() || !username.trim() || !userEmail.trim()) {
      alert("Please fill all fields");
      return;
    }

    // Save all info to localStorage
    const screen1Data = {
      fullName: fullName.trim(),
      username: username.trim(),
      email: userEmail.trim(),
    };

    localStorage.setItem("onboardingScreen1", JSON.stringify(screen1Data));

    router.push("/onboarding/screen2");
  };

  return (
    <div style={pageStyles.wrapper}>
      <div style={pageStyles.topLeft}>
        <div style={{ fontSize: 12, color: "#2E3942" }}>Logged in as :</div>
        <div style={{ fontSize: 12, color: "#A6A6A6", marginTop: 6 }}>
          {userEmail || "Loading..."}
        </div>
      </div>

      

      <div style={pageStyles.card}>
        <h2 style={pageStyles.title}>Basic Information</h2>
        <p style={pageStyles.subtitle}>Personal Details</p>

        <div style={styles.inputWrapper}>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            style={styles.input}
          />
        </div>

        <div style={styles.inputWrapper}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={styles.input}
          />
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 28 }}
        >
          <button style={styles.pillButton} onClick={handleContinue}>
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}

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
  topLeft: { position: "absolute", top: 18, left: 22, color: "#9AA3A7" },
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
  card: {
    width: 457,
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
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 6,
  },
  subtitle: { margin: 0, color: "#A6A6A6", fontSize: 12, marginBottom: 18 },
};

const styles = {
  inputWrapper: { marginBottom: 14 },
  input: {
    width: "100%",
    padding: "12px 14px",
    background: "#0C1217",
    border: "none",
    borderRadius: 6,
    color: "#ffffff",
    fontSize: 14,
    boxSizing: "border-box",
  },
  pillButton: {
    width: 400,
    maxWidth: "75vw",
    height: 44,
    borderRadius: 44,
    border: "none",
    background:
      "linear-gradient(#0C1217, #0C1217) padding-box, linear-gradient(90deg, #37ABFF, #0C1217) border-box",
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
  },
};
