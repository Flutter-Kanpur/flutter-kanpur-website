"use client";

import {
  Box,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/navigation";
import GradientHeader from "@/components/header/GradientHeader";

export default function LoginSecurityPage() {
  const router = useRouter();
  const Section = ({ title, children }) => (
    <Box sx={{ mb: 4 }}>
      <Typography
        sx={{
          fontSize: "16px",
          color: "#6b6b6b",
          mb: 1.5,
          ml: 0.5,
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: "16px",
          border: "1px solid #e0e0e0",
          overflow: "hidden",
          pointerEvents: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
  const Item = ({ text, route, isLast }) => (
    <>
      <ListItemButton
        onClick={() => route && router.push(route)}
        sx={{
          py: 2,
          px: 2.5,
          "&:hover": { backgroundColor: "#f9f9f9" },
        }}
      >
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontSize: "17px",
            fontWeight: 400,
            color: "#1a1a1a",
          }}
        />
        <ChevronRightIcon sx={{ color: "#333", fontSize: "20px" }} />
      </ListItemButton>
      {!isLast && <Divider sx={{ mx: 2 }} />}
    </>
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "425px",
        mx: "auto",
        minHeight: "100vh",
        backgroundColor: "#fff",
        pb: 12,
        position: "relative",
        zIndex: 1,
      }}
    >
      <GradientHeader
        title="Login & Security"
        onBack={() => router.back()}
        sx={{ mb: '-60px' }}
      />
      <Section title="Login & Recovery">
        <List disablePadding>
          <Item text="Change email" route="security/email" />
          <Item text="Change password" route="security/change-password" />
          <Item text="Linked Accounts" route="/security/linked-accounts" isLast={true} />
        </List>
      </Section>
      <Section title="Security checks">
        <List disablePadding>
          <Item text="Login activity" route="/security/login-activity" />
          <Item text="Account Actions" route="/security/account-actions" isLast={true} />
        </List>
      </Section>
    </Box>
  );
}