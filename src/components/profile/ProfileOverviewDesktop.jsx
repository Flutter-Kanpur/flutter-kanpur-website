'use client';

import React from 'react';
import { Box, Typography, Avatar, Chip, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
    BackArrowIcon,
    EditIcon,
    LocationIcon,
    BadgeStarIcon,
} from './ProfileOverviewIcons';

const productSans = 'var(--font-product-sans)';

const ProfileOverviewDesktop = ({ user, userData = {} }) => {
    const router = useRouter();

    const isStrictMobile = useMediaQuery('(max-width:426px)');
    const backButtonStyle = {
        display: { xs: 'none', sm: 'flex' },
        alignItems: 'center',
        color: '#000',
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '14px',
        fontFamily: 'var(--font-product-sans)',
        background: 'linear-gradient(180deg, #E0E0E0 0%, #FFFFFF 30%, #FFFFFF 100%)',
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        px: 1.5,
        py: 0.5,
        mb: 3,
        mt: 4,
        minWidth: 'auto',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
        '&:hover': {
            background: 'linear-gradient(180deg, #D5D5D5 0%, #F5F5F5 30%, #F5F5F5 100%)',
            borderColor: '#d0d0d0',
        },
        '& .MuiButton-startIcon': {
            marginRight: '4px'
        }
    };

    return (
        <Box sx={{ display: { xs: 'none', sm: 'block' }, pt: 3, px: 3 }}>
            {/* Back button */}
            <Box
                onClick={() => router.back()}
                sx={{
                    ...backButtonStyle,

                    '&:hover': { bgcolor: '#F9F9F9' },
                    display: isStrictMobile ? 'none' : 'flex'

                }}
            >
                <BackArrowIcon />
                <Typography sx={{ fontSize: '14px', fontWeight: 500, fontFamily: productSans, color: '#1a1a1a' }}>
                    Back
                </Typography>
            </Box>

            {/* Profile photo section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                <Avatar
                    src={user?.photoURL || ''}
                    sx={{
                        width: 100,
                        height: 100,
                        border: '3px solid #F0F0F0',
                    }}
                >
                    {!user?.photoURL && user?.displayName?.[0]}
                </Avatar>
                <Box>
                    <Box
                        onClick={() => router.push('/profile/edit')}
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.5,
                            border: '1px solid #E0E0E0',
                            borderRadius: '8px',
                            px: 2,
                            py: 0.6,
                            cursor: 'pointer',
                            mb: 1,
                            '&:hover': { bgcolor: '#F9F9F9' },
                        }}
                    >
                        <Typography sx={{ fontSize: '14px', fontWeight: 400, fontFamily: productSans, color: '#5D5D5D' }}>
                            Change photo
                        </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '14px', color: '#6D6D6D', fontFamily: productSans }}>
                        At least 800*800 px recommended.
                    </Typography>
                    <Typography sx={{ fontSize: '14px', color: '#6D6D6D', fontFamily: productSans }}>
                        JPG or PNG is allowed.
                    </Typography>
                </Box>
            </Box>

            {/* Personal info card */}
            <Box
                sx={{
                    border: '1px solid #E0E0E0',
                    borderRadius: '16px',
                    p: 3,
                    mb: 3,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 400, fontFamily: productSans, color: '#1a1a1a' }}>
                        Personal info
                    </Typography>
                    <Box
                        onClick={() => router.push('/profile/edit')}
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.5,
                            border: '1px solid #E0E0E0',
                            borderRadius: '8px',
                            px: 1.5,
                            py: 0.5,
                            cursor: 'pointer',
                            '&:hover': { bgcolor: '#F9F9F9' },
                        }}
                    >
                        <EditIcon />
                        <Typography sx={{ fontSize: '13px', fontWeight: 500, fontFamily: productSans, color: '#424242' }}>
                            Edit
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 6 }}>
                    <Box>
                        <Typography sx={{ fontSize: '14px', color: '#9E9E9E', fontFamily: productSans, mb: 0.5 }}>
                            Full name
                        </Typography>
                        <Typography sx={{ fontSize: '16px', fontWeight: 400, fontFamily: productSans, color: '#1a1a1a' }}>
                            {user?.displayName || 'N/A'}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '14px', color: '#9E9E9E', fontFamily: productSans, mb: 0.5 }}>
                            Username
                        </Typography>
                        <Typography sx={{ fontSize: '16px', fontWeight: 400, fontFamily: productSans, color: '#1a1a1a' }}>
                            {userData?.username || 'N/A'}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '14px', color: '#9E9E9E', fontFamily: productSans, mb: 0.5 }}>
                            Email address
                        </Typography>
                        <Typography sx={{ fontSize: '16px', fontWeight: 400, fontFamily: productSans, color: '#1a1a1a' }}>
                            {user?.email || 'N/A'}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Location & Role row */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        border: '1px solid #E0E0E0',
                        borderRadius: '10px',
                        px: 2,
                        py: 1,
                    }}
                >
                    <LocationIcon />
                    <Typography sx={{ fontSize: '16px', fontWeight: 500, fontFamily: productSans, color: '#1a1a1a' }}>
                        Location
                    </Typography>
                    <Typography sx={{ fontSize: '16px', color: '#9E9E9E', fontFamily: productSans, mx: 0.5 }}>-</Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 400, fontFamily: productSans, color: '#1a1a1a' }}>
                        {userData?.location || 'Not set'}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        border: '1px solid #E0E0E0',
                        borderRadius: '10px',
                        px: 2,
                        py: 1,
                    }}
                >
                    <Typography sx={{ fontSize: '16px', fontWeight: 500, fontFamily: productSans, color: '#1a1a1a' }}>
                        Role
                    </Typography>
                    <Typography sx={{ fontSize: '16px', color: '#9E9E9E', fontFamily: productSans, mx: 0.5 }}>-</Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 400, fontFamily: productSans, color: '#1a1a1a' }}>
                        {userData?.role || 'Student'}
                    </Typography>
                </Box>

                <Box
                    onClick={() => router.push('/profile/edit')}
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        border: '1px solid #E0E0E0',
                        borderRadius: '8px',
                        px: 1.5,
                        py: 0.8,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: '#F9F9F9' },
                    }}
                >
                    <EditIcon color="#5D5D5D" />
                    <Typography sx={{ fontSize: '16px', fontWeight: 400, fontFamily: productSans, color: '#424242' }}>
                        Edit
                    </Typography>
                </Box>
            </Box>

            {/* Bio section */}
            <Box
                sx={{
                    border: '1px solid #E0E0E0',
                    borderRadius: '16px',
                    p: 3,
                    mb: 4,
                }}
            >
                <Typography sx={{ fontSize: '16px', fontWeight: 500, fontFamily: productSans, color: '#1a1a1a', mb: 1.5 }}>
                    Bio
                </Typography>
                <Typography sx={{ fontSize: '14px', fontFamily: productSans, color: '#616161', lineHeight: 1.7 }}>
                    {userData?.bio || userData?.about || 'No bio added yet. Click edit to add your bio.'}
                </Typography>
            </Box>

            {/* Current Streak & Reputation Points */}
            <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        border: '1px solid #E0E0E0',
                        borderRadius: '12px',
                        px: 2.5,
                        py: 1.5,
                    }}
                >
                    <Typography sx={{ fontSize: '16px', fontWeight: 400, fontFamily: productSans, color: '#1a1a1a' }}>
                        Current Streak
                    </Typography>
                    <Chip
                        label={userData?.streak || '0'}
                        sx={{
                            bgcolor: '#4167F2',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '14px',
                            fontFamily: productSans,
                            height: '28px',
                            borderRadius: '8px',
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        border: '1px solid #E0E0E0',
                        borderRadius: '12px',
                        px: 2.5,
                        py: 1.5,
                    }}
                >
                    <Typography sx={{ fontSize: '16px', fontWeight: 400, fontFamily: productSans, color: '#1a1a1a' }}>
                        Reputation Points
                    </Typography>
                    <Typography sx={{ fontSize: '16px', color: '#9E9E9E', fontFamily: productSans }}>-</Typography>
                    <Box
                        sx={{
                            border: '1px solid #1a1a1a',
                            borderRadius: '8px',
                            px: 1.5,
                            py: 0.2,
                        }}
                    >
                        <Typography sx={{ fontSize: '14px', fontWeight: 700, fontFamily: productSans, color: '#1a1a1a' }}>
                            {userData?.reputationPoints || '0'}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Badges section */}
            <Box
                sx={{
                    border: '1px solid #E0E0E0',
                    borderRadius: '16px',
                    p: 3,
                    mb: 4,
                }}
            >
                <Typography sx={{ fontSize: '16px', fontWeight: 500, fontFamily: productSans, color: '#1a1a1a', mb: 2 }}>
                    Badges
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography sx={{ fontSize: '48px', fontWeight: 700, fontFamily: productSans, color: '#4167F2' }}>
                        {userData?.badgeCount || '0'}+
                    </Typography>
                    {/* Placeholder badge circles */}
                    {[1, 2, 3].map((badge) => (
                        <Box
                            key={badge}
                            sx={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                bgcolor: '#F5F5F5',
                                border: '2px solid #E0E0E0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <BadgeStarIcon />
                        </Box>
                    ))}
                    <Typography
                        sx={{
                            fontSize: '13px',
                            fontWeight: 500,
                            fontFamily: productSans,
                            color: '#9E9E9E',
                            cursor: 'pointer',
                            '&:hover': { color: '#4167F2' },
                        }}
                    >
                        View more
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ProfileOverviewDesktop;
