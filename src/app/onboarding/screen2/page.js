"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  // open states
  const [roleOpen, setRoleOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);

  // selections & input
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [years, setYears] = useState("");

  // options
  const rolesList = ["Developer", "Event Organizer", "Designer", "Enthusiast"];
  const skillsList = ["Flutter", "React", "Design", "Event Management", "UI/UX"];

  // refs for outside-click closing
  const roleRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    function handleDocClick(e) {
      if (roleRef.current && !roleRef.current.contains(e.target)) setRoleOpen(false);
      if (skillsRef.current && !skillsRef.current.contains(e.target)) setSkillsOpen(false);
    }
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);

  const toggleRole = () => {
    setRoleOpen((s) => !s);
    setSkillsOpen(false);
  };
  const toggleSkills = () => {
    setSkillsOpen((s) => !s);
    setRoleOpen(false);
  };

  const handleRoleCheckbox = (role) =>
    setSelectedRoles((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]));

  const handleSkillCheckbox = (skill) =>
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));

  const handleContinue = () => {
    // show alert if any required field is missing
    if (!selectedRoles.length || !selectedSkills.length || !years.trim()) {
      alert("Please fill all fields");
      return;
    }
    // optional: you can gather data here before navigating
    router.push("/onboarding/screen3");
  };

  // wrapper style generator for gradient border (bright when open)
  const selectWrapperStyle = (open) => ({
    borderRadius: 5,
    padding: 1.5, // thickness of gradient border
    background: open
      ? "linear-gradient(#0C1217,#0C1217) padding-box, linear-gradient(90deg, #FFFFFF, #7AFFFF) border-box"
      : "linear-gradient(#0C1217,#0C1217) padding-box, linear-gradient(90deg, rgba(255,255,255,0.06), rgba(122,255,255,0.02)) border-box",
    boxSizing: "border-box",
  });

  return (
    <div style={page.wrapper}>
      {/* top-left info and logout */}
      <div style={page.topLeft}>
        <div style={{ fontSize: 12, color: "#2E3942" }}>Logged in as :</div>
        <div style={{ fontSize: 12, color: "#A6A6A6", marginTop: 6 }}>angelicasingh.design@gmail.com</div>
      </div>

      <button style={page.logoutBtn} onClick={() => alert("Logout clicked")}>
        Logout
      </button>

      {/* Card */}
      <div style={page.card}>
        <h2 style={page.title}>Professional Details</h2>
        <p style={page.subtitle}>Personal Details</p>

        <div style={styles.fieldsBox}>
          {/* ROLE */}
          <div style={{ position: "relative" }} ref={roleRef}>
            <div style={selectWrapperStyle(roleOpen)}>
              <button onClick={toggleRole} style={styles.innerSelect} type="button" aria-expanded={roleOpen}>
                <span style={{ color: selectedRoles.length ? "#ffffff" : "#A6A6A6", fontWeight: 400 }}>
                  {selectedRoles.length ? selectedRoles.join(", ") : "Role"}
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.9 }}>
                  <path d="M6 9l6 6 6-6" stroke="#A6A6A6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {roleOpen && (
              <div style={styles.dropdown}>
                {rolesList.map((r) => (
                  <label key={r} style={styles.checkboxRow}>
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(r)}
                      onChange={() => handleRoleCheckbox(r)}
                      className="styledCheckbox"
                    />
                    <span style={{ marginLeft: 12, color: "#E5E8EC" }}>{r}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* YEARS  */}
          <div style={styles.singleWrapper}>
            <input
              className="textInput"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="Years of Experience"
              style={styles.input}
            />
          </div>

          {/* SKILLS */}
          <div style={{ position: "relative" }} ref={skillsRef}>
            <div style={selectWrapperStyle(skillsOpen)}>
              <button onClick={toggleSkills} style={styles.innerSelect} type="button" aria-expanded={skillsOpen}>
                <span style={{ color: selectedSkills.length ? "#ffffff" : "#A6A6A6", fontWeight: 400 }}>
                  {selectedSkills.length ? selectedSkills.join(", ") : "Skills"}
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.9 }}>
                  <path d="M6 9l6 6 6-6" stroke="#A6A6A6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {skillsOpen && (
              <div style={styles.dropdown}>
                {skillsList.map((s) => (
                  <label key={s} style={styles.checkboxRow}>
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(s)}
                      onChange={() => handleSkillCheckbox(s)}
                      className="styledCheckbox"
                    />
                    <span style={{ marginLeft: 12, color: "#E5E8EC" }}>{s}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Continue  */}
        <div style={{ marginTop: 28, position: "relative", display: "flex", justifyContent: "center" }}>
          
          <button onClick={handleContinue} style={styles.pill} type="button">
            <span style={{ zIndex: 2 }}>CONTINUE</span>
          </button>
        </div>

        {/* Skip */}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button onClick={() => router.back()} style={styles.skip} type="button">
            Skip for Now
          </button>
        </div>
      </div>

      {/* styled-jsx for placeholders and checkbox gradient */}
      <style jsx>{`
        /* placeholder style */
        .textInput::placeholder {
          color: #E5E8EC;
          font-weight: 400;
          opacity: 1;
        }

        /* styled checkbox with 5px radius and gradient border */
        .styledCheckbox {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 5px;
          margin: 0;
          cursor: pointer;
          background: #0F1C25;
          border: 2px solid transparent;
          background-image: linear-gradient(#0F1C25, #0F1C25), linear-gradient(90deg, #FFFFFF, #7AFFFF);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          position: relative;
          display: inline-block;
        }

        .styledCheckbox:checked {
          background-image: linear-gradient(#37ABFF, #37ABFF), linear-gradient(90deg, #FFFFFF, #7AFFFF);
        }

        .styledCheckbox:checked::after {
          content: "";
          position: absolute;
          top: 3px;
          left: 6px;
          width: 4px;
          height: 8px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
      `}</style>
    </div>
  );
}

/* page-level styles */
const page = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at 50% 45%, rgba(63,209,255,0.12) 0%, rgba(63,209,255,0.03) 25%, transparent 50%), radial-gradient(circle at 50% 40%, #010A10 0%, #010A10 100%)",
    fontFamily: "'Encode Sans', sans-serif",
    padding: 48,
    position: "relative",
  },
  topLeft: {
    position: "absolute",
    top: 18,
    left: 22,
    color: "#9AA3A7",
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
    width: 457,
    height: 397,
    background: "#0C1217",
    borderRadius: 15,
    padding: "28px 28px",
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

/* component-level styles */
const styles = {
  fieldsBox: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

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

  dropdown: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 48,
    background: "#0F1C25",
    border: "1px solid rgba(255,255,255,0.04)",
    borderRadius: 8,
    padding: 10,
    zIndex: 50,
    boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
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
    border: "1px solid rgba(255,255,255,0.06)", // consistent thin border
    color: "#E5E8EC",
    fontSize: 14,
    boxSizing: "border-box",
    outline: "none",
    fontWeight: 400,
  },

  singleWrapper: {
    borderRadius: 5,
    padding: 1.5,
    background: "linear-gradient(#0C1217,#0C1217) padding-box, linear-gradient(90deg, rgba(255,255,255,0.06), rgba(122,255,255,0.02)) border-box",
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
    background: "linear-gradient(#0C1217, #0C1217) padding-box, linear-gradient(90deg, #37ABFF, #0C1217) border-box",
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

  skip: {
    background: "none",
    border: "none",
    color: "#A6A6A6",
    fontSize: 13,
    cursor: "pointer",
  },
};
