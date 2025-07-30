import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import styles from './shimmer.module.css';

const ShimmerButton = () => {
    return (
        <Button
            variant="contained"
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
