"use client";

import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const auth = getAuth();

  const [message, setMessage] = useState({ text: "", type: "" });
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirm(true);
    setMessage({ text: "", type: "" });
  };

  const handleConfirmLogout = () => {
    signOut(auth)
      .then(() => {
        setMessage({
          text: "✅ Logged out successfully!",
          type: "success",
        });
        setShowConfirm(false);

        setTimeout(() => {
          router.push("/");
        }, 1000);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        setMessage({
          text: "❌ Logout failed. Please try again.",
          type: "error",
        });
        setShowConfirm(false);
      });
  };

  const handleCancelLogout = () => {
    setShowConfirm(false);
  };

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <button
        onClick={handleLogoutClick}
        style={{
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#fff",
          padding: "6px 12px",
          borderRadius: 6,
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      {/* 🟩 Confirmation box (fixed, top-right) */}
      {showConfirm && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            right: "20px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 8,
            padding: "12px 18px",
            zIndex: 9999,
            backdropFilter: "blur(10px)",
            textAlign: "center",
          }}
        >
          {/* 🟩 changed color to grey */}
          <p style={{ color: "#A6A6A6", marginBottom: "8px", fontSize: 13 }}>
            Are you sure you want to logout?
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            {/* 🟩 Cancel button (grey, no border) */}
            <button
              onClick={handleCancelLogout}
              style={{
                background: "transparent",
                color: "#A6A6A6",
                border: "none",
                borderRadius: 4,
                padding: "4px 10px",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              Cancel
            </button>

            {/* 🟩 Logout button (red, no border) */}
            <button
              onClick={handleConfirmLogout}
              style={{
                background: "transparent",
                color: "#FF5555",
                border: "none",
                borderRadius: 4,
                padding: "4px 10px",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {message.text && !showConfirm && (
        <p
          style={{
            marginTop: "10px",
            color:
              message.type === "error"
                ? "red"
                : message.type === "success"
                ? "#00FF99"
                : "#3FD1FF",
            fontSize: "13px",
            fontFamily: "Encode Sans, sans-serif",
          }}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
