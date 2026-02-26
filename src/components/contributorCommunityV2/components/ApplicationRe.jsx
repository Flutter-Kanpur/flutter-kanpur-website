'use client';

import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArRevampButton from '@/components/buttons/revampArrowButton/ArRevampButton';
import RevampButton from '@/components/buttons/revampbutton/RevampButton';


const ApplicationUnderReview = ({ data = {} }) => {
  const router = useRouter();
  const isStrictMobile = useMediaQuery('(max-width:426px)');

  const getSubmittedDate = () => {
    if (data.createdAt) {
      try {
        const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      } catch {
        return '—';
      }
    }
    return '—';
  };

  return (
    <Box sx={{
      width: '100%',
      bgcolor: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // ✅ Sidebar offset for desktop
      ml: { xs: 0, md: '280px' },
      maxWidth: { md: 'calc(100% - 280px)' },
    }}>

      {/* 1. Top Content Area */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        textAlign: 'center'
      }}>

        {/* Clock Illustration */}
        <Box sx={{ width: '120px', mt: 4, mb: 2 }}>
          <img
            src="/assets/review.png"
            alt="Under Review"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontFamily: 'var(--font-product-sans)' }}>
          Application under review
        </Typography>

        <Typography sx={{ color: '#6D6D6D', fontSize: '16px', mb: 2, maxWidth: '280px', fontFamily: 'var(--font-product-sans)' }}>
          Thanks for applying to be a <br /> contributor.
        </Typography>


        <RevampButton
          text="View application details"
          width="240px"
          onClick={() => router.push('/profile/mycontribution/summary')}
        />

        {/* 2. Status Details Section */}
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography sx={{ color: '#B0B0B0', fontWeight: 400, fontSize: '14px', mb: 0.5, fontFamily: 'var(--font-product-sans)' }}>Status:</Typography>
            <Typography sx={{ fontWeight: 500, fontSize: '16px', fontFamily: 'var(--font-product-sans)' }}>Under review</Typography>
          </Box>

          <Box>
            <Typography sx={{ color: '#B0B0B0', fontWeight: 400, fontSize: '14px', mb: 0.5, fontFamily: 'var(--font-product-sans)' }}>Submitted on:</Typography>
            <Typography sx={{ fontWeight: 500, fontSize: '16px', fontFamily: 'var(--font-product-sans)' }}>{getSubmittedDate()}</Typography>
          </Box>

          <Box>
            <Typography sx={{ color: '#B0B0B0', fontWeight: 400, fontSize: '14px', mb: 0.5, fontFamily: 'var(--font-product-sans)' }}>Estimated response:</Typography>
            <Typography sx={{ fontWeight: 500, fontSize: '16px', fontFamily: 'var(--font-product-sans)' }}>Within 5–7 days</Typography>
          </Box>
        </Box>
      </Box>


      <Box sx={{
        width: '90%',
        maxWidth: '400px',
        bgcolor: '#FFF9EB',
        borderRadius: '8px',
        p: 2,
        mt: 10,
        mb: isStrictMobile ? 15 : 5,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5
      }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.3125 0C5.86623 0 4.45243 0.428871 3.2499 1.23238C2.04736 2.03589 1.1101 3.17794 0.556634 4.51413C0.00316839 5.85031 -0.141643 7.32061 0.140511 8.7391C0.422665 10.1576 1.1101 11.4605 2.14178 12.4832C3.16446 13.5059 4.46742 14.2023 5.88591 14.4845C7.30439 14.7666 8.77469 14.6218 10.1109 14.0684C11.4471 13.5149 12.5891 12.5776 13.3926 11.3751C14.1961 10.1726 14.625 8.75878 14.625 7.3125C14.623 5.37373 13.8519 3.51496 12.481 2.14404C11.11 0.773127 9.25127 0.00204737 7.3125 0ZM6.75 3.9375C6.75 3.78832 6.80927 3.64524 6.91476 3.53975C7.02025 3.43426 7.16332 3.375 7.3125 3.375C7.46169 3.375 7.60476 3.43426 7.71025 3.53975C7.81574 3.64524 7.875 3.78832 7.875 3.9375V7.875C7.875 8.02418 7.81574 8.16726 7.71025 8.27275C7.60476 8.37824 7.46169 8.4375 7.3125 8.4375C7.16332 8.4375 7.02025 8.37824 6.91476 8.27275C6.80927 8.16726 6.75 8.02418 6.75 7.875V3.9375ZM7.3125 11.25C7.14563 11.25 6.98249 11.2005 6.84374 11.1078C6.70499 11.0151 6.59684 10.8833 6.53298 10.7291C6.46912 10.575 6.45241 10.4053 6.48497 10.2416C6.51752 10.078 6.59788 9.92763 6.71588 9.80963C6.83388 9.69163 6.98422 9.61127 7.1479 9.57871C7.31157 9.54616 7.48122 9.56287 7.63539 9.62673C7.78957 9.69059 7.92134 9.79873 8.01406 9.93749C8.10677 10.0762 8.15625 10.2394 8.15625 10.4062C8.15625 10.63 8.06736 10.8446 7.90912 11.0029C7.75089 11.1611 7.53628 11.25 7.3125 11.25Z" fill="#EF9F20" />
        </svg>
        <Typography sx={{ color: '#EF9F20', fontSize: '14px', fontWeight: 500, fontFamily: 'var(--font-product-sans)' }}>
          We’ll notify you once there’s an update.
        </Typography>
      </Box>



    </Box>
  );
};

export default ApplicationUnderReview;