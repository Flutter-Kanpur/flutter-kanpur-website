import { Box, Typography } from '@mui/material';
import React from 'react';

const EventCard = ({
    tag = "Hackathon",
    date = "April 5, 2025",
    time = "9:00 AM - 4:00 PM IST",
    title = "UX/UI Design Sprint Workshop",
    description = "A fast-paced, hands-on workshop where designers collaborate to solve real-world design challenges and create innovative solutions.",
    style = {}
}) => {
    return (
        <Box
            sx={{
                position: 'relative',
                borderRadius: '12px',
                padding: '1px',
                background: 'linear-gradient(180deg, #E5E8EC 0%, #E5E8EC 75%, #000000 100%)',
                display: 'inline-block',
                width: { xs: "100%", sm: "auto" },
                maxWidth: { xs: "100%", sm: "350px", md: "400px" },
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                },
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
                    justifyContent: 'space-between',
                    transition: 'height 0.3s ease',
                    '&:hover': {
                        height: 'auto',
                        minHeight: '280px'
                    }
                }}
            >
                {/* Header with Tag and Date/Time */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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

                    {/* Date and Time */}
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                                fontWeight: '400',
                                color: '#A6A6A6',
                                fontFamily: 'Encode Sans, sans-serif',
                                marginBottom: '4px'
                            }}
                        >
                            {date}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '14px',
                                fontWeight: '400',
                                color: '#A6A6A6',
                                fontFamily: 'Encode Sans, sans-serif'
                            }}
                        >
                            {time}
                        </Typography>
                    </Box>
                </Box>

                {/* Title */}
                <Typography
                    sx={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#FFFFFF',
                        lineHeight: '1.3',
                        fontFamily: 'Encode Sans, sans-serif',
                        marginTop: '20px'
                    }}
                >
                    {title}
                </Typography>

                {/* Description */}
                <Typography
                    sx={{
                        fontSize: '16px',
                        fontWeight: '400',
                        color: '#FFFFFF',
                        lineHeight: '1.6',
                        fontFamily: 'Encode Sans, sans-serif',
                        marginTop: '16px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            WebkitLineClamp: 'unset',
                            overflow: 'visible'
                        }
                    }}
                >
                    {description}
                </Typography>
            </Box>
        </Box>
    );
};

export default EventCard; 