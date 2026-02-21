'use client';

import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import CommunityPolicy from '@/components/contributorCommunityV2/components/CommunityPolicy';
import GradientHeader from '@/components/contributorCommunityV2/GradientHeader';

export default function ApplyPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      {/* 1. Header: Only visible on mobile */}
      {isMobile && (
        <GradientHeader 
          title="Community guidelines" 
          onBack={() => router.back()} 
         
        />
      )}

      {/* 2. Content Section: Remove MT on desktop to align with sidebar */}
      <Box sx={{ width: '100%', mt: { xs: 2, md: 0 } }}> 
        <CommunityPolicy />
      </Box>
    </Box>
  );
}