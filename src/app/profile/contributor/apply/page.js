'use client';

import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import ContributorApplication from '@/components/contributorCommunityV2/components/ContributorApplication';
import GradientHeader from '@/components/contributorCommunityV2/GradientHeader';

export default function ApplyPage() {
  const router = useRouter();
  
  // ✅ Detect strict mobile view for header logic consistency
  const isStrictMobile = useMediaQuery('(max-width:426px)');

  const handleBack = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100vh',
        bgcolor: '#fff'
      }}
    >
      {/* 1. Header Logic: Plain variant only on Mobile (≤425px) 
          On Desktop, ContributorApplication handles its own Back button layout */}
      {isStrictMobile && (
        <GradientHeader 
          title="Contributor application" 
          variant="plain" 
          onBack={handleBack} 
        />
      )}

      {/* 2. MAIN FORM SECTION */}
      <Box sx={{ width: '100%' }}>
        <ContributorApplication
          onBack={handleBack}
          onContinue={(formData) => {
            // Push form data to review or next step
            console.log("Form Submitted:", formData);
            router.push('/profile/contributor/review');
          }}
        />
      </Box>
    </Box>
  );
}