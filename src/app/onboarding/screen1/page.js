"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";

export default function Page() {
  const router = useRouter();
  const auth = getAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Real-time email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("");
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  // Fetch logged-in user's email from Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        setUserEmail(user.email);
        console.log("User email set:", user.email);
      } else {
        console.log("No user or email found");
        // Fallback: try to get from localStorage if user was previously logged in
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
          setUserEmail(storedEmail);
        }
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleContinue = () => {
    // Get current user email if not already set
    const currentUser = auth.currentUser;
    const emailToUse = userEmail || (currentUser ? currentUser.email : "");
    
    // Validation
    if (!fullName.trim()) {
      alert("Please enter your full name");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert("Please enter a valid email address");
      return;
    }

    const finalEmail = emailToUse || (currentUser ? currentUser.email : "user@example.com");

    // Save all info to localStorage
    const screen1Data = {
      fullName: fullName.trim(),
      email: email.trim(),
      email: finalEmail,
    };

    localStorage.setItem("onboardingScreen1", JSON.stringify(screen1Data));

    router.push("/onboarding/screen2");
  };

  return (
    <>
      <style jsx>{`
        input:focus {
          border-color: #37ABFF !important;
          box-shadow: 0 0 10px rgba(55, 171, 255, 0.5) !important;
        }
        button:hover {
          box-shadow: inset 0 -8px 20px rgba(0,0,0,0.6), 0 0 30px rgba(55, 171, 255, 0.5) !important;
        }
      `}</style>
      <div style={pageStyles.wrapper}>
        <div style={pageStyles.topLeft}>
          <div style={{ fontSize: 12, color: "#2E3942" }}>Logged in as :</div>
          <div style={{ fontSize: 12, color: "#A6A6A6", marginTop: 6 }}>
            {userEmail || "Loading..."}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        </div>

        <div style={pageStyles.card}>
          <h2 style={pageStyles.title}>Basic Information</h2>
          <p style={pageStyles.subtitle}>Personal Details</p>

          <div style={{ marginBottom: '20px' }}></div>

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
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              placeholder="Email"
              style={{
                ...styles.input,
                borderColor: emailError ? '#ff4444' : '#2E3942'
              }}
            />
            {emailError && (
              <div style={styles.errorText}>{emailError}</div>
            )}
          </div>

          <div style={{ marginTop: '60px' }}>
            <button style={styles.pillButton} onClick={handleContinue}>
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

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

const styles = {
  inputWrapper: { marginBottom: 20 },
  input: {
    width: "100%",
    padding: "12px 14px",
    background: "transparent",
    border: "1px solid #2E3942",
    borderRadius: 8,
    color: "#ffffff",
    fontSize: 16,
    boxSizing: "border-box",
    fontFamily: 'Encode Sans, sans-serif',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  errorText: {
    color: '#ff4444',
    fontSize: '12px',
    marginTop: '4px',
    fontFamily: 'Encode Sans, sans-serif',
  },
  pillButton: {
    width: '100%',
    height: '48px',
    borderRadius: 44,
    border: "none",
    background:
      "linear-gradient(#0C1217, #0C1217) padding-box, linear-gradient(90deg, #37ABFF, #0C1217) border-box",
    WebkitBackgroundClip: "padding-box, border-box",
    backgroundClip: "padding-box, border-box",
    boxShadow: "inset 0 -8px 20px rgba(0,0,0,0.6), 0 0 20px rgba(55, 171, 255, 0.3)",
    cursor: "pointer",
    color: "#fff",
    fontSize: '14px',
    fontWeight: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "visible",
    transition: 'box-shadow 0.3s ease',
  },
};
