"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/components/ui/LogoutButton";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const screen1Data = JSON.parse(localStorage.getItem("onboardingScreen1"));

    if (!storedEmail || !screen1Data) {
      router.replace("/onboarding/screen1"); // redirect if data missing
      return;
    }

    setEmail(storedEmail);
    setFullName(screen1Data.fullName || "");
  }, [router]);

  return (
    <>
      <style jsx>{`
        button:hover {
          box-shadow: inset 0 -8px 20px rgba(0,0,0,0.6), 0 0 30px rgba(55, 171, 255, 0.5) !important;
        }
      `}</style>
      <div style={pageStyles.wrapper}>
        {/* Top-left info */}
        <div style={pageStyles.topLeft}>
          <div style={{ fontSize: 12, color: "#2E3942" }}>Logged in as :</div>
          <div style={{ fontSize: 12, color: "#A6A6A6", marginTop: 6 }}>
            {email || "Loading..."}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        </div>
        
        {/* Card */}
        <div style={pageStyles.card}>
          <h2 style={pageStyles.title}>Congratulations!</h2>
          <p style={pageStyles.subtitle}>You&apos;re all set, {fullName || "User"}!</p>

          <div style={{ marginTop: '60px' }}>
            <button
              onClick={() => router.push("/")}
              style={styles.pillButton}
              aria-label="Go to dashboard"
            >
              GO TO DASHBOARD
            </button>
          </div>

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const screen1Data = JSON.parse(localStorage.getItem("onboardingScreen1"));

    if (!storedEmail || !screen1Data) {
      router.replace("/onboarding/screen1"); // redirect if data missing
      return;
    }

    setEmail(storedEmail);
    setFullName(screen1Data.fullName || "");
  }, [router]);

  return (
    <div style={page.wrapper}>
      {/* Top-left info */}
      <div style={page.topLeft}>
        <div style={{ fontSize: 12, color: "#2E3942" }}>Logged in as :</div>
        <div style={{ fontSize: 12, color: "#A6A6A6", marginTop: 6 }}>
          {email || "Loading..."}
        </div>
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
        <p style={page.subtitle}>You&apos;re all set, {fullName || "User"}!</p>

        <div
          style={{
            position: "relative",
            marginTop: 18,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => router.push("/")}
            style={styles.pillButton}
            aria-label="Go to dashboard"
          >
            <span style={{ position: "relative", zIndex: 2 }}>
              GO TO DASHBOARD
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

/* Page layout styles */
const pageStyles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    position: 'relative',
    padding: '20px',
    background: `
      radial-gradient(circle at 50% 50%, rgba(55, 171, 255, 0.15) 0%, rgba(55, 171, 255, 0.05) 30%, transparent 60%),
      #010A10
    `,
    fontFamily: "'Encode Sans', sans-serif",
    backdropFilter: 'blur(16px)',
  },
  topLeft: { 
    position: "absolute", 
    top: 18, 
    left: 22, 
    color: "#9AA3A7" 
  },
  card: {
    background: '#010A10',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: "left",
    boxSizing: "border-box",
    position: 'relative',
    zIndex: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: '20px',
    fontWeight: '400',
    marginBottom: '2px',
    textAlign: 'left',
    fontFamily: 'Encode Sans, sans-serif',
    border: "1px solid rgba(255,255,255,0.04)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  heading: {
    color: "#1EAEFF",
    margin: 0,
  },
  subtitle: { 
    color: '#A6A6A6',
    fontSize: '14px',
    fontWeight: '400',
    marginBottom: '40px',
    textAlign: 'left',
    fontFamily: 'Encode Sans, sans-serif',
    margin: 0,
    marginBottom: '40px',
  },
};

/* Component styles */
const styles = {
  pillButton: {
    width: '100%',
    height: '48px',
    borderRadius: 44,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(#0C1217, #0C1217) padding-box, linear-gradient(90deg, #37ABFF, #0C1217) border-box",
    WebkitBackgroundClip: "padding-box, border-box",
    backgroundClip: "padding-box, border-box",
    boxShadow: "inset 0 -8px 20px rgba(0,0,0,0.6), 0 0 20px rgba(55, 171, 255, 0.3)",
    border: "none",
    color: "#fff",
    fontSize: '14px',
    fontWeight: 600,
    cursor: "pointer",
    position: "relative",
    overflow: "visible",
    transition: 'box-shadow 0.3s ease',
  },
};
  
