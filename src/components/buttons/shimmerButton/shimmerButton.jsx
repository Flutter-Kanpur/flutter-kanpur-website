'use client';

import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import styles from './shimmer.module.css';

const ShimmerButton = ({ style = {} }) => {
    const handleJoinCommunity = () => {
        // Open WhatsApp group link in a new tab
        window.open('https://chat.whatsapp.com/LuDICwM4HM1860KMPylHUT', '_blank');
    };

    return (
        <Button
            variant="contained"
            onClick={handleJoinCommunity}
            sx={{
                background: 'transparent',
                padding: 0,
                minWidth: 0,
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: 'none',
                '&:hover': {
                    background: 'transparent',
                    boxShadow: 'none',
                },
                ...style
            }}
        >
            <Box className={styles.shimmerCard}>
                <Typography className={styles.shimmerText}>
                    Join Community
                </Typography>
            </Box>
        </Button>
    );
};

export default ShimmerButton;
