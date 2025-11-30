"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import ApplyNowButton from "@/components/buttons/ApplyNowButton";

export default function Page() {
  const router = useRouter();
  const auth = getAuth();
  const [userEmail, setUserEmail] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, [auth]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const screen1Data = localStorage.getItem("onboardingScreen1");
    const screen2Data = localStorage.getItem("onboardingScreen2");
    if (!screen1Data || !JSON.parse(screen1Data).email) {
      router.push("/onboarding/screen1");
      return;
    }
    if (!screen2Data) {
      router.push("/onboarding/screen2");
      return;
    }
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("onboardingScreen3");
    if (data) {
      const { portfolioLink, bio } = JSON.parse(data);
      setPortfolioLink(portfolioLink || "");
      setBio(bio || "");
    }
  }, []);

  const handleContinue = () => {
    if (!portfolioLink.trim() || !bio.trim()) {
      alert("Please fill all fields");
      return;
    }
    localStorage.setItem(
      "onboardingScreen3",
      JSON.stringify({ portfolioLink, bio })
    );
    router.push("/onboarding/screen4");
  };

  const handleBack = () => {
    router.push("/onboarding/screen2");
  };

  return (
    <div style={pageStyles.wrapper}>
      <div style={pageStyles.topLeft}>
        <div style={{ fontSize: 16, color: "#2E3942" }}>Logged in as :</div>
        <div style={{ fontSize: 16, color: "#A6A6A6", marginTop: 6 }}>
          {userEmail || "Loading..."}
        </div>
      </div>

      <div style={pageStyles.card}>
        <h2 style={pageStyles.title}>Professional Details</h2>
        <p style={pageStyles.subtitle}>Portfolio & Bio</p>
        <div style={styles.fieldsBox}>
          <div style={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Portfolio Link"
              value={portfolioLink}
              onChange={(e) => setPortfolioLink(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputWrapper}>
            <textarea
              placeholder="Github Link"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{ ...styles.input, height: "44px", resize: "none", paddingTop: "12px", lineHeight: "20px" }}
            />
          </div>
        </div>

        {/* Continue button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
          <ApplyNowButton
            text="CONTINUE"
            width="100%"
            textTransform="uppercase"
            height="48px"
            fontSize="14px"
            disabled={false}
            onClick={handleContinue}
          />
        </div>

        {/* Go back */}
        <div
          onClick={handleBack}
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
    color: '#FFFFFF',
    fontSize: '20px',
    fontWeight: '400',
    marginBottom: '2px',
    textAlign: 'left',
    fontFamily: 'Encode Sans, sans-serif',
    margin: 0,
  },
  subtitle: { margin: 0, color: "#A6A6A6", fontSize: 12, marginBottom: 18 },
};

const styles = {
  fieldsBox: { display: "flex", flexDirection: "column", gap: 14 },
  inputWrapper: {
    position: "relative",
    marginBottom: 0,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 6,
    background: "#0C1217",
    border: "1px solid #2E3942",
    color: "#ffffff",
    fontSize: 14,
    boxSizing: "border-box",
    outline: "none",
    fontFamily: 'Encode Sans, sans-serif',
    transition: 'border-color 0.3s ease',
  },
};
