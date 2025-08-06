"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const name = "Angelica";
  const email = "angelicasingh.design@gmail.com";

  return (
    <div style={page.wrapper}>
      {/* Top-left info */}
      <div style={page.topLeft}>
        <div style={{ fontSize: 12, color: "#2E3942" }}>Logged in as :</div>
        <div style={{ fontSize: 12, color: "#A6A6A6", marginTop: 6 }}>{email}</div>
      </div>

      {/* Top-right logout */}
      <button
        style={page.logoutBtn}
        onClick={() => {
          /* handle logout */
          alert("Logout clicked");
        }}
      >
        Logout
      </button>

      {/* Card */}
      <div style={page.card}>
        <h2 style={page.heading}>Congratulations!</h2>
<<<<<<< HEAD
        <p style={page.subtitle}>You&apos;re all set, {name}!</p>

        {/* button row  */}
        <div style={{ position: "relative", marginTop: 18, display: "flex", justifyContent: "center" }}>

=======
        <p style={page.subtitle}>You're all set, {name}!</p>

        {/* button row  */}
        <div style={{ position: "relative", marginTop: 18, display: "flex", justifyContent: "center" }}>
          
>>>>>>> e7f7b86 (feat: Setup onboarding screen flow and routing)

          <button
            onClick={() => router.push("/")}
            style={styles.pillButton}
            aria-label="Go to dashboard"
          >
            <span style={{ position: "relative", zIndex: 2 }}>GO TO DASHBOARD</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* Page layout styles */
const page = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at 50% 45%, rgba(63,209,255,0.15) 0%, rgba(63,209,255,0.05) 25%, transparent 50%), radial-gradient(circle at 50% 40%, #010A10 0%, #010A10 100%)",
    color: "#fff",
    padding: "2rem",
    position: "relative",
    fontFamily: "'Encode Sans', sans-serif",
  },
  topLeft: {
    position: "absolute",
    top: 10,
    left: 20,
    lineHeight: 1.2,
  },
  logoutBtn: {
    position: "absolute",
    top: 10,
    right: 20,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "transparent",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: 8,
    fontSize: 12,
    cursor: "pointer",
  },
  card: {
    backgroundColor: "#0C1217",
    padding: "40px 36px",
    borderRadius: 15,
    textAlign: "left",
    maxWidth: 560,
    width: "100%",
    boxSizing: "border-box",
    // subtle border and shadow to match UI
    border: "1px solid rgba(255,255,255,0.04)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  heading: {
    color: "#1EAEFF", // bright turquoise
    margin: 0,
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 8,
  },
  subtitle: {
    margin: 0,
    color: "#C9D6DB",
    fontSize: 14,
    marginBottom: 10,
    opacity: 0.9,
  },
};

/* Component styles */
const styles = {
  pillButton: {
    width: 420,
    maxWidth: "90%",
    height: 44,
    borderRadius: 44,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // create gradient border while keeping inner dark
    background: "linear-gradient(#0C1217, #0C1217) padding-box, linear-gradient(90deg, #37ABFF, #0C1217) border-box",
    WebkitBackgroundClip: "padding-box, border-box",
    backgroundClip: "padding-box, border-box",
    boxShadow: "inset 0 -8px 20px rgba(0,0,0,0.6)",
    border: "none",
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    position: "relative",
    overflow: "visible",
  },
<<<<<<< HEAD

=======
  
>>>>>>> e7f7b86 (feat: Setup onboarding screen flow and routing)
  backText: {
    color: "#A6A6A6",
    marginTop: 12,
    cursor: "pointer",
    background: "none",
    border: "none",
  },
};
