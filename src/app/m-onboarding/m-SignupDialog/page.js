"use client";

import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { Divider } from "@mui/material";
import Image from "next/image";


import { auth } from "@/lib/firebase/server/setup";
import GoogleButton from "@/components/buttons/continueWithGoogleButton/googleButton";
import { checkUserExistsInFirestore } from "@/lib/firebase/server/server-actions";
import {
  signInWithGoogle,
} from "@/lib/firebase/server/auth";


export default function SignupPage() {
  const router = useRouter();

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  return (
    <Box
      sx={{
        width: "100dvw",
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: 420, md: 480 },
          width: "100%",
          minHeight: { xs: "100%", sm: "auto" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 4, sm: 0 },
          paddingBottom: "max(16px, env(safe-area-inset-bottom))",
        }}
      >
        {/* Mascot */}
        <Box
          component="img"
          src="/assets/m-AuthImages/bird.png"
          alt="Loading Mascot"
          sx={{
            width: 200, // 👈 make it bigger here
            height: "auto", // ✅ keeps original aspect ratio
            objectFit: "contain",
            userSelect: "none",
            mb: 1.5,
          }}
        />

        <Typography
          sx={{
            fontSize: { xs: 20, sm: 22, md: 24 },
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Let&apos;s you in
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 13, sm: 13.5, md: 14.5 },
            color: "#6D6D6D",
            textAlign: "center",
            fontStyle: "medium",
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: { xs: 280, md: 360 },
            mb: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          Be part of a community that learns <br />
          and builds together.
        </Typography>

        <Box sx={{ width: "100%", mt: 0.5 }}>
          {/* GOOGLE LOGIN */}
          <GoogleButton
            onClick={async () => {
              try {
                await signInWithGoogle();
                const user = auth.currentUser;

                if (user) {
                  const exists = await checkUserExistsInFirestore(user.email);
                  router.push(exists ? "/" : "/onboarding/screen1");
                }
              } catch (err) {
                console.error(err);
              }
            }}
          />

          {/* EMAIL LOGIN */}
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #E6E6E6",
              borderRadius: 3,
              mt: { xs: 1.5, sm: 2 },
              overflow: "hidden",
            }}
          >
            <Button
              fullWidth
              onClick={() => {
                router.push("/m-onboarding/m-login");
              }}
              sx={{
                py: { xs: 1.3, sm: 1.5 },
                textTransform: "none",
                fontWeight: 500,
                fontSize: { xs: 16, sm: 15 },
              }}
              style={{ color: "#000000" }}
            >
              <Image
                src="/assets/m-AuthImages/email.png" // ✅ from public folder
                alt="email icon"
                width={16}
                height={16}
                style={{ marginRight: 8 }}
              />
              Sign in with Email
            </Button>
          </Paper>

          {/* OR */}
          <Divider
            sx={{
              my: 2,
              "&::before, &::after": {
                borderColor: "#E6E6E6",
              },
              fontSize: 14,
              color: "#000000",
              fontWeight: 400,
            }}
          >
            OR
          </Divider>

          {/* CREATE ACCOUNT */}
          <Button
            fullWidth
            sx={{
              height: 46, // ✅ Fixed height from Figma
              borderRadius: "100px", // ✅ Exact radius
              backgroundColor: "#0A0A0A", // ✅ Exact color
              color: "#F4F4F4",
              fontSize: 16,
              fontWeight: 400,

              px: "28px", // ✅ Left + Right padding
              py: "10px", // ✅ Top + Bottom padding
              gap: "6px", // ✅ Gap between icon/text (if any)

              textTransform: "none",

              // ✅ Inner shadow from Figma
              boxShadow: "inset 4px 6px 6px rgba(226,226,226,0.2)",

              "&:hover": {
                backgroundColor: "#000",
                boxShadow: "inset 4px 6px 6px rgba(226,226,226,0.2)",
              },
            }}
            onClick={() => router.push("/m-onboarding/m-email-signup")}
          >
            Create Account
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
