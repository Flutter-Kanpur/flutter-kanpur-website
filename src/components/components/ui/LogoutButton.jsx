"use client";

import React, { useState } from "react"; 
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const auth = getAuth();

  //added message state
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      signOut(auth)
        .then(() => {
          setMessage({
            text: "Logged out successfully!",
            type: "success",
          });

          
          setTimeout(() => {
            router.push("/");
          }, 1000);
        })
        .catch((error) => {
          console.error("Logout failed:", error);
          
          setMessage({
            text: "Logout failed. Please try again.",
            type: "error",
          });
        });
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button
        onClick={handleLogout}
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

      {/* new message display */}
      {message.text && (
        <p
          style={{
            marginTop: "10px",
            color: message.type === "error" ? "red" : "#00FF99",
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
