'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import DiscussionCard from '@/v2components/DiscussionCard';

const FeaturedDiscussions = ({ safeDiscussions }) => {
    const router = useRouter();
    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "space-between", marginTop: '24px', marginBottom: '16px' }}>
                <Typography sx={{ fontSize: 16, fontWeight: 500, color: "#000", }}>Featured discussions</Typography>
                <Typography
                    onClick={() => router.push('/discussion')}
                    sx={{ color: '#3B82F6', fontWeight: 500, textDecoration: 'none', cursor: 'pointer' }}
                >
                    Explore all
                </Typography>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                gap: "12px",
                overflowX: "auto",

                // Hide scrollbar (Chrome, Safari, Edge)
                "&::-webkit-scrollbar": {
                    display: "none",
                },

                // Hide scrollbar (Firefox)
                scrollbarWidth: "none",

                // Hide scrollbar (IE 10+)
                msOverflowStyle: "none",
            }}>
                {safeDiscussions.map(d => <DiscussionCard key={d.id} id={d.id} {...d} />)}
            </Box>
        </Box>
    )
}

export default FeaturedDiscussions
