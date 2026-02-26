'use client';

import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArRevampButton from '@/components/buttons/revampbutton/RevampButton';


const ApplicationRejected = () => {
    const router = useRouter();
    const isStrictMobile = useMediaQuery('(max-width:425px)');
    const outfitFont = 'var(--font-product-sans)';

    return (
        <Box sx={{
            width: '100%',
            bgcolor: '#fff',
            minHeight: '115vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            ml: { xs: 0, md: '280px' },
            maxWidth: { md: 'calc(100% - 280px)' },
        }}>

            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                px: 3,
                textAlign: 'center'
            }}>

                <Box sx={{ mt: isStrictMobile ? -10 : 0 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1.5, fontFamily: 'var(--font-product-sans)' }}>
                        Application not approved
                    </Typography>

                    <Typography sx={{
                        color: '#666',
                        fontSize: '15px',
                        lineHeight: 1.6,
                        mb: 4,
                        maxWidth: '280px',
                        fontFamily: 'var(--font-product-sans)'
                    }}>
                        Thank you for applying. At this time, we’re unable to onboard you.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ArRevampButton
                            text="Back to profile"
                            width="200px"
                            onClick={() => router.push('/profile')}
                        />
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                width: '90%',
                maxWidth: '400px',
                bgcolor: '#FFF9EB',
                borderRadius: '8px',
                p: 2,
                mb: isStrictMobile ? 2 : 5,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,

            }}>
                <InfoOutlinedIcon sx={{ color: '#F59E0B', fontSize: '20px' }} />
                <Typography sx={{ color: '#EF9F20', fontSize: '14px', fontWeight: 500, fontFamily: 'var(--font-product-sans)', }}>
                    You can apply again in the future.
                </Typography>
            </Box>

         
        </Box>
    );
};

export default ApplicationRejected;