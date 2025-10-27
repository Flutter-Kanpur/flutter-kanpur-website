"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";

export default function Page() {
  const router = useRouter();
  const auth = getAuth();

  const [userEmail, setUserEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [years, setYears] = useState("");
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  const skillsOptions = [
    "React", "Node.js", "UI/UX", "Python", "Flutter", "JavaScript", 
    "TypeScript", "Mobile Development", "Backend Development", "Frontend Development"
  ];

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

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

  // Close skills dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.skills-dropdown')) {
        setIsSkillsOpen(false);
      }
    };

    if (isSkillsOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSkillsOpen]);

  const handleContinue = () => {
    // Validation
    if (!selectedRole) {
      alert("Please select a role");
      return;
    }

    if (selectedSkills.length === 0) {
      alert("Please select at least one skill");
      return;
    }

    if (!years.trim()) {
      alert("Please enter your years of experience");
      return;
    }

    // Validate years of experience format (should be a number or range)
    const yearsRegex = /^(\d+(\.\d+)?|\d+-\d+|\d+\+?)(\s*(years?|yrs?))?$/i;
    if (!yearsRegex.test(years.trim())) {
      alert("Please enter a valid years of experience (e.g., '2', '1-3', '5+', '2.5 years')");
      return;
    }

    // Save to localStorage
    localStorage.setItem(
      "onboardingScreen2",
      JSON.stringify({ selectedRole, selectedSkills, years })
    );

    router.push("/onboarding/screen3");
  };

  return (
    <>
      <style jsx>{`
        select:focus {
          border-color: #37ABFF !important;
          box-shadow: 0 0 10px rgba(55, 171, 255, 0.5) !important;
        }
        input:focus {
          border-color: #37ABFF !important;
          box-shadow: 0 0 10px rgba(55, 171, 255, 0.5) !important;
        }
        select option {
          background-color: #010A10;
          color: #E5E8EC;
          padding: 8px;
        }
        .option-hover:hover {
          background-color: #2E3942 !important;
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

        /* Card */
        <div style={pageStyles.card}>
          <h2 style={pageStyles.title}>Professional Info</h2>
          <p style={pageStyles.subtitle}>Fill your roles, skills & experience</p>

          <div style={{ marginBottom: '20px' }}></div>

          {/* Fields */}
          <div style={styles.fieldsBox}>
            {/* Role Dropdown */}
            <div style={styles.dropdownWrapper}>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={styles.dropdown}
              >
                <option value="" disabled>Role</option>
                <option value="Developer">Developer</option>
                <option value="Event Organizer">Event Organizer</option>
                <option value="Designer">Designer</option>
                <option value="Enthusiast">Enthusiast</option>
              </select>
            </div>

            {/* Years of Experience Input */}
            <div style={styles.inputWrapper}>
              <input
                type="text"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="Years of Experience"
                style={styles.input}
              />
            </div>

            {/* Skills Multi-Select Dropdown */}
            <div style={styles.multiSelectWrapper} className="skills-dropdown">
              <div 
                style={{...styles.dropdown, cursor: 'pointer'}}
                onClick={() => setIsSkillsOpen(!isSkillsOpen)}
              >
                {selectedSkills.length === 0 ? 'Skills' : `${selectedSkills.length} skill(s) selected`}
              </div>
              {isSkillsOpen && (
                <div style={styles.dropdownOptions}>
                  {skillsOptions.map((skill) => (
                    <div
                      key={skill}
                      className="option-hover"
                      style={{
                        ...styles.option,
                        backgroundColor: selectedSkills.includes(skill) ? '#37ABFF' : 'transparent'
                      }}
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
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
  fieldsBox: { display: "flex", flexDirection: "column", gap: 20 },
  dropdownWrapper: {
    borderRadius: 8,
    padding: 0,
  },
  inputWrapper: { 
    marginBottom: 0 
  },
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
  multiSelectWrapper: {
    position: 'relative',
    borderRadius: 8,
  },
  dropdown: {
    width: "100%",
    padding: "10px 12px",
    background: "transparent",
    border: "1px solid #2E3942",
    borderRadius: 8,
    color: "#E5E8EC",
    fontSize: 16,
    boxSizing: "border-box",
    cursor: "pointer",
    fontWeight: 400,
    fontFamily: 'Encode Sans, sans-serif',
    outline: 'none',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'right 12px center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '16px',
    paddingRight: '40px',
  },
  dropdownOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: '#010A10',
    border: '1px solid #2E3942',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: '200px',
    overflowY: 'auto',
    zIndex: 1000,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
  },
  option: {
    padding: '10px 12px',
    color: '#E5E8EC',
    cursor: 'pointer',
    fontSize: 14,
    fontFamily: 'Encode Sans, sans-serif',
    transition: 'background-color 0.2s ease',
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
