import React from "react";
import AuthCard from "../components/AuthCard";
import Logo from "../components/Logo";
import Button from "../components/Button";

const VerifyEmail = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <AuthCard>
        <Logo />
        <h2 className="text-center text-lg font-semibold mb-2">Verify your email</h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          Check example@gmail.com to verify your account and get started.
        </p>
        <div className="flex justify-center gap-3">
          <Button label="Open Gmail" className="w-auto px-4" />
          <Button label="Resend Email" className="w-auto px-4" />
        </div>
        <p className="text-center mt-4 text-sm text-gray-400">
          Not your email? <span className="text-blue-400 cursor-pointer">Change email</span>
        </p>
      </AuthCard>
    </div>
  );
};

export default VerifyEmail;