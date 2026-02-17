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
}) {
  return (
    <Button
      fullWidth={fullWidth}
      onClick={onClick}
      endIcon={endIcon}
      disabled={disabled}
      className={styles.primaryButton}
    >
      {children}
    </Button>
  );
}
