'use client';

import React from 'react';
import { Box, Typography, InputBase } from '@mui/material';
import { SearchIcon, SettingsIcon } from '@/components/profile/ProfileOverviewIcons';

const productSans = 'var(--font-product-sans)';

const ProfileRightPanel = ({ user }) => {

    const profileChecklist = [
        { label: 'Account setup', done: true },
        { label: 'Upload your photo', done: true },
        { label: 'Add your github', done: false },
        { label: 'Account setup', done: false },
    ];

    const completedCount = profileChecklist.filter((i) => i.done).length;
    const progressPercent = Math.round((completedCount / profileChecklist.length) * 100);

    return (
        <Box
            sx={{
                display: { xs: 'none', sm: 'flex' },
                flexDirection: 'column',
                width: '300px',
                minWidth: '300px',
                gap: 3,
                pt: 3,
                pr: 3,
            }}
        >
            {/* Search bar */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flex: 1,
                        border: '1px solid #E0E0E0',
                        borderRadius: '10px',
                        px: 1.5,
                        py: 0.8,
                        bgcolor: '#fff',
                    }}
                >
                    <InputBase
                        placeholder="Search menu options..."
                        sx={{
                            flex: 1,
                            fontSize: '13px',
                            fontFamily: productSans,
                            color: '#424242',
                            '& input::placeholder': {
                                color: '#9E9E9E',
                                opacity: 1,
                            },
                        }}
                    />
                    <SearchIcon color="#9E9E9E" />
                </Box>
                <Box
                    sx={{
                        width: '36px',
                        height: '36px',
                        border: '1px solid #E0E0E0',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: '#F5F5F5' },
                    }}
                >
                    <SettingsIcon color="#757575" />
                </Box>
            </Box>

            {/* Complete your profile card */}
            <Box
                sx={{
                    border: '1px solid #E0E0E0',
                    borderRadius: '16px',
                    p: 2.5,
                    bgcolor: '#fff',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '15px',
                        fontWeight: 600,
                        fontFamily: productSans,
                        color: '#1a1a1a',
                        mb: 2.5,
                    }}
                >
                    Complete your profile
                </Typography>

                {/* Progress circle */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2.5 }}>
                    <Box sx={{ position: 'relative', width: '90px', height: '90px' }}>
                        <svg width="90" height="90" viewBox="0 0 90 90">
                            {/* Background circle */}
                            <circle
                                cx="45"
                                cy="45"
                                r="38"
                                fill="none"
                                stroke="#F0F0F0"
                                strokeWidth="6"
                            />
                            {/* Progress arc */}
                            <circle
                                cx="45"
                                cy="45"
                                r="38"
                                fill="none"
                                stroke="#4167F2"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 38}`}
                                strokeDashoffset={`${2 * Math.PI * 38 * (1 - progressPercent / 100)}`}
                                transform="rotate(-90 45 45)"
                            />
                        </svg>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    fontFamily: productSans,
                                    color: '#1a1a1a',
                                }}
                            >
                                {progressPercent}%
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Checklist */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {profileChecklist.map((item, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                            }}
                        >
                            <Box
                                sx={{
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    bgcolor: item.done ? '#22C55E' : '#F59E0B',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                {item.done && (
                                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                        <path
                                            d="M2 6L5 9L10 3"
                                            stroke="#fff"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: 400,
                                    fontFamily: productSans,
                                    color: '#424242',
                                }}
                            >
                                {item.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Leaderboard card */}
            <Box
                sx={{
                    border: '1px solid #E0E0E0',
                    borderRadius: '16px',
                    p: 2.5,
                    bgcolor: '#fff',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '15px',
                        fontWeight: 600,
                        fontFamily: productSans,
                        color: '#1a1a1a',
                        mb: 2,
                        textAlign: 'center',
                    }}
                >
                    Leaderboard
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((rank) => (
                        <Box
                            key={rank}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                py: 1.2,
                                px: 1.5,
                                borderBottom: rank < 10 ? '1px solid #F0F0F0' : 'none',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                '&:hover': { bgcolor: '#FAFAFA' },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    fontFamily: productSans,
                                    color: '#1a1a1a',
                                }}
                            >
                                {rank}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default ProfileRightPanel;
