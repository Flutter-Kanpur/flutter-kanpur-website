'use client';

import React, { useState } from 'react';
import { Box, Typography, Chip, useMediaQuery, Modal, Fade, Backdrop } from '@mui/material';
import { useRouter } from 'next/navigation';

const ActiveContributorDashboard = ({ data = {} }) => {
    const router = useRouter();
    const isStrictMobile = useMediaQuery('(max-width:425px)');
    const outfitFont = 'var(--font-product-sans)';
    const [helpModalOpen, setHelpModalOpen] = useState(false);


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


            <Typography
                onClick={() => setHelpModalOpen(true)}
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


            <Modal
                open={helpModalOpen}
                onClose={() => setHelpModalOpen(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        },
                    },
                }}
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                }}
            >
                <Fade in={helpModalOpen}>
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: { xs: '100%', sm: '480px' },
                            bgcolor: '#fff',
                            borderRadius: '24px 24px 0 0',
                            px: 3,
                            pt: 1.5,
                            pb: 4,
                            outline: 'none',
                            boxShadow: '0px -4px 20px rgba(0,0,0,0.1)',
                        }}
                    >

                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <Box
                                sx={{
                                    width: '40px',
                                    height: '5px',
                                    borderRadius: '4px',
                                    bgcolor: '#1a1a1a',
                                }}
                            />
                        </Box>

                        <Box
                            onClick={() => {
                                setHelpModalOpen(false);
                                router.push('/profile/communityrules');
                            }}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                py: 2,
                                cursor: 'pointer',
                                '&:hover': { bgcolor: '#F9FAFB', borderRadius: '12px', mx: -1.5, px: 1.5 },
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4.5C7.305 4.5 3.475 7.637 2.5 12c.975 4.363 4.805 7.5 9.5 7.5s8.525-3.137 9.5-7.5c-.975-4.363-4.805-7.5-9.5-7.5zM12 17c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" fill="#1a1a1a" />
                            </svg>
                            <Typography
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    fontFamily: outfitFont,
                                    color: '#1a1a1a',
                                }}
                            >
                                View contributor guidelines
                            </Typography>
                        </Box>

                        <Box
                            onClick={() => {
                                setHelpModalOpen(false);
                            }}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                py: 2,
                                cursor: 'pointer',
                                '&:hover': { bgcolor: '#F9FAFB', borderRadius: '12px', mx: -1.5, px: 1.5 },
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" fill="#1a1a1a" />
                            </svg>
                            <Typography
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    fontFamily: outfitFont,
                                    color: '#1a1a1a',
                                }}
                            >
                                Report an issue
                            </Typography>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default ActiveContributorDashboard;
