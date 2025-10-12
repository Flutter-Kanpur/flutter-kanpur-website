"use client";
import React from "react";
import Button from "@mui/material/Button";
import "../css/button.css"

export function AppButton({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) {
  return (
    <Button
      className={`app-button ${variant} ${size} ${className}`}
      disableRipple
      {...props}
    >
      {children}
    </Button>
  );
}
