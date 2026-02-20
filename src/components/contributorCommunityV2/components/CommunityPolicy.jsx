'use client';

import React from 'react';
import { Box, Typography, Grid, useTheme, useMediaQuery, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BottomNav from '@/components/contributorCommunityV2/BottomNav';

export default function CommunityPolicy() {
  const theme = useTheme();
  const isStrictMobile = useMediaQuery('(max-width:426px)');
  const router = useRouter();

  const pageWrapper = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100vh',
    overflowX: 'hidden'
  };

  const contentWrapper = {
    px: { xs: 3, md: 5, lg: 18 },
    pt: { xs: 2, md: 4 },
    pb: { xs: 12, md: 4 },
    maxWidth: '1200px',
    alignSelf: 'center',
    width: '100%'
  };

  const cardStyle = {
    bgcolor: '#EFF3FF',
    borderRadius: '20px',
    p: { xs: 3, md: 4 },
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease',
    '&:hover': {
      // ✅ Yahan isMobile ki jagah isStrictMobile likho
      transform: !isStrictMobile ? 'translateY(-4px)' : 'none'
    }
  };

  const titleStyle = {
    fontWeight: 600,
    fontSize: { xs: '16px', md: '18px' },
    mb: 1.5,
    color: '#000',
    fontFamily: 'var(--font-product-sans)',
  };

  const textStyle = {
    fontWeight: 500,
    fontSize: { xs: '14px', md: '15px' },
    lineHeight: 1.6,
    color: '#333',
    fontFamily: 'var(--font-product-sans)',
  };

  const sections = [
    { title: "Respect & Conduct", text: "We expect all members to interact with each other respectfully and professionally. Differences in opinions, experience levels, and perspectives are natural and welcome, but disrespectful behavior, harassment, or offensive language is not acceptable. Every member deserves to be treated with dignity." },
    { title: "Inclusivity", text: "Flutter Kanpur is an inclusive community. We encourage patience, empathy, and support—especially toward beginners and new members. Avoid language or behavior that may discourage participation or make others feel unwelcome. Inclusivity helps the community grow stronger." },
    { title: "Meaningful Participation", text: "Conversations, feedback, and contributions should be constructive and relevant. Healthy discussions are encouraged, but personal attacks, unnecessary negativity, or disruptive behavior reduce the value of the community. When offering feedback, focus on being helpful and respectful." },
    { title: "Responsible Sharing", text: "Members are encouraged to share resources, projects, and opportunities that add value to the community. Excessive self-promotion, spam, or irrelevant advertising is discouraged. Sharing should always prioritize community benefit over personal promotion." },
    { title: "Privacy & Trust", text: "Respecting privacy is essential. Do not share personal information, private conversations, or sensitive details without consent. Trust allows members and contributors to collaborate openly and confidently." }
  ];

  const desktopCardStyle = {
    bgcolor: '#FFFFFF',
    borderRadius: '24px',
    p: 4,
    height: '100%',
    border: '1px solid #F0F0F0',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: `
    inset 0 0 15px 2px rgba(227, 242, 253, 0.8), 
    0px 10px 40px rgba(0, 0, 0, 0.06), 
    0px 2px 10px rgba(0, 0, 0, 0.02)
  `,

    transition: 'all 0.3s ease',

    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: `
      inset 0 0 15px 2px rgba(227, 242, 253, 0.8),
      0px 20px 50px rgba(0, 0, 0, 0.1)
    `,
    }
  };

  const backButtonStyle = {
    display: { xs: 'none', sm: 'flex' },
    alignItems: 'center',
    color: '#000',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '14px',
    fontFamily: 'var(--font-product-sans)',
    background: 'linear-gradient(180deg, #E0E0E0 0%, #FFFFFF 30%, #FFFFFF 100%)',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    px: 1.5,
    py: 0.5,
    mb: 3,
    mt: 4,
    minWidth: 'auto',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '&:hover': {
      background: 'linear-gradient(180deg, #D5D5D5 0%, #F5F5F5 30%, #F5F5F5 100%)',
      borderColor: '#d0d0d0',
    },
    '& .MuiButton-startIcon': {
      marginRight: '4px'
    }
  };

  return (
    <Box sx={pageWrapper}>
      <Box sx={contentWrapper}>
        <Button
          onClick={() => router.back()}
          startIcon={<ArrowBackIosNewIcon sx={{ fontSize: '12px !important' }} />}
          sx={{
            ...backButtonStyle,
            // Toggle visibility based on the new variable
            display: isStrictMobile ? 'none' : 'flex'
          }}
        >
          Back
        </Button>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            // Toggle visibility based on the new variable
            display: isStrictMobile ? 'none' : 'block',
            fontFamily: 'var(--font-product-sans)',
            mb: 2
          }}
        >
          Community Guidelines
        </Typography>

        <Typography
          sx={{
            ...textStyle,
            // Adjust margins/font size for strict mobile
            mt: isStrictMobile ? -2 : 5,
            mb: 5,
            color: '#1a1a1a',
            fontSize: isStrictMobile ? '14px' : '16px',
          }}
        >
          Flutter Kanpur is a collaborative space for developers, designers, learners, and contributors to connect, learn, and grow together. Our goal is to create an environment where everyone feels safe, respected, and encouraged to participate.
          These guidelines exist to maintain a healthy and welcoming community experience for all members.
        </Typography>

        {/* --- 1. MOBILE ONLY GRID (Visible ≤ 425px) --- */}
        <Grid
          container
          spacing={2.5}
          sx={{ display: isStrictMobile ? 'flex' : 'none' }}
        >
          {sections.map((section, index) => (
            <Grid item xs={12} key={`mobile-${index}`}>
              <Box sx={cardStyle}>
                <Typography sx={titleStyle}>{section.title}</Typography>
                <Typography sx={textStyle}>{section.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* --- 2. DESKTOP & TABLET GRID (Visible > 425px) --- */}
        <Grid
          container
          spacing={4}
          sx={{
            display: isStrictMobile ? 'none' : 'flex',
            alignItems: 'stretch',
            width: '100%'
          }}
        >
          {sections.map((section, index) => (
            <Grid
              key={`desktop-${index}`}
              size={{ xs: 6 }} // This ensures 2 columns immediately after 425px
            >
              <Box sx={desktopCardStyle}>
                <Typography sx={{ fontWeight: 700, fontSize: '18px', mb: 1.5, fontFamily: 'var(--font-product-sans)' }}>
                  {section.title}
                </Typography>
                <Typography sx={{ fontSize: '14px', lineHeight: 1.7, color: '#555', fontFamily: 'var(--font-product-sans)' }}>
                  {section.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Typography sx={{ mt: 6, fontSize: '14px', fontWeight: 500, fontFamily: 'var(--font-product-sans)' }}>
          Last updated: April 2026
        </Typography>
      </Box>

      {/* ✅ Conditional Navigation only on 425px or less */}
      {isStrictMobile && <BottomNav />}
    </Box>
  );
}