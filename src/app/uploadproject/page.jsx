"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Stack,
  Paper,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";

import BottomNav from "@/components/BottomNav/BottomNav";

export default function UploadProject() {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 393,
        mx: "auto",
        minHeight: "100vh",
        pb: "110px",
        background:
          "linear-gradient(180deg, #cfe0f7 0%, #eaf2ff 6%, #ffffff 12%)",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ p: 2, position: "relative" }}
      >
        <Link href="/explore" style={{ position: "absolute", left: 16 }}>
          <ArrowBackIcon />
        </Link>

        <Typography fontWeight={600}>Upload Project</Typography>
      </Stack>

      <Box px={2}>
        {/* Project Name */}
        <TextField
          fullWidth
          label="Project name"
          placeholder="Enter title"
          sx={inputStyle}
        />

        {/* Description */}
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Short description"
          placeholder="Max 120 characters"
          sx={inputStyle}
        />

        {/* Tech Stack */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tech stack</InputLabel>
          <Select sx={inputStyle}>
            <MenuItem value="">-select-</MenuItem>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="Flutter">Flutter</MenuItem>
            <MenuItem value="Next.js">Next.js</MenuItem>
          </Select>
        </FormControl>

        {/* Selected Tag */}
        <Chip
          label="React"
          onDelete={() => {}}
          sx={{
            mb: 2,
            borderRadius: 6,
          }}
        />

        {/* Links */}
        <Typography fontSize={14} mb={1}>
          Project links
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <TextField
            fullWidth
            placeholder="GitHub link"
            sx={inputStyle}
          />
          <IconButton sx={{ color: "#ef4444" }}>
            <DeleteIcon />
          </IconButton>
        </Stack>

        <TextField
          fullWidth
          placeholder="Live demo / Website"
          sx={inputStyle}
        />

        {/* Upload */}
        <Typography fontSize={14} mt={2} mb={1}>
          Upload screenshot (optional)
        </Typography>

        <Paper
          sx={{
            border: "1px dashed #d1d5db",
            borderRadius: 4,
            p: 3,
            textAlign: "center",
            background: "#fff",
            boxShadow: "none",
          }}
        >
          <UploadIcon sx={{ color: "#6b7280" }} />
          <Typography fontSize={13} color="#6b7280" mt={1}>
            Choose a file or drag & drop it here.
          </Typography>

          <Button
            variant="outlined"
            sx={{
              mt: 1.5,
              borderRadius: 6,
              textTransform: "none",
            }}
          >
            Browse files
          </Button>
        </Paper>

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={() => router.push("/projectsubmitted")}
          sx={{
            mt: 3,
            borderRadius: 6,
            textTransform: "none",
            background: "#000",
            py: 1.2,
            "&:hover": { background: "#111" },
          }}
        >
          Submit project
        </Button>
      </Box>

      {/* Bottom Navigation */}
      <BottomNav activeTab="explore" />
    </Box>
  );
}

/* Same input styling as project cards theme */
const inputStyle = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: 4,
    background: "#fff",
  },
};