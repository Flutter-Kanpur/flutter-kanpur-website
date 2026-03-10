"use client";

import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

export default function SkillChip({
  label,
  active = false,
  onToggle,
  sx = {},
  textSx = {},
  showClose = true,
}) {
  return (
    <Box
      onClick={() => onToggle?.(label)}
      sx={{
        height: 40,
        borderRadius: "100px",
        border: active ? "1px solid #4167F2" : "1px solid #D1D1D1",
        backgroundColor: active ? "#4167F2" : "#FFFFFF",

        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",

        gap: "6px",
        pl: "18px",
        pr: "12px",
        pt: "10px",
        pb: "10px",

        width: "fit-content",
        maxWidth: "100%",
        boxSizing: "border-box",
        cursor: "pointer",
        userSelect: "none",
        flexShrink: 0,

        ...sx,
      }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 500,
          color: active ? "#FFFFFF" : "#3D3D3D",
          whiteSpace: "nowrap",
          lineHeight: 1,
          ...textSx,
        }}
      >
        {label}
      </Typography>

      {showClose && (
        <Box
          onClick={(e) => {
            if (!active) return;
            e.stopPropagation();
            onToggle?.(label);
          }}
          sx={{
            width: 16,
            height: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            cursor: active ? "pointer" : "default",
            visibility: active ? "visible" : "hidden",
          }}
        >
          <Image
            src="/assets/m-onboardingImages/close-chip.svg"
            alt="close"
            width={16}
            height={16}
          />
        </Box>
      )}
    </Box>
  );
}
