'use client';

import React from 'react';
import { Box, Typography, Chip, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';

const ActiveContributorDashboard = ({ data = {} }) => {
    const router = useRouter();
    const isStrictMobile = useMediaQuery('(max-width:425px)');
    const outfitFont = 'var(--font-product-sans)';

    // Format the createdAt date
    const getContributorSince = () => {
        if (data.createdAt) {
            try {
                const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
                return `Contributor since ${date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
            } catch {
                return 'Active Contributor';
            }
        }
        return 'Active Contributor';
    };

    const actionCards = [
        {
            title: 'View blogs',
            description: 'Read and manage community blog posts',
            onClick: () => router.push('/bloglisting'),
        },
        {
            title: 'View projects',
            description: 'Browse community projects and contributions',
            onClick: () => router.push('/communityPage'),
        },
    ];

    return (
        <Box sx={{
            px: 3,
            pt: 2,
            pb: 12,
            ml: { xs: 0, md: '280px' },
            maxWidth: { md: 'calc(100% - 280px)' },
        }}>

            {/* Active Contributor Badge */}
            <Chip
                label="Active Contributor"
                sx={{
                    bgcolor: '#DCFCE7',
                    color: '#166534',
                    fontWeight: 600,
                    fontSize: '13px',
                    fontFamily: outfitFont,
                    borderRadius: '20px',
                    mb: 2,
                    height: '28px'
                }}
            />

            {/* Greeting */}
            <Typography
                variant="h5"
                sx={{ fontWeight: 700, fontFamily: outfitFont, color: '#000', mb: 0.5 }}
            >
                Hi {data.fullName || 'Contributor'},
            </Typography>

            <Typography sx={{ color: '#757575', fontSize: '15px', fontFamily: outfitFont, mb: 0.5 }}>
                {data.currentRole ? `${data.currentRole} Contributor` : 'Community Contributor'}
            </Typography>

            <Typography sx={{ color: '#9e9e9e', fontSize: '14px', fontFamily: outfitFont, mb: 4 }}>
                {getContributorSince()}
            </Typography>

            {/* Action Cards Section */}
            <Typography sx={{ fontWeight: 600, fontSize: '16px', fontFamily: outfitFont, mb: 2, color: '#1a1a1a' }}>
                Here's what you can do
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 5 }}>
                {actionCards.map((card, index) => (
                    <Box
                        key={index}
                        onClick={card.onClick}
                        sx={{
                            flex: 1,
                            p: 2.5,
                            borderRadius: '20px',
                            border: '1px solid #E0E0E0',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                borderColor: '#4167F2',
                                boxShadow: '0px 4px 12px rgba(65, 103, 242, 0.1)',
                                transform: 'translateY(-2px)',
                            }
                        }}
                    >
                        {/* Icon circle */}
                        <Box sx={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            border: '2px solid #4167F2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2
                        }}>
                            <Typography sx={{ color: '#4167F2', fontSize: '18px', fontWeight: 700 }}>&lt;/&gt;</Typography>
                        </Box>

                        <Typography sx={{ fontWeight: 600, fontSize: '15px', fontFamily: outfitFont, mb: 0.5, color: '#1a1a1a' }}>
                            {card.title}
                        </Typography>
                        <Typography sx={{ fontSize: '13px', color: '#9e9e9e', fontFamily: outfitFont, lineHeight: 1.4 }}>
                            {card.description}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Contribution Summary */}
            <Typography sx={{ fontWeight: 600, fontSize: '16px', fontFamily: outfitFont, mb: 2, color: '#1a1a1a' }}>
                Your contribution summary
            </Typography>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                p: 3,
                borderRadius: '20px',
                border: '1px solid #E0E0E0',
                mb: 4,
            }}>
                {[
                    { value: '06', label: 'Task Completed' },
                    { value: '40%', label: 'Events contributed' },
                    { value: '24', label: 'Active tasks' },
                ].map((stat, index) => (
                    <Box key={index} sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '24px', fontFamily: outfitFont, color: '#1a1a1a' }}>
                            {stat.value}
                        </Typography>
                        <Typography sx={{ fontSize: '12px', color: '#9e9e9e', fontFamily: outfitFont }}>
                            {stat.label}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Need help link */}
            <Typography
                onClick={() => { }}
                sx={{
                    color: '#4167F2',
                    fontWeight: 600,
                    fontSize: '15px',
                    cursor: 'pointer',
                    fontFamily: outfitFont,
                    '&:hover': { textDecoration: 'underline' }
                }}
            >
                Need help?
            </Typography>
        </Box>
    );
};

export default ActiveContributorDashboard;
