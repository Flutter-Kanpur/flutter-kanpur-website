"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import LogoutButton from "@/components/components/ui/LogoutButton";

export default function Page() {
  const router = useRouter();
  const auth = getAuth();

  const [userEmail, setUserEmail] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [years, setYears] = useState("");

  // Fetch logged-in user's email for UI display
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, [auth]);

  // Redirect only if onboardingScreen1 is missing
  useEffect(() => {
    try {
      const screen1Data = localStorage.getItem("onboardingScreen1");
      const parsed = screen1Data ? JSON.parse(screen1Data) : null;

      if (!parsed || !parsed.email) {
        router.push("/onboarding/screen1");
      }
    } catch (err) {
      console.error("Error reading onboardingScreen1:", err);
      router.push("/onboarding/screen1");
    }
  }, []); // run once on mount

  const handleContinue = () => {
    if (!selectedRoles.length || !selectedSkills.length || !years.trim()) {
      alert("Please fill all fields");
      return;
    }

    // Save to localStorage
    localStorage.setItem(
      "onboardingScreen2",
      JSON.stringify({ selectedRoles, selectedSkills, years })
    );

    router.push("/onboarding/screen3");
  };

  const handleBack = () => {
    router.push("/onboarding/screen1");
  };

  return (
    <div style={pageStyles.wrapper}>
      {/* Top-left logged-in info */}
      <div style={pageStyles.topLeft}>
        <div style={{ fontSize: 12, color: "#2E3942" }}>Logged in as :</div>
        <div style={{ fontSize: 12, color: "#A6A6A6", marginTop: 6 }}>
          {userEmail || "Loading..."}
        </div>
      </div>

      

      {/* Card */}
      <div style={pageStyles.card}>
        <h2 style={pageStyles.title}>Professional Info</h2>
        <p style={pageStyles.subtitle}>Fill your roles, skills & experience</p>

        {/* Fields */}
        <div style={styles.fieldsBox}>
          {/* Roles Dropdown */}
          <div style={styles.singleWrapper}>
            <select
              multiple
              value={selectedRoles}
              onChange={(e) =>
                setSelectedRoles(
                  [...e.target.selectedOptions].map((o) => o.value)
                )
              }
              style={styles.innerSelect}
            >
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {/* Skills */}
          <div>
            {["React", "Node", "UI/UX", "Python", "Flutter"].map((skill) => (
              <div key={skill} style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  value={skill}
                  checked={selectedSkills.includes(skill)}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (selectedSkills.includes(value)) {
                      setSelectedSkills(
                        selectedSkills.filter((s) => s !== value)
                      );
                    } else {
                      setSelectedSkills([...selectedSkills, value]);
                    }
                  }}
                />
                <span style={{ marginLeft: 8 }}>{skill}</span>
              </div>
            ))}
          </div>

          {/* Years of Experience */}
          <input
            type="text"
            placeholder="Years of Experience"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Continue button */}
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 18 }}
        >
          <button style={styles.pill} onClick={handleContinue}>
            CONTINUE
          </button>
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

/* Page layout styles */
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

/* Component styles */
const styles = {
  fieldsBox: { display: "flex", flexDirection: "column", gap: 12 },
  innerSelect: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    background: "#0F1C25",
    border: "none",
    borderRadius: 4,
    color: "#E5E8EC",
    fontSize: 14,
    boxSizing: "border-box",
    cursor: "pointer",
    fontWeight: 400,
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    padding: "8px 6px",
    borderRadius: 6,
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 5,
    background: "#0C1217",
    border: "1px solid rgba(255,255,255,0.06)",
    color: "#E5E8EC",
    fontSize: 14,
    boxSizing: "border-box",
    outline: "none",
    fontWeight: 400,
  },
  singleWrapper: {
    borderRadius: 5,
    padding: 1.5,
    background:
      "linear-gradient(#0C1217,#0C1217) padding-box, linear-gradient(90deg, rgba(255,255,255,0.06), rgba(122,255,255,0.02)) border-box",
  },
  pill: {
    width: 360,
    maxWidth: "85%",
    height: 44,
    borderRadius: 44,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(#0C1217, #0C1217) padding-box, linear-gradient(90deg, #37ABFF, #0C1217) border-box",
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
};
