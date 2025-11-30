"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { setUserDataToFireStore } from "@/lib/firebase/server/server-actions";
import ApplyNowButton from "@/components/buttons/ApplyNowButton";

export default function Page() {
  const router = useRouter();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Get user email from auth
    const user = auth.currentUser;
    if (user && user.email) {
      setEmail(user.email);
    }

    // Get full name from localStorage
    const screen1Data = localStorage.getItem("onboardingScreen1");
    if (screen1Data) {
      try {
        const parsed = JSON.parse(screen1Data);
        if (parsed.fullName) {
          setFullName(parsed.fullName);
        }
      } catch (err) {
        console.error("Error parsing screen1 data:", err);
      }
    }
  }, [auth]);

  const setUserDataToFirebase = async () => {
    const l1 = localStorage.getItem('onboardingScreen1');
    const l2 = localStorage.getItem('onboardingScreen2');
    const l3 = localStorage.getItem('onboardingScreen3');

    const payload = {
      fullName: JSON.parse(l1).fullName || "",
      username: JSON.parse(l1).username || "",
      email: JSON.parse(l1).email || "",
      role: JSON.parse(l2).selectedRoles || "",
      skills: JSON.parse(l2).selectedSkills || "",
      yoe: JSON.parse(l2).years || "",
      github: JSON.parse(l3).bio || "",
      website: JSON.parse(l3).portfolioLink || "",
      createdAt: new Date(),
    }
    await setUserDataToFireStore(payload);
    router.push('/')
  }





  return (
    <div style={page.wrapper}>
      {/* Top-left info */}
      <div style={page.topLeft}>
        <div style={{ fontSize: 16, color: "#2E3942" }}>Logged in as :</div>
        <div style={{ fontSize: 16, color: "#A6A6A6", marginTop: 6 }}>
          {email || "Loading..."}
        </div>
      </div>
      {/* Card */}
      <div style={page.card}>
        <h2 style={page.heading}>Congratulations!</h2>
        <p style={page.subtitle}>You&apos;re all set, {fullName || "User"}!</p>

        <div
          style={{
            position: "relative",
            marginTop: 28,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <ApplyNowButton
            text="GO TO DASHBOARD"
            width="100%"
            textTransform="uppercase"
            height="48px"
            fontSize="14px"
            disabled={false}
            onClick={() => setUserDataToFirebase()}
          />
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
    top: 18,
    left: 22,
    lineHeight: 1.2,
  },
  card: {
    backgroundColor: "#0C1217",
    padding: "40px 36px",
    borderRadius: 15,
    textAlign: "left",
    maxWidth: 560,
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid rgba(255,255,255,0.04)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  heading: {
    color: "#1EAEFF",
    margin: 0,
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 8,
    fontFamily: "'Encode Sans', sans-serif",
  },
  subtitle: {
    margin: 0,
    color: "#C9D6DB",
    fontSize: 14,
    marginBottom: 0,
    opacity: 0.9,
    fontFamily: "'Encode Sans', sans-serif",
  },
};

