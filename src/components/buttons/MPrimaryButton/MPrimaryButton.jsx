"use client";

import React from "react";
import { Button } from "@mui/material";
import styles from "./MPrimaryButton.module.css";

export default function MPrimaryButton({
  children,
  onClick,
  fullWidth = true,
  endIcon,
  disabled = false,
  sx,
  style,
  className = "",
  ...rest //allow page-level overrides
}) {
  return (
    <Button
      fullWidth={fullWidth}
      onClick={onClick}
      endIcon={endIcon}
      disabled={disabled}
      className={`${styles.primaryButton} ${className}`}
      sx={{
        width: "325px",
        minWidth: "325px",
        maxWidth: "325px",
        ...sx,
      }}
      style={style}
      {...rest}
    >
      {children}
    </Button>
  );
}
