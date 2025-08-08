'use client';

import React from 'react';
import { Dialog, DialogContent, Backdrop } from '@mui/material';
import ApplyNowButton from "@/components/buttons/ApplyNowButton";

const OnboardingScreen4Dialog = ({ open, onClose, onComplete }) => {
  const name = "Angelica";
  const email = "angelicasingh.design@gmail.com";

  const handleComplete = () => {
    onComplete();
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
              <div style={{ fontSize: 12, color: "#A6A6A6", marginTop: 6 }}>{email}</div>
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
              backgroundColor: "#0C1217",
              padding: "40px 36px",
              borderRadius: 15,
              textAlign: "left",
              maxWidth: 560,
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid rgba(255,255,255,0.04)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}>
              <h2 style={{
                color: "#1EAEFF",
                margin: 0,
                fontSize: 24,
                fontWeight: 600,
                marginBottom: 8,
              }}>
                Congratulations!
              </h2>
              <p style={{
                margin: 0,
                color: "#C9D6DB",
                fontSize: 14,
                marginBottom: 10,
                opacity: 0.9,
              }}>
                You're all set, {name}!
              </p>

              {/* button row  */}
              <div style={{ 
                position: "relative", 
                marginTop: 18, 
                display: "flex", 
                justifyContent: "center",
                width: "100%"
              }}>
                <ApplyNowButton 
                  text="GO TO DASHBOARD" 
                  width="420px" 
                  height="44px" 
                  fontSize="13px"
                  onClick={handleComplete}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OnboardingScreen4Dialog; 