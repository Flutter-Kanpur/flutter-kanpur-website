'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import SuccessScreen from '@/components/contributorCommunityV2/components/SuccessScreen';
import BottomNav from '@/components/contributorCommunityV2/BottomNav';

const STORAGE_KEY = "contributor_application_draft";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {

    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        minHeight: '100vh',
        pb: '100px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <SuccessScreen
        onContinue={() => router.push('/profile/contributor')}
      />

      <BottomNav />
    </Box>
  );
}
