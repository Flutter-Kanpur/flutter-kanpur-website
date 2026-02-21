'use client';

import React from 'react';
import { Box, Typography, Chip, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArRevampButton from '@/components/buttons/revampArrowButton/ArRevampButton';


const AlreadyContributor = ({ data = {} }) => {
  const router = useRouter();
  const isStrictMobile = useMediaQuery('(max-width:425px)');
  const outfitFont = 'var(--font-product-sans)';

  return (
    <Box sx={{
      width: '100%',
      bgcolor: '#fff',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>

      {/* Top Content Area */}
      <Box sx={{
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        textAlign: 'center'
      }}>


        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, fontFamily: outfitFont }}>
          You’re already a contributor
        </Typography>

        <Typography sx={{ color: '#666', fontSize: '15px', mb: 4, maxWidth: '300px', fontFamily: outfitFont }}>
          You already have contributor access in the community.
        </Typography>


        <ArRevampButton
          text="View contributor resources"
          width="250px"
          onClick={() => router.push('/profile/mycontribution')}
        />
      </Box>


    </Box>
  );
};

export default AlreadyContributor;
