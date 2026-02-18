'use client';

import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Project Components
import RevampButton from '@/components/buttons/revampbutton/RevampButton';
import BottomNav from '@/components/contributorCommunityV2/BottomNav';

const ApplicationRejected = () => {
    const router = useRouter();
    const isStrictMobile = useMediaQuery('(max-width:425px)');
    const outfitFont = 'var(--font-product-sans)';

    return (
        <Box sx={{
            width: '100%',
            bgcolor: '#fff',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // ✅ Sidebar offset for desktop alignment
            ml: { xs: 0, md: '280px' },
            maxWidth: { md: 'calc(100% - 280px)' },
        }}>

            {/* 1. Main Content Area */}
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                px: 3,
                textAlign: 'center'
            }}>

                {/* Spacing for top header if needed on mobile */}
                <Box sx={{ mt: isStrictMobile ? -10 : 0 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, fontFamily: outfitFont }}>
                        Application not approved
                    </Typography>

                    <Typography sx={{
                        color: '#666',
                        fontSize: '15px',
                        lineHeight: 1.6,
                        mb: 4,
                        maxWidth: '280px',
                        fontFamily: outfitFont
                    }}>
                        Thank you for applying. At this time, we’re unable to onboard you.
                    </Typography>

                    {/* ✅ Glossy 3D "Back to profile" Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <RevampButton
                            text="Back to profile"
                            width="200px"
                            onClick={() => router.push('/profile')}
                        />
                    </Box>
                </Box>
            </Box>

            {/* 2. Bottom Notice (Amber Alert Style from Figma) */}
            <Box sx={{
                width: '90%',
                maxWidth: '400px',
                bgcolor: '#FFF9EB', // Figma Light Orange
                borderRadius: '16px',
                p: 2,
                mb: isStrictMobile ? 12 : 5, // Clearance for BottomNav
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,

            }}>
                <InfoOutlinedIcon sx={{ color: '#F59E0B', fontSize: '20px' }} />
                <Typography sx={{ color: '#D97706', fontSize: '13px', fontWeight: 600, fontFamily: outfitFont, }}>
                    You can apply again in the future.
                </Typography>
            </Box>

            {/* 3. Mobile Navigation */}
            {isStrictMobile && <BottomNav />}
        </Box>
    );
};

export default ApplicationRejected;