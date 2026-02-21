'use client';

import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import GradientHeader from '@/components/contributorCommunityV2/GradientHeader';
import AlreadySubmitted from '@/components/contributorCommunityV2/components/AlreadySubmitted';

const Page = () => {
    const router = useRouter();
 
    const isStrictMobile = useMediaQuery('(max-width:425px)');

    return (
        <Box sx={{ bgcolor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
            {isStrictMobile && (
                <GradientHeader 
                    title="Join as a Contributor" 
                    onBack={() => router.back()} 
                />
            )}

            <Box sx={{ 
                width: '100%', 
                mt: { xs: 0, md: 4 },
                ml: { xs: 0, md: '280px' }, 
                maxWidth: { md: 'calc(100% - 280px)' }
            }}> 
                <AlreadySubmitted isStrictMobile={isStrictMobile} />
            </Box>
        </Box>
    );
};

export default Page;