'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, Backdrop } from '@mui/material';
import ApplyNowButton from "@/components/buttons/ApplyNowButton";

const OnboardingScreen1Dialog = ({ open, onClose, onNext }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  const handleContinue = () => {
    if (fullName.trim() && username.trim()) {
      onNext();
    } else {
      alert("Please fill all fields");
    }
  };

  const handleClose = () => {
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
              onClick={() => {
                alert("Logout clicked");
              }}
            >
              Logout
            </button>

            {/* Card */}
            <div style={{
              width: 457,
              height: 397,
              maxWidth: "92vw",
              background: "#0C1217",
              borderRadius: 15,
              padding: "28px 32px",
              border: "1px solid rgba(255,255,255,0.04)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
              textAlign: "left",
              boxSizing: "border-box"
            }}>
              <h2 style={{
                margin: 0,
                color: "#E6F9FF",
                fontSize: 20,
                fontWeight: 500,
                marginBottom: 6,
              }}>
                Basic Information
              </h2>
              <p style={{
                margin: 0,
                color: "#A6A6A6",
                fontSize: 12,
                marginBottom: 18,
              }}>
                Personal Details
              </p>

              {/* Full Name */}
              <div style={{
                background: "linear-gradient(#0F1C25, #00F1C25) padding-box, linear-gradient(90deg, #0F1C25, #0F1C25) border-box",
                borderRadius: 8,
                marginBottom: 14,
                padding: "1.5px", 
                boxSizing: "border-box",
                border: "1px solid #2E3942",
              }}>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    background: "#0C1217",
                    border: "none",
                    borderRadius: 6,
                    color: "#ffffff",
                    fontSize: 14,
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Username */}
              <div style={{
                background: "linear-gradient(#0F1C25, #00F1C25) padding-box, linear-gradient(90deg, #0F1C25, #0F1C25) border-box",
                borderRadius: 8,
                marginBottom: 14,
                padding: "1.5px", 
                boxSizing: "border-box",
                border: "1px solid #2E3942",
              }}>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    background: "#0C1217",
                    border: "none",
                    borderRadius: 6,
                    color: "#ffffff",
                    fontSize: 14,
                    boxSizing: "border-box",
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
              <div
                onClick={handleClose}
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
        </DialogContent>
      </Dialog>

      {/* Placeholder styles */}
      <style jsx>{`
        input::placeholder {
          color: #ffffff;
          opacity: 1;
        }
        input::-webkit-input-placeholder {
          color: #ffffff;
          opacity: 1;
        }
        input:-moz-placeholder,
        input::-moz-placeholder {
          color: #ffffff;
          opacity: 1;
        }
        input:-ms-input-placeholder {
          color: #ffffff;
          opacity: 1;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #ffffff !important;
          box-shadow: 0 0 0px 1000px #0F1C25 inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </>
  );
};

export default OnboardingScreen1Dialog; 