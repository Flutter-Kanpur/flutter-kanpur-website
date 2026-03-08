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


        {/* <Box sx={{
          width: '100%',
          maxWidth: '400px',
          bgcolor: '#F0FDF4',
          borderRadius: '24px',
          p: 3,
          border: '1px solid #BBF7D0',
          textAlign: 'left',
          mb: 4
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography sx={{ color: '#9e9e9e', fontSize: '13px', fontFamily: outfitFont }}>Name</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '13px', fontFamily: outfitFont }}>
              {data.fullName || '—'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography sx={{ color: '#9e9e9e', fontSize: '13px', fontFamily: outfitFont }}>Role</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '13px', fontFamily: outfitFont }}>
              {data.currentRole || '—'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography sx={{ color: '#9e9e9e', fontSize: '13px', fontFamily: outfitFont }}>Contributing to</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '13px', fontFamily: outfitFont }}>
              {data.contributionOption || '—'}
            </Typography>
          </Box>

          {data.relevantSkills && data.relevantSkills.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: '#9e9e9e', fontSize: '13px', mb: 1, fontFamily: outfitFont }}>Skills</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {data.relevantSkills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    sx={{
                      bgcolor: '#DCFCE7',
                      color: '#166534',
                      fontWeight: 500,
                      fontSize: '12px',
                      fontFamily: outfitFont
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box> */}

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
