'use client';

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const GOOGLE_PLAY_URL = 'https://play.google.com/store/search?q=flutter%20kanpur&c=apps&hl=en_IN';

export default function MobileRedirect() {
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            // Check if screen width is tablet or mobile (typically < 1024px for tablets)
            const width = window.innerWidth;
            // Mobile: < 768px, Tablet: 768px - 1024px
            setIsMobileOrTablet(width < 1024);
        };

        // Check on mount
        checkScreenSize();

        // Check on resize
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    // Auto - redirect when mobile / tablet is detected
    useEffect(() => {
        if (isMobileOrTablet) {
            // Show message for 2 seconds, then redirect
            const redirectTimer = setTimeout(() => {
                window.location.href = GOOGLE_PLAY_URL;
            }, 2000);

            return () => {
                clearTimeout(redirectTimer);
            };
        }
    }, [isMobileOrTablet]);

    // Prevent body scroll when overlay is shown
    useEffect(() => {
        if (isMobileOrTablet) {
            // Save original overflow values
            const originalOverflow = document.body.style.overflow;
            const originalHeight = document.body.style.height;

            // Prevent scrolling
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.style.height = '100vh';

            return () => {
                // Restore original values
                document.body.style.overflow = originalOverflow;
                document.body.style.height = originalHeight;
                document.documentElement.style.overflow = '';
                document.documentElement.style.height = '';
            };
        }
    }, [isMobileOrTablet]);

    if (!isMobileOrTablet) {
        return null;
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: 3,
                textAlign: 'center',
                overflow: 'hidden',
                boxSizing: 'border-box',
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                    padding: { xs: '0 16px', sm: '0 24px' },
                    wordWrap: 'break-word',
                    maxWidth: '90%',
                }}
            >
                We have a life we dont do mobile responsive
            </Typography>
            <img src='/assets/savage.png' alt='savage' height="200" width="200" />
            <Typography
                // variant="h5"
                sx={{
                    color: '#fff',
                    fontWeight: 500,
                    fontSize: 12,
                    wordWrap: 'break-word',
                    maxWidth: '90%',
                }}
            >
                Courtesy Flutter Kanpur Devs 😌
            </Typography>
        </Box>
    );
}

