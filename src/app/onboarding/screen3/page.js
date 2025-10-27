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
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateGithubURL = (url) => {
    if (!url.trim()) return "GitHub profile is required";
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/;
    if (!githubRegex.test(url.trim())) {
      return "Please enter a valid GitHub profile URL (e.g., https://github.com/username)";
    }
    return "";
  };

  const validateLinkedinURL = (url) => {
    if (!url.trim()) return "";
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    if (!linkedinRegex.test(url.trim())) {
      return "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)";
    }
    return "";
  };

  const validatePortfolioURL = (url) => {
    if (!url.trim()) return "";
    const urlRegex = /^https?:\/\/[^\s$.?#].[^\s]*$/;
    if (!urlRegex.test(url.trim())) {
      return "Please enter a valid website URL (e.g., https://yoursite.com)";
    }
    return "";
  };

  // Real-time validation handlers
  const handleGithubChange = (e) => {
    const value = e.target.value;
    setGithubProfile(value);
    if (errors.github) {
      setErrors(prev => ({ ...prev, github: validateGithubURL(value) }));
    }
  };

  const handleLinkedinChange = (e) => {
    const value = e.target.value;
    setLinkedinProfile(value);
    if (errors.linkedin) {
      setErrors(prev => ({ ...prev, linkedin: validateLinkedinURL(value) }));
    }
  };

  const handlePortfolioChange = (e) => {
    const value = e.target.value;
    setPortfolioWebsite(value);
    if (errors.portfolio) {
      setErrors(prev => ({ ...prev, portfolio: validatePortfolioURL(value) }));
    }
  };

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

  const handleContinue = () => {
    // Validate all fields
    const githubError = validateGithubURL(githubProfile);
    const linkedinError = validateLinkedinURL(linkedinProfile);
    const portfolioError = validatePortfolioURL(portfolioWebsite);

    const newErrors = {
      github: githubError,
      linkedin: linkedinError,
      portfolio: portfolioError,
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (githubError || linkedinError || portfolioError) {
      return;
    }

    localStorage.setItem(
      "onboardingScreen3",
      JSON.stringify({ githubProfile, portfolioWebsite, linkedinProfile })
    );

    // Navigate to screen 4
    router.push("/onboarding/screen4");
  };

  return (
    <>
      <style jsx>{`
        input:focus {
          border-color: #37ABFF !important;
          box-shadow: 0 0 10px rgba(55, 171, 255, 0.5) !important;
        }
        textarea:focus {
          border-color: #37ABFF !important;
          box-shadow: 0 0 10px rgba(55, 171, 255, 0.5) !important;
        }
        button:hover {
          box-shadow: inset 0 -8px 20px rgba(0,0,0,0.6), 0 0 30px rgba(55, 171, 255, 0.5) !important;
        }
      `}</style>
      <div style={pageStyles.wrapper}>
        {/* Top-left logged-in info */}
        <div style={pageStyles.topLeft}>
          <div style={{ fontSize: 12, color: "#2E3942" }}>Logged in as :</div>
          <div style={{ fontSize: 12, color: "#A6A6A6", marginTop: 6 }}>
            {userEmail || "Loading..."}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        </div>

        {/* Card */}
        <div style={pageStyles.card}>
          <h2 style={pageStyles.title}>Social Links</h2>
          <p style={pageStyles.subtitle}>Add links of your social media</p>

          <div style={{ marginBottom: '20px' }}></div>

          <div style={styles.fieldsBox}>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Github Profile"
                value={githubProfile}
                onChange={handleGithubChange}
                style={{
                  ...styles.input,
                  borderColor: errors.github ? '#ff4444' : 'rgba(255,255,255,0.06)'
                }}
              />
              {errors.github && (
                <div style={styles.errorText}>{errors.github}</div>
              )}
            </div>

            <div style={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Portfolio/Website (if any)"
                value={portfolioWebsite}
                onChange={handlePortfolioChange}
                style={{
                  ...styles.input,
                  borderColor: errors.portfolio ? '#ff4444' : 'rgba(255,255,255,0.06)'
                }}
              />
              {errors.portfolio && (
                <div style={styles.errorText}>{errors.portfolio}</div>
              )}
            </div>

            <div style={styles.inputWrapper}>
              <input
                type="text"
                placeholder="LinkedIn Profile"
                value={linkedinProfile}
                onChange={handleLinkedinChange}
                style={{
                  ...styles.input,
                  borderColor: errors.linkedin ? '#ff4444' : 'rgba(255,255,255,0.06)'
                }}
              />
              {errors.linkedin && (
                <div style={styles.errorText}>{errors.linkedin}</div>
              )}
            </div>
          </div>

          {/* Continue button */}
          <div style={{ marginTop: '60px' }}>
            <button style={styles.pill} onClick={handleContinue}>
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
  fieldsBox: { 
    display: "flex", 
    flexDirection: "column", 
    gap: 12 
  },
  inputWrapper: { 
    marginBottom: 0 
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
    fontFamily: 'Encode Sans, sans-serif',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  errorText: {
    color: '#ff4444',
    fontSize: '12px',
    marginTop: '4px',
    fontFamily: 'Encode Sans, sans-serif',
  },
  pill: {
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