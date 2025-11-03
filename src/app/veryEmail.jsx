import React, { useEffect, useState } from "react"; // 🟩 added useEffect and useState
import AuthCard from "../components/AuthCard";
import Logo from "../components/Logo";
import Button from "../components/Button";

const VerifyEmail = () => {
  // 🟩 added state for blur animation
  const [isVisible, setIsVisible] = useState(false);

  // 🟩 trigger blur when component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: isVisible ? "blur(12px)" : "blur(0px)", // 🟩 blur effect
        transition: "backdrop-filter 0.6s ease, background-color 0.6s ease", // 🟩 smooth animation
      }}
    >
      <AuthCard>
        <Logo />
        <h2
          style={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          Verify your email
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#A6A6A6",
            marginBottom: "24px",
          }}
        >
          Check example@gmail.com to verify your account and get started.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <Button
            label="Open Gmail"
            style={{ width: "auto", padding: "10px 16px" }}
          />
          <Button
            label="Resend Email"
            style={{ width: "auto", padding: "10px 16px" }}
          />
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "16px",
            fontSize: "14px",
            color: "#A6A6A6",
          }}
        >
          Not your email?{" "}
          <span
            style={{
              color: "#3FD1FF",
              cursor: "pointer",
            }}
          >
            Change email
          </span>
        </p>
      </AuthCard>
    </div>
  );
};

export default VerifyEmail;
