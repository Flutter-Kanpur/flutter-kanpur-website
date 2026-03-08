"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import MPrimaryButton from "@/components/buttons/MPrimaryButton/MPrimaryButton";

export default function OnboardingScreen2() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);

  const options = useMemo(
    () => [
      "Web Developer",
      "Community Contributor",
      "Student",
      "Flutter Developer",
      "abcdsefg",
      "UI / UX Designer",
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((t) => t.toLowerCase().includes(q));
  }, [options, query]);

  const toggleChip = (label) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label],
    );
  };

  // search input style (same “pill” look)
  const searchSx = {
    "& .MuiOutlinedInput-root": {
      height: 40,
      width: "100%", // 🔥 make it fluid
      maxWidth: {
        xs: "100%", // full width on mobile
        sm: 325, // limit width on larger screens
      },
      borderRadius: 999,
      backgroundColor: "#FFFFFF",
      fontSize: "14px",
      paddingRight: "10px",
      boxSizing: "border-box",

      "& fieldset": { borderColor: "#D1D1D1" },
      "&:hover fieldset": { borderColor: "#D1D1D1" },
      "&.Mui-focused fieldset": { borderColor: "#4167F2" },
    },

    "& input::placeholder": {
      fontSize: "14px",
      opacity: 1,
      fontWeight: 400,
      color: "#6D6D6D",
    },
  };

  const Chip = ({ label }) => {
    const active = selected.includes(label);

    return (
      <Box
        onClick={() => toggleChip(label)}
        sx={{
          px: 2,
          height: 34,
          borderRadius: 999,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid",
          borderColor: active ? "#4167F2" : "#D1D1D1",
          backgroundColor: active ? "#EAF0FF" : "#FFFFFF",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <Typography
          sx={{
            fontSize: 12.5,
            fontWeight: 400,
            color: "#000000",
            lineHeight: "20px",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        px: 2,
        boxSizing: "border-box",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          height: "100%",
          minHeight: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          boxSizing: "border-box",
          pt: 6,
          pb: 4,
        }}
      >
        {/* Top progress (4 steps) */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 325,
            display: "flex",
            gap: 1,
            mb: 5,
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <Box
              key={i}
              sx={{
                flex: 1,
                height: 6,
                borderRadius: 999,
                backgroundColor: i <= 1 ? "#4167F2" : "#DCE5FD",
              }}
            />
          ))}
        </Box>

        {/* Title + subtitle */}
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 700,
            textAlign: "center",
            color: "#000000",
            mb: 0.6,
          }}
        >
          What best describes you?
        </Typography>

        <Typography
          sx={{
            fontSize: 13.5,
            fontWeight: 400,
            color: "#6D6D6D",
            textAlign: "center",
            mb: 2.6,
          }}
        >
          Choose one or more.
        </Typography>

        {/* Search */}
        <Box
          sx={{
            width: "100%",
          }}
        >
          <TextField
            placeholder="Search roles or skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            sx={searchSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "#A6A6A6", fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Chips */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 325,
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            alignSelf: "center", // ensures same horizontal alignment as progress bar
          }}
        >
          {filtered.map((label) => (
            <Chip key={label} label={label} />
          ))}
        </Box>

        {/* Add other */}
        <Box sx={{ width: "100%", maxWidth: 325, mt: 2 }}>
          <Typography
            onClick={() => {
              // your “add other” flow
              // router.push("/m-onboarding/screen2-add-other");
            }}
            sx={{
              fontSize: 14,
              fontWeight: 400,
              color: "#4167F2",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            Add other
          </Typography>
        </Box>

        {/* Bottom CTA + skip */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "max(24px, env(safe-area-inset-bottom))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 2,
            boxSizing: "border-box",
            gap: 1.6,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 325 }}>
            <MPrimaryButton
              onClick={() => {
                // next step route
                router.push("/m-onboarding/screen3");
              }}
            >
              Continue
            </MPrimaryButton>
          </Box>

          <Typography
            onClick={() => {
              // skip route
              // router.push("/m-onboarding/screen3");
            }}
            sx={{
              fontSize: 14,
              fontWeight: 400,
              color: "#4167F2",
              cursor: "pointer",
            }}
          >
            Skip for now
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
