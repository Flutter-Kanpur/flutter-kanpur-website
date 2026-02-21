"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {auth } from "@/lib/firebase/server/setup";
import LogoutButton from "@/components/components/ui/LogoutButton";
import ApplyNowButton from "@/components/buttons/ApplyNowButton";

export default function Page() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [years, setYears] = useState("");
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false);
  
  const availableRoles = ["Developer", "Event Organizer", "Designer", "Enthusiast"];
  const availableSkills = ["React", "Node", "UI/UX", "Python", "Flutter"];

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isRoleDropdownOpen && !event.target.closest('[data-role-dropdown]')) {
        setIsRoleDropdownOpen(false);
      }
      if (isSkillsDropdownOpen && !event.target.closest('[data-skills-dropdown]')) {
        setIsSkillsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isRoleDropdownOpen, isSkillsDropdownOpen]);

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
        <div style={{ fontSize: 16, color: "#2E3942" }}>Logged in as :</div>
        <div style={{ fontSize: 16, color: "#A6A6A6", marginTop: 6 }}>
          {userEmail || "Loading..."}
        </div>
      </div>

      

      {/* Card */}
      <div style={pageStyles.card}>
        <h2 style={pageStyles.title}>Professional Info</h2>
        <p style={pageStyles.subtitle}>Fill your roles, skills & experience</p>

        {/* Fields */}
        <div style={styles.fieldsBox}>
          {/* Roles Input with Dropdown */}
          <div style={styles.inputWrapper} data-role-dropdown>
            <input
              type="text"
              placeholder="Role"
              value={selectedRoles.length > 0 ? selectedRoles.join(", ") : ""}
              readOnly
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              style={{...styles.input, cursor: "pointer"}}
            />
            <span 
              style={{
                ...styles.chevron,
                transform: isRoleDropdownOpen ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)",
                transition: "transform 0.2s ease"
              }}
            >
              ▼
            </span>
            
            {/* Dropdown Menu */}
            {isRoleDropdownOpen && (
              <div style={styles.dropdown}>
                {availableRoles.map((role) => (
                  <div
                    key={role}
                    onClick={() => {
                      if (selectedRoles.includes(role)) {
                        setSelectedRoles(selectedRoles.filter((r) => r !== role));
                      } else {
                        setSelectedRoles([...selectedRoles, role]);
                      }
                    }}
                    style={{
                      ...styles.dropdownItem,
                      backgroundColor: selectedRoles.includes(role) ? "rgba(55, 171, 255, 0.1)" : "transparent",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role)}
                      onChange={() => {}}
                      style={styles.dropdownCheckbox}
                    />
                    <span style={styles.dropdownItemText}>{role}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Skills Input with Dropdown */}
          <div style={styles.inputWrapper} data-skills-dropdown>
            <input
              type="text"
              placeholder="Skills"
              value={selectedSkills.length > 0 ? selectedSkills.join(", ") : ""}
              readOnly
              onClick={() => setIsSkillsDropdownOpen(!isSkillsDropdownOpen)}
              style={{...styles.input, cursor: "pointer"}}
            />
            <span 
              style={{
                ...styles.chevron,
                transform: isSkillsDropdownOpen ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)",
                transition: "transform 0.2s ease"
              }}
            >
              ▼
            </span>
            
            {/* Skills Dropdown Menu */}
            {isSkillsDropdownOpen && (
              <div style={styles.dropdown}>
                {availableSkills.map((skill) => (
                  <div
                    key={skill}
                    onClick={() => {
                      if (selectedSkills.includes(skill)) {
                        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
                      } else {
                        setSelectedSkills([...selectedSkills, skill]);
                      }
                    }}
                    style={{
                      ...styles.dropdownItem,
                      backgroundColor: selectedSkills.includes(skill) ? "rgba(55, 171, 255, 0.1)" : "transparent",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => {}}
                      style={styles.dropdownCheckbox}
                    />
                    <span style={styles.dropdownItemText}>{skill}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Years of Experience */}
          <div style={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Years of Experience"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              style={{...styles.input, paddingRight: "14px"}}
            />
          </div>
        </div>

        {/* Continue button */}
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 28 }}
        >
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
  subtitle: { margin: 0, color: "#A6A6A6", fontSize: 12, marginBottom: 18 },
};

/* Component styles */
const styles = {
  fieldsBox: { display: "flex", flexDirection: "column", gap: 14 },
  inputWrapper: {
    position: "relative",
    marginBottom: 0,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    paddingRight: "40px",
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
  chevron: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#A6A6A6",
    fontSize: "12px",
    pointerEvents: "none",
  },
  skillsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 4,
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0",
    cursor: "pointer",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    marginRight: "12px",
    cursor: "pointer",
    accentColor: "#37ABFF",
  },
  checkboxLabel: {
    color: "#A6A6A6",
    fontSize: 14,
    fontFamily: 'Encode Sans, sans-serif',
    cursor: "pointer",
    userSelect: "none",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: "4px",
    background: "#0C1217",
    border: "1px solid #2E3942",
    borderRadius: 6,
    zIndex: 1000,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    maxHeight: "200px",
    overflowY: "auto",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 14px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  dropdownItemText: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: 'Encode Sans, sans-serif',
    marginLeft: "12px",
  },
  dropdownCheckbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    accentColor: "#37ABFF",
  },
};


