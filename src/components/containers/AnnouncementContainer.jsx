import { Box, Typography } from '@mui/material';
import React from 'react';

const AnnouncementContainer = ({ 
    tag = "Announcement", 
    title, 
    bodyText, 
    style = {},
    tagColor = "#3FD1FF",
    tagBackground = "#2E3942"
}) => {
    return (
        <Box
            sx={{
                position: 'relative',
                borderRadius: '12px',
                padding: '1px',
                background: 'linear-gradient(180deg, #E5E8EC 0%, #E5E8EC 25%, #E5E8EC 50%, #E5E8EC 75%, #000000 100%)',
                display: 'inline-block',
                width: { xs: "100%", sm: "auto" },
                maxWidth: { xs: "100%", sm: "500px", md: "600px" },
                ...style,
            }}
        >
            <Box
                sx={{
                    background: 'linear-gradient(to bottom, #0F1C25 0%, #0C1217 100%)',
                    borderRadius: '12px',
                    padding: '32px',
                    width: '100%',
                    height: '280px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                {/* Tag */}
                <Box
                    sx={{
                        display: 'inline-block',
                        background: 'transparent',
                        border: '1px solid #2E3942',
                        borderRadius: '20px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '16px',
                        fontFamily: 'Encode Sans, sans-serif',
                        position: 'relative',
                        width: 'fit-content',
                        '&::before': {
                            content: `"${tag}"`,
                            position: 'absolute',
                            top: '8px',
                            left: '16px',
                            background: 'linear-gradient(to right, #3FD1FF 0%, #FFFFFF 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontSize: '14px',
                            fontWeight: '500',
                            fontFamily: 'Encode Sans, sans-serif'
                        }
                    }}
                >
                    <span style={{ visibility: 'hidden' }}>{tag}</span>
                </Box>

                {/* Title */}
                <Typography
                    sx={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#FFFFFF',
                        marginBottom: '16px',
                        lineHeight: '1.3',
                        fontFamily: 'Encode Sans, sans-serif'
                    }}
                >
                    {title}
                </Typography>

                {/* Body Text */}
                <Typography
                    sx={{
                        fontSize: '16px',
                        fontWeight: '400',
                        color: '#FFFFFF',
                        lineHeight: '1.6',
                        fontFamily: 'Encode Sans, sans-serif'
                    }}
                >
                    {bodyText}
                </Typography>
            </Box>
        </Box>
    );
};

export default AnnouncementContainer; 