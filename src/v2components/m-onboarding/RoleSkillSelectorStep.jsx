"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import MPrimaryButton from "@/components/buttons/MPrimaryButton/MPrimaryButton";
import SkillChip from "@/v2components/m-onboarding/SkillChip";
import { useOnboarding } from "@/contexts/OnboardingContext";

export default function RoleSkillSelectorStep({
  step = 2,
  nextRoute = "/m-onboarding/m-Onboarding/screen3",
  title = "What best describes you?",
  subtitle = "Choose one or more.",
}) {
  const router = useRouter();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(onboardingData.roles || []);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const options = useMemo(
    () => [
      "Web Developer",
      "Community Contributor",
      "Student",
      "Flutter Developer",
      "Figma",
      "UI / UX Designer",
    ],
    [],
  );

  // const chipRows = useMemo(
  //   () => [
  //     ["Web Developer", "Community Contributor"],
  //     ["Student", "Flutter Developer", "Figma"],
  //     ["UI / UX Designer"],
  //   ],
  //   [],
  // );

  const [customOptions, setCustomOptions] = useState([]);

  const customOptionsList = customOptions.filter(
    (item) => !options.includes(item),
  );

  const allVisibleOptions = [...options, ...customOptionsList];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allVisibleOptions;

    return allVisibleOptions.filter((t) => t.toLowerCase().includes(q));
  }, [allVisibleOptions, query]);

  const toggleChip = (label) => {
    setSelected((prev) => {
      const updated = prev.includes(label)
        ? prev.filter((x) => x !== label)
        : [...prev, label];

      updateOnboardingData({ roles: updated });
      return updated;
    });
  };

  const addOther = () => {
    const trimmed = otherValue.trim();
    if (!trimmed) return;

    const alreadyExistsInDefault = options.some(
      (item) => item.toLowerCase() === trimmed.toLowerCase(),
    );

    const alreadyExistsInCustom = customOptions.some(
      (item) => item.toLowerCase() === trimmed.toLowerCase(),
    );

    if (!alreadyExistsInDefault && !alreadyExistsInCustom) {
      setCustomOptions((prev) => [...prev, trimmed]);
    }

    setOtherValue("");
    setShowOtherInput(false);
  };

  const cancelOther = () => {
    setOtherValue("");
    setShowOtherInput(false);
  };

  const HORIZONTAL_PADDING = 16 + 16;
  const getChipStyles = (label) => {
    const hugWidths = {
      "Web Developer": 165,
      "Community Contributor": 210,
      Student: 118,
      "Flutter Developer": 170,
      Figma: 108,
      "UI / UX Designer": 170,
    };
    const base = hugWidths[label] || 100;
    const style = {
      width: `${base}px`,
      flex: "0 0 auto",
    };

    if (label === "UI / UX Designer") {
      style.ml = 0.5;
    }
    return style;
  };

  const searchSx = {
    "& .MuiOutlinedInput-root": {
      height: 40,
      width: "100%",
      maxWidth: {
        xs: "100%",
        sm: 325,
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
          overflowX: "hidden",
          overflowY: "auto",
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
                backgroundColor: i < step ? "#4167F2" : "#DCE5FD",
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
          {/*title via props */}
          {title}
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
          {/*subtitle via props */}
          {subtitle}
        </Typography>

        {/* Search */}
        <Box sx={{ width: "100%" }}>
          <TextField
            placeholder="Search roles or skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            sx={searchSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ marginRight: 1 }}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 6.99985C10.5 7.69208 10.2947 8.36877 9.91016 8.94434C9.52558 9.51992 8.97895 9.96852 8.33941 10.2334C7.69987 10.4983 6.99614 10.5676 6.3172 10.4326C5.63827 10.2975 5.01463 9.96421 4.52515 9.47472C4.03566 8.98524 3.70232 8.3616 3.56727 7.68266C3.43222 7.00373 3.50153 6.3 3.76644 5.66046C4.03135 5.02091 4.47995 4.47429 5.05552 4.0897C5.6311 3.70512 6.30779 3.49985 7.00002 3.49985C7.92828 3.49985 8.81852 3.8686 9.47489 4.52497C10.1313 5.18135 10.5 6.07159 10.5 6.99985ZM14.3538 14.3536C14.3073 14.4001 14.2522 14.437 14.1915 14.4621C14.1308 14.4873 14.0657 14.5002 14 14.5002C13.9343 14.5002 13.8692 14.4873 13.8085 14.4621C13.7478 14.437 13.6927 14.4001 13.6463 14.3536L10.5175 11.2242C9.42946 12.1294 8.03433 12.5803 6.62231 12.4831C5.21029 12.3859 3.89009 11.7481 2.93632 10.7024C1.98256 9.65664 1.46864 8.28347 1.50148 6.86849C1.53432 5.45351 2.11138 4.10566 3.11263 3.10529C4.11389 2.10492 5.46225 1.52905 6.87725 1.49747C8.29226 1.46588 9.66498 1.981 10.7099 2.9357C11.7548 3.89039 12.3914 5.21115 12.4873 6.62325C12.5833 8.03535 12.1312 9.43009 11.225 10.5173L14.3538 13.6461C14.4003 13.6925 14.4371 13.7477 14.4623 13.8084C14.4875 13.8691 14.5004 13.9341 14.5004 13.9998C14.5004 14.0656 14.4875 14.1306 14.4623 14.1913C14.4371 14.252 14.4003 14.3072 14.3538 14.3536ZM7.00002 11.4998C7.89004 11.4998 8.76006 11.2359 9.50008 10.7415C10.2401 10.247 10.8169 9.54419 11.1575 8.72192C11.4981 7.89966 11.5872 6.99486 11.4136 6.12194C11.2399 5.24903 10.8113 4.4472 10.182 3.81787C9.55266 3.18853 8.75084 2.75995 7.87793 2.58631C7.00501 2.41268 6.10021 2.5018 5.27794 2.84239C4.45568 3.18299 3.75287 3.75976 3.25841 4.49978C2.76394 5.2398 2.50002 6.10983 2.50002 6.99985C2.50134 8.19292 2.97587 9.33674 3.8195 10.1804C4.66313 11.024 5.80695 11.4985 7.00002 11.4998Z"
                      fill="#BCBCBC"
                    />
                  </svg>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Chips container with border */}
        <Box
          sx={{
            width: 325,
            mt: 2,
            px: 2,
            py: 1,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            alignSelf: "center",
            boxSizing: "border-box",
          }}
        >
          {query.trim() && (
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 500,
                color: "#B2B2B2",
                mb: 0.5,
                px: 1,
              }}
            >
              {filtered.length === 0
                ? "No matching roles found."
                : `${filtered.length} results found`}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 4px",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            {(query.trim() ? filtered : allVisibleOptions).map((label) => (
              <SkillChip
                key={label}
                label={label}
                active={selected.includes(label)}
                onToggle={toggleChip}
                sx={
                  options.includes(label)
                    ? getChipStyles(label)
                    : {
                        width: "auto",
                        flex: "0 0 auto",
                      }
                }
              />
            ))}

            {showOtherInput && (
              <Box
                sx={{
                  height: 36,
                  borderRadius: "100px",
                  border: "1.5px solid #4167F2",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  minWidth: 92,
                  maxWidth: 150,
                  pl: "14px",
                  pr: "30px",
                  boxSizing: "border-box",
                  flex: "0 0 auto",
                }}
              >
                <input
                  type="text"
                  value={otherValue}
                  onChange={(e) => setOtherValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addOther();
                    }
                  }}
                  onBlur={() => {
                    if (otherValue.trim()) addOther();
                  }}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "12px",
                    fontWeight: 300,
                    color: "#2B2B2B",
                    width: "100%",
                    minWidth: 0,
                  }}
                  autoFocus
                />

                <IconButton
                  onClick={cancelOther}
                  size="small"
                  sx={{
                    position: "absolute",
                    right: 6,
                    top: "50%",
                    transform: "translateY(-50%)",
                    padding: 0,
                    width: 18,
                    height: 18,
                  }}
                >
                  <CloseIcon sx={{ fontSize: 14, color: "#2B2B2B" }} />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>

        {/* Add other */}
        <Box sx={{ width: "100%", maxWidth: 325, mt: "9px", px: 1 }}>
          <Typography
            onClick={() => {
              setShowOtherInput(true);
              if (query.trim()) {
                setOtherValue(query.trim());
              }
            }}
            sx={{
              fontSize: 13,
              fontWeight: 500,
              color: "#4167F2",
              fontStyle: "Bold",
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
          <Box
            sx={{
              width: 280,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MPrimaryButton
              sx={{
                width: "100%",
                borderRadius: "100px",
                overflow: "hidden",
                justifyContent: "center",
              }}
              onClick={() => {
                if (isLoading) return;

                updateOnboardingData({ roles: selected });

                setIsLoading(true);

                setTimeout(() => {
                  router.push(nextRoute);
                }, 400);
              }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Continue"}
            </MPrimaryButton>
          </Box>

          <Typography
            onClick={() => {
              router.push("/m-onboarding/m-Onboarding/screen3");
            }}
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "#4167F2",
              cursor: "pointer",
              marginBottom: 6,
            }}
          >
            Skip for now
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
