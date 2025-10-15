"use client";

import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const auth = getAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      signOut(auth)
        .then(() => {
          // Successfully logged out
          router.push("/"); // redirect to login page
        })
        .catch((error) => {
          console.error("Logout failed:", error);
          alert("Logout failed. Please try again.");
        });
    }
  };

  return (
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
  );
}