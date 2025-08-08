'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, Backdrop } from '@mui/material';
import ApplyNowButton from "@/components/buttons/ApplyNowButton";

const OnboardingScreen2Dialog = ({ open, onClose, onNext }) => {
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
    onNext();
  };

  const handleSkip = () => {
    onClose();
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
    <>
      {/* Backdrop with blur effect */}
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}
        open={open}
        onClick={onClose}
      />
      
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderRadius: '0',
            zIndex: (theme) => theme.zIndex.drawer + 2,
            maxHeight: '100vh',
            overflow: 'hidden'
          }
        }}
        BackdropProps={{
          style: { backgroundColor: 'transparent' }
        }}
      >
        <DialogContent style={{ 
          padding: 0, 
          backgroundColor: 'transparent',
          overflow: 'auto',
          maxHeight: '100vh'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            position: 'relative',
            padding: '20px',
            fontFamily: "'Encode Sans', sans-serif"
          }}>
            {/* Top left email - positioned at page edge */}
            <div style={{
              position: "fixed",
              top: 18,
              left: 22,
              color: "#9AA3A7",
              zIndex: 1000
            }}>
              <div style={{ fontSize: 12, color: "#2E3942" }}>Logged in as :</div>
              <div style={{ fontSize: 12, color: "#A6A6A6", marginTop: 6 }}>angelicasingh.design@gmail.com</div>
            </div>

            {/* Top right logout - positioned at page edge */}
            <button
              style={{
                position: "fixed",
                top: 14,
                right: 22,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: 6,
                fontSize: 13,
                cursor: "pointer",
                zIndex: 1000
              }}
              onClick={() => alert("Logout clicked")}
            >
              Logout
            </button>

            {/* Card */}
            <div style={{
              width: 457,
              height: 397,
              background: "#0C1217",
              borderRadius: 15,
              padding: "28px 28px",
              border: "1px solid rgba(255,255,255,0.04)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
              boxSizing: "border-box",
              textAlign: "left"
            }}>
              <h2 style={{
                margin: 0,
                color: "#E6F9FF",
                fontSize: 20,
                fontWeight: 500,
                marginBottom: 6,
              }}>
                Professional Details
              </h2>
              <p style={{
                margin: 0,
                color: "#A6A6A6",
                fontSize: 12,
                marginBottom: 18,
              }}>
                Personal Details
              </p>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}>
                {/* ROLE */}
                <div style={{ position: "relative" }} ref={roleRef}>
                  <div style={selectWrapperStyle(roleOpen)}>
                    <button onClick={toggleRole} style={{
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
                    }} type="button" aria-expanded={roleOpen}>
                      <span style={{ color: selectedRoles.length ? "#ffffff" : "#A6A6A6", fontWeight: 400 }}>
                        {selectedRoles.length ? selectedRoles.join(", ") : "Role"}
                      </span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.9 }}>
                        <path d="M6 9l6 6 6-6" stroke="#A6A6A6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  {roleOpen && (
                    <div style={{
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
                    }}>
                      {rolesList.map((r) => (
                        <label key={r} style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "8px 6px",
                          borderRadius: 6,
                          cursor: "pointer",
                        }}>
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
                <div style={{
                  borderRadius: 5,
                  padding: 1.5,
                  background: "linear-gradient(#0C1217,#0C1217) padding-box, linear-gradient(90deg, rgba(255,255,255,0.06), rgba(122,255,255,0.02)) border-box",
                }}>
                  <input
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    placeholder="Years of Experience"
                    style={{
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
                    }}
                  />
                </div>

                {/* SKILLS */}
                <div style={{ position: "relative" }} ref={skillsRef}>
                  <div style={selectWrapperStyle(skillsOpen)}>
                    <button onClick={toggleSkills} style={{
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
                    }} type="button" aria-expanded={skillsOpen}>
                      <span style={{ color: selectedSkills.length ? "#ffffff" : "#A6A6A6", fontWeight: 400 }}>
                        {selectedSkills.length ? selectedSkills.join(", ") : "Skills"}
                      </span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.9 }}>
                        <path d="M6 9l6 6 6-6" stroke="#A6A6A6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  {skillsOpen && (
                    <div style={{
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
                    }}>
                      {skillsList.map((s) => (
                        <label key={s} style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "8px 6px",
                          borderRadius: 6,
                          cursor: "pointer",
                        }}>
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
              <div style={{ position: "relative", marginTop: 28 }}>
                <ApplyNowButton 
                  text="CONTINUE" 
                  width="400px" 
                  height="44px" 
                  fontSize="14px"
                  onClick={handleContinue}
                />
              </div>

              {/* Skip */}
              <div style={{ textAlign: "center", marginTop: 12 }}>
                <button onClick={handleSkip} style={{
                  background: "none",
                  border: "none",
                  color: "#A6A6A6",
                  fontSize: 13,
                  cursor: "pointer",
                }} type="button">
                  Skip for Now
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* styled-jsx for placeholders and checkbox gradient */}
      <style jsx>{`
        /* placeholder style */
        input::placeholder {
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
    </>
  );
};

export default OnboardingScreen2Dialog; 