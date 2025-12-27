'use client';

import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import styles from './shimmer.module.css';
import Link from 'next/link';

const ShimmerButton = ({ style = {} }) => {
    return (
        <Link
            href="https://discord.gg/wddvwVBfgj"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', display: 'inline-block' }}
        >
            <Button
                variant="contained"
                component="div"
                sx={{
                    background: 'transparent',
                    padding: 0,
                    minWidth: 0,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: 'none',
                    position: 'relative',
                    zIndex: 10,
                    '&:hover': {
                        background: 'transparent',
                        boxShadow: 'none',
                    },
                    '&:active': {
                        background: 'transparent',
                    },
                    ...style
                }}
            >
                <Box
                    className={styles.shimmerCard}
                    sx={{
                        pointerEvents: 'none',
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    <Typography
                        className={styles.shimmerText}
                        sx={{
                            pointerEvents: 'none',
                            position: 'relative',
                            zIndex: 2
                        }}
                    >
                        Join Community
                    </Typography>
                </Box>
            </Button>
        </Link>
    );
};

export default ShimmerButton;
