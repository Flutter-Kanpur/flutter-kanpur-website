"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const handleContinue = () => {
    if (!github || !portfolio || !linkedin) {
      alert("Please fill all fields");
      return;
    }

    const data = { github, portfolio, linkedin };
    console.log("Social links:", data);
    router.push("/onboarding/screen4");
  };

  const handleBack = () => {
    router.push("/onboarding/screen2");
  };

  return (
    <div style={page.wrapper}>
      {/* Top-left logged-in info */}
      <div style={page.topLeft}>
        <div style={{ fontSize: 12, color: "#2E3942" }}>Logged in as :</div>
        <div style={{ fontSize: 12, color: "#A6A6A6", marginTop: 6 }}>
          angelicasingh.design@gmail.com
        </div>
      </div>

      {/* Top-right logout */}
      <button style={page.logoutBtn} onClick={() => alert("Logout clicked")}>
        Logout
      </button>

      {/* Card */}
      <div style={page.card}>
        <h2 style={page.title}>Social Links</h2>
        <p style={page.subtitle}>Attach links of your social media</p>

        {/* GitHub */}
        <div style={styles.inputWrapper}>
          <span style={styles.leftIcon} aria-hidden>
            {/* GitHub svg icon */}
            <img src="/assets/github.svg" width={18} height={18} alt="My Icon" />

          </span>
          <input
            className="textInput"
            type="text"
            placeholder="GitHub Profile"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Portfolio */}
        <div style={styles.inputWrapper}>
          <span style={styles.leftIcon} aria-hidden>
            {/* Globe / website svg */}
              <img src="/assets/globe.svg" width={18} height={18} alt="My Icon" />

          </span>
          <input
            className="textInput"
            type="text"
            placeholder="Portfolio/Website (if any)"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* LinkedIn */}
        <div style={styles.inputWrapper}>
          <span style={styles.leftIcon} aria-hidden>
            {/* LinkedIn svg */}
            <img src="/assets/linkedin.svg" width={18} height={18} alt="My Icon" />

          </span>
          <input
            className="textInput"
            type="text"
            placeholder="LinkedIn Profile"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Continue button */}
        <div
          style={{
            position: "relative",
            marginTop: 18,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button style={styles.pillButton} onClick={handleContinue}>
            CONTINUE
          </button>
        </div>

        {/* Go back */}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button style={styles.backText} onClick={handleBack}>
            Go back
          </button>
        </div>
      </div>

      {/* placeholder styling & autofill fixes */}
      <style jsx>{`
        .textInput::placeholder {
          color: #a6a6a6;
          opacity: 1;
          font-weight: 400;
        }
        .textInput::-webkit-input-placeholder {
          color: #a6a6a6;
        }
        .textInput:-moz-placeholder,
        .textInput::-moz-placeholder {
          color: #a6a6a6;
        }
        .textInput:-ms-input-placeholder {
          color: #a6a6a6;
        }

        input:-webkit-autofill {
          -webkit-text-fill-color: #ffffff !important;
          box-shadow: 0 0 0px 1000px #0f1c25 inset !important;
        }
      `}</style>
    </div>
  );
}

/* page layout styles */
const page = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(circle at 50% 45%, rgba(63,209,255,0.15) 0%, rgba(63,209,255,0.05) 25%, transparent 50%), radial-gradient(circle at 50% 40%, #010A10 0%, #010A10 100%)",
    fontFamily: "'Encode Sans', sans-serif",
    position: "relative",
    padding: "48px",
  },
  topLeft: {
    position: "absolute",
    top: 18,
    left: 22,
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
  card: {
    width: 420,
    maxWidth: "92vw",
    background: "#0C1217",
    borderRadius: 15,
    padding: "28px",
    border: "1px solid rgba(255,255,255,0.04)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
    boxSizing: "border-box",
    textAlign: "left",
  },
  title: {
    margin: 0,
    color: "#E6F9FF",
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 6,
  },
  subtitle: {
    margin: 0,
    color: "#A6A6A6",
    fontSize: 12,
    marginBottom: 18,
  },
};

const styles = {
  inputWrapper: {
    borderRadius: 8,
    padding: "1.5px", // gradient border thickness
    marginBottom: 12,
    background:
      "linear-gradient(#0C1217,#0C1217) padding-box, linear-gradient(90deg, #FFFFFF, #7AFFFF) border-box",
    boxSizing: "border-box",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  leftIcon: {
    position: "absolute",
    left: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    paddingLeft: 44, // space for icon
    background: "#0C1217",
    border: "1px solid #2E3942",
    borderRadius: 6,
    color: "#FFFFFF",
    fontSize: 14,
    boxSizing: "border-box",
    outline: "none",
  },
  pillButton: {
    width: 360,
    maxWidth: "100%",
    height: 44,
    borderRadius: 44,
    border: "none",
    background:
      "linear-gradient(#0C1217, #0C1217) padding-box, linear-gradient(90deg, #37ABFF, #0C1217) border-box",
    WebkitBackgroundClip: "padding-box, border-box",
    backgroundClip: "padding-box, border-box",
    boxShadow: "inset 0 -8px 20px rgba(0,0,0,0.6)",
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    position: "relative",
    overflow: "visible",
  },

  backText: {
    background: "none",
    border: "none",
    color: "#A6A6A6",
    fontSize: 13,
    cursor: "pointer",
  },
};
