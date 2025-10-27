"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import LogoutButton from "@/components/components/ui/LogoutButton";

export default function Page() {
  const router = useRouter();
  const auth = getAuth();

  const [userEmail, setUserEmail] = useState("");
  const [githubProfile, setGithubProfile] = useState("");
  const [portfolioWebsite, setPortfolioWebsite] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [bio, setBio] = useState("");

  // Fetch logged-in user's email
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, [auth]);

  // Redirect checks
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

  // Prefill data if navigating back
  useEffect(() => {
    const data = localStorage.getItem("onboardingScreen3");
    if (data) {
      const { githubProfile, portfolioWebsite, linkedinProfile } = JSON.parse(data);
      setGithubProfile(githubProfile || "");
      setPortfolioWebsite(portfolioWebsite || "");
      setLinkedinProfile(linkedinProfile || "");
    }
  }, []);

  // Helper function to normalize URLs
  const normalizeUrl = (url) => {
    if (!url.trim()) return url;
    const trimmedUrl = url.trim();
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
      return 'https://' + trimmedUrl;
    }
    return trimmedUrl;
  };

  const handleContinue = () => {
    // Normalize URLs by adding https:// if missing
    const normalizedGithub = normalizeUrl(githubProfile);
    const normalizedPortfolio = normalizeUrl(portfolioWebsite);
    const normalizedLinkedin = normalizeUrl(linkedinProfile);

    // Validation for social links (only if they are provided)
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/i;
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/i;

    // Validate GitHub profile if provided
    if (githubProfile.trim() && !githubRegex.test(normalizedGithub)) {
      alert("Please enter a valid GitHub profile URL (e.g., https://github.com/username)");
      return;
    }

    // Validate Portfolio/Website if provided
    if (portfolioWebsite.trim() && !urlRegex.test(normalizedPortfolio)) {
      alert("Please enter a valid website URL (e.g., https://yourwebsite.com)");
      return;
    }

    // Validate LinkedIn profile if provided
    if (linkedinProfile.trim() && !linkedinRegex.test(normalizedLinkedin)) {
      alert("Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)");
      return;
    }

    // Social links are optional, so save even if empty (use normalized URLs)
    localStorage.setItem(
      "onboardingScreen3",
      JSON.stringify({ 
        githubProfile: normalizedGithub, 
        portfolioWebsite: normalizedPortfolio, 
        linkedinProfile: normalizedLinkedin 
      })
    );

    // Navigate to final dashboard or next step
    router.push("/onboarding/screen4");
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

    // Navigate to final dashboard or next step
    router.push("/dashboard");
  };

  const handleGoBack = () => {
    router.push("/onboarding/screen2");
  };

  return (
    <>
      <style jsx>{`
        input:focus, textarea:focus {
          border-color: #37ABFF !important;
          box-shadow: 0 0 10px rgba(55, 171, 255, 0.5) !important;
        }
        button:hover {
          box-shadow: inset 0 -8px 20px rgba(0,0,0,0.6), 0 0 30px rgba(55, 171, 255, 0.5) !important;
        }
        .go-back-button:hover {
          color: #37ABFF !important;
        }
      `}</style>
      <div style={pageStyles.wrapper}>
        {/* Top-left logged-in info */}
        <div style={pageStyles.topLeft}>
          <div style={{ fontSize: 12, color: "#2E3942" }}>Logged in as :</div>
          <div style={{ fontSize: 12, color: "#A6A6A6", marginTop: 6 }}>
            {userEmail || "Loading..."}
          </div>
    <div style={pageStyles.wrapper}>
      {/* Top-left logged-in info */}
      <div style={pageStyles.topLeft}>
        <div style={{ fontSize: 12, color: "#2E3942" }}>Logged in as :</div>
        <div style={{ fontSize: 12, color: "#A6A6A6", marginTop: 6 }}>
          {userEmail || "Loading..."}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        </div>

        {/* Card */}
        <div style={pageStyles.card}>
          <h2 style={pageStyles.title}>Social Links</h2>
          <p style={pageStyles.subtitle}>Attach links of your social media</p>

          <div style={{ marginBottom: '20px' }}></div>

          <div style={styles.fieldsBox}>
            {/* GitHub Profile */}
            <div style={styles.inputWrapper}>
              <div style={styles.iconInputContainer}>
                <div style={styles.iconContainer}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#E5E8EC">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="GitHub Profile"
                  value={githubProfile}
                  onChange={(e) => setGithubProfile(e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            {/* Portfolio/Website */}
            <div style={styles.inputWrapper}>
              <div style={styles.iconInputContainer}>
                <div style={styles.iconContainer}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#E5E8EC">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Portfolio/Website (if any)"
                  value={portfolioWebsite}
                  onChange={(e) => setPortfolioWebsite(e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            {/* LinkedIn Profile */}
            <div style={styles.inputWrapper}>
              <div style={styles.iconInputContainer}>
                <div style={styles.iconContainer}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#E5E8EC">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="LinkedIn Profile"
                  value={linkedinProfile}
                  onChange={(e) => setLinkedinProfile(e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ marginTop: '60px' }}>
            <button style={styles.pill} onClick={handleContinue}>
              CONTINUE
            </button>
          </div>

          {/* Go back link */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button 
              className="go-back-button"
              style={styles.goBackButton}
              onClick={handleGoBack}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </>
      

      {/* Card */}
      <div style={pageStyles.card}>
        <h2 style={pageStyles.title}>Professional Details</h2>
        <p style={pageStyles.subtitle}>Portfolio & Bio</p>

        <div style={styles.fieldsBox}>
          <input
            type="text"
            placeholder="Portfolio Link"
            value={portfolioLink}
            onChange={(e) => setPortfolioLink(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="Short Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={{ ...styles.input, height: 100, resize: "none" }}
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
  fieldsBox: { display: "flex", flexDirection: "column", gap: 20 },
  inputWrapper: { 
    marginBottom: 0 
  },
  iconInputContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: "100%",
    padding: "12px 14px 12px 40px",
    borderRadius: 8,
    background: "transparent",
    border: "1px solid #2E3942",
    color: "#E5E8EC",
    fontSize: 16,
    boxSizing: "border-box",
    outline: "none",
    fontWeight: 400,
    fontFamily: 'Encode Sans, sans-serif',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  pill: {
    width: '100%',
    height: '48px',
  subtitle: { margin: 0, color: "#A6A6A6", fontSize: 12, marginBottom: 18 },
};

const styles = {
  fieldsBox: { display: "flex", flexDirection: "column", gap: 12 },
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
    boxShadow: "inset 0 -8px 20px rgba(0,0,0,0.6), 0 0 20px rgba(55, 171, 255, 0.3)",
    boxShadow: "inset 0 -8px 20px rgba(0,0,0,0.6)",
    border: "none",
    color: "#fff",
    fontSize: '14px',
    fontWeight: 600,
    cursor: "pointer",
    position: "relative",
    overflow: "visible",
    transition: 'box-shadow 0.3s ease',
  },
  goBackButton: {
    background: 'transparent',
    border: 'none',
    color: '#A6A6A6',
    fontSize: '14px',
    fontWeight: '400',
    cursor: 'pointer',
    fontFamily: 'Encode Sans, sans-serif',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
};
