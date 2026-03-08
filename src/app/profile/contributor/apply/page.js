'use client';

import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import ContributorApplication from '@/components/contributorCommunityV2/components/ContributorApplication';
import GradientHeader from '@/components/contributorCommunityV2/GradientHeader';

export default function ApplyPage() {
  const router = useRouter();
  

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
      
      {isStrictMobile && (
        <GradientHeader 
          title="Contributor application" 
          variant="plain" 
          onBack={handleBack} 
        />
      )}

 
      <Box sx={{ width: '100%' }}>
        <ContributorApplication
          onBack={handleBack}
          onContinue={(formData) => {
        
            console.log("Form Submitted:", formData);
            router.push('/profile/contributor/review');
          }}
        />
      </Box>
    </Box>
  );
}