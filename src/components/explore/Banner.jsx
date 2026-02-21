'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Box, Typography, Button, Stack } from '@mui/material';

const BANNER_INTERVAL_MS = 4000;

export default function Banner() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'Be part of the community',
      subtitle:
        'Connect with developers, designers, and learners. Participate in events, learn together, and contribute to community projects.',
      cta: 'Join community',
      ctaHref: '/communityPage',
    },
    {
      title: 'Learn and grow together',
      subtitle:
        'Join workshops, hackathons, and meetups. Share knowledge and build something amazing with the flutter community.',
      cta: 'Join community',
      ctaHref: '/communityPage',
    },
    {
      title: 'Share your projects',
      subtitle:
        'Showcase your apps, get feedback, and collaborate. Connect with mentors and contributors worldwide.',
      cta: 'Join community',
      ctaHref: '/communityPage',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, BANNER_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <Box
      sx={{
        width: 393,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',   
        pt: 0,
      }}
    >
      {/* Blue Banner Card */}
      <Box
        sx={{
          width: 346,
          height: 187,
          borderRadius: 8,
          pl:4,
          pr:4,
          pt:3.5,
          pb:3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4c65e8 0%, #6f85ff 100%)',
          color: '#fff',
          boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, lineHeight: 1.2 }}
          >
            {slides[activeSlide].title}
          </Typography>

          <Typography
            variant="body2"
            sx={{ opacity: 0.95, lineHeight: 1.5 }}
          >
            {slides[activeSlide].subtitle}
          </Typography>

          <Button
            component={Link}
            href={slides[activeSlide].ctaHref}
            variant="contained"
            sx={{
              height:36,
              alignSelf: 'flex-start',
              mt: 1,
              background: '#fff',
              color: '#000',
              borderRadius: '999px',
              px: 2.5,
              py: 0.5,
              textTransform: 'none',
              fontWeight: 500,
              boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
              '&:hover': {
                background: '#f5f5f5',
              },
            }}
          >
            {slides[activeSlide].cta}
          </Button>
        </Stack>
      </Box>

      {/* Carousel Dots */}
      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 2.2,mb:0 }}   
      >
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => setActiveSlide(i)}
            sx={{
              width: 7,
              height: 7,
              mb:2,
              borderRadius: '50%',
              cursor: 'pointer',
              background: i === activeSlide ? '#000' : '#cfcfcf',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
