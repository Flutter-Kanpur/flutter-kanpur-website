'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, Backdrop } from '@mui/material';
import ApplyNowButton from "@/components/buttons/ApplyNowButton";

const OnboardingScreen3Dialog = ({ open, onClose, onNext }) => {
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
    onNext();
  };

  const handleBack = () => {
    onClose();
  };

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
              <div style={{ fontSize: 12, color: "#A6A6A6", marginTop: 6 }}>
                angelicasingh.design@gmail.com
              </div>
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
              width: 420,
              maxWidth: "92vw",
              background: "#0C1217",
              borderRadius: 15,
              padding: "28px",
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
                Social Links
              </h2>
              <p style={{
                margin: 0,
                color: "#A6A6A6",
                fontSize: 12,
                marginBottom: 18,
              }}>
                Attach links of your social media
              </p>

              {/* GitHub */}
              <div style={{
                borderRadius: 8,
                padding: "1.5px",
                marginBottom: 12,
                background: "linear-gradient(#0C1217,#0C1217) padding-box, linear-gradient(90deg, #FFFFFF, #7AFFFF) border-box",
                boxSizing: "border-box",
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}>
                <span style={{
                  position: "absolute",
                  left: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                }} aria-hidden>
                  <img src="/assets/github.svg" width={18} height={18} alt="GitHub Icon" />
                </span>
                <input
                  type="text"
                  placeholder="GitHub Profile"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    paddingLeft: 44,
                    background: "#0C1217",
                    border: "1px solid #2E3942",
                    borderRadius: 6,
                    color: "#FFFFFF",
                    fontSize: 14,
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </div>

              {/* Portfolio */}
              <div style={{
                borderRadius: 8,
                padding: "1.5px",
                marginBottom: 12,
                background: "linear-gradient(#0C1217,#0C1217) padding-box, linear-gradient(90deg, #FFFFFF, #7AFFFF) border-box",
                boxSizing: "border-box",
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}>
                <span style={{
                  position: "absolute",
                  left: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                }} aria-hidden>
                  <img src="/assets/globe.svg" width={18} height={18} alt="Globe Icon" />
                </span>
                <input
                  type="text"
                  placeholder="Portfolio/Website (if any)"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    paddingLeft: 44,
                    background: "#0C1217",
                    border: "1px solid #2E3942",
                    borderRadius: 6,
                    color: "#FFFFFF",
                    fontSize: 14,
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </div>

              {/* LinkedIn */}
              <div style={{
                borderRadius: 8,
                padding: "1.5px",
                marginBottom: 12,
                background: "linear-gradient(#0C1217,#0C1217) padding-box, linear-gradient(90deg, #FFFFFF, #7AFFFF) border-box",
                boxSizing: "border-box",
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}>
                <span style={{
                  position: "absolute",
                  left: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                }} aria-hidden>
                  <img src="/assets/linkedin.svg" width={18} height={18} alt="LinkedIn Icon" />
                </span>
                <input
                  type="text"
                  placeholder="LinkedIn Profile"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    paddingLeft: 44,
                    background: "#0C1217",
                    border: "1px solid #2E3942",
                    borderRadius: 6,
                    color: "#FFFFFF",
                    fontSize: 14,
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </div>

              {/* Continue button */}
              <div style={{ position: "relative", marginTop: 28 }}>
                <ApplyNowButton 
                  text="CONTINUE" 
                  width="400px" 
                  height="44px" 
                  fontSize="14px"
                  onClick={handleContinue}
                />
              </div>

              {/* Go back */}
              <div style={{ textAlign: "center", marginTop: 12 }}>
                <button onClick={handleBack} style={{
                  background: "none",
                  border: "none",
                  color: "#A6A6A6",
                  fontSize: 13,
                  cursor: "pointer",
                }}>
                  Go back
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* placeholder styling & autofill fixes */}
      <style jsx>{`
        input::placeholder {
          color: #a6a6a6;
          opacity: 1;
          font-weight: 400;
        }
        input::-webkit-input-placeholder {
          color: #a6a6a6;
        }
        input:-moz-placeholder,
        input::-moz-placeholder {
          color: #a6a6a6;
        }
        input:-ms-input-placeholder {
          color: #a6a6a6;
        }

        input:-webkit-autofill {
          -webkit-text-fill-color: #ffffff !important;
          box-shadow: 0 0 0px 1000px #0f1c25 inset !important;
        }
      `}</style>
    </>
  );
};

export default OnboardingScreen3Dialog; 