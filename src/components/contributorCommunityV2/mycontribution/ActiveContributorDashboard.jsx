'use client';

import React, { useState } from 'react';
import { Box, Typography, Chip, useMediaQuery, Modal, Fade, Backdrop } from '@mui/material';
import { useRouter } from 'next/navigation';
import { SvgIcon } from '@mui/material';

const CodeIconSvg = () => (
    <SvgIcon {...props} viewBox="0 0 20 20" sx={{ ...props.sx, width: 20, height: 20 }}>
    <image 
      href="/assets/contributionIcons/codeicon.svg" 
      height="100%" 
      width="100%" 
    />
  </SvgIcon>
);

const ActiveContributorDashboard = ({ data = {} }) => {
    const router = useRouter();
    const isStrictMobile = useMediaQuery('(max-width:426px)');
    const productSans = 'var(--font-product-sans)';
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
            pt: 5,
            pb: 12,
            ml: { xs: 0, md: '280px' },
            maxWidth: { md: 'calc(100% - 280px)' },
        }}>


            <Chip
                label="Active Contributor"
                sx={{
                    bgcolor: '#DCFCE7',
                    color: '#006748',
                    fontWeight: 500,
                    fontSize: '15px',
                    fontFamily: productSans,
                    borderRadius: '20px',
                    mb: 2,
                    height: '30px'
                }}
            />


            <Typography
                variant="h4"
                sx={{ fontWeight: 400, fontFamily: productSans, color: '#000', mb: 0.5 }}
            >
                Hi {data.fullName || 'Contributor'},
            </Typography>

            <Typography sx={{ color: '#6D6D6D', fontSize: '16px', fontFamily: productSans, mt: 1.5 }}>
                {data.currentRole ? `${data.currentRole} Contributor` : 'Community Contributor'}
            </Typography>

            <Typography sx={{ color: '#6D6D6D', fontSize: '16px', fontFamily: productSans, mb: 4 }}>
                {getContributorSince()}
            </Typography>


            <Typography sx={{ fontWeight: 500, fontSize: '16px', fontFamily: productSans, mb: 2, color: '#1a1a1a' }}>
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
                            backgroundColor: 'rgba(65, 103, 242, 0.05)',
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
                            border: '1px solid #4167F2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                            backgroundColor: 'white'
                        }}>
                            <CodeIconSvg />
                        </Box>

                        <Typography sx={{ fontWeight: 500, fontSize: '15px', fontFamily: productSans, mb: 0.5, color: '#000000' }}>
                            {card.title}
                        </Typography>
                        <Typography sx={{ fontSize: '14px', color: '#6D6D6D', fontFamily: productSans, lineHeight: 1.4 }}>
                            {card.description}
                        </Typography>
                    </Box>
                ))}
            </Box>


            <Typography sx={{ fontWeight: 500, fontSize: '16px', fontFamily: productSans, mb: 2, color: '#1a1a1a' }}>
                Your contribution summary
            </Typography>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                p: 1.2,
                borderRadius: '20px',
                border: '1px solid #E0E0E0',
                mb: 4,
                boxShadow: 'inset 0px 0px 10px rgba(35, 115, 226, 0.15)',
            }}>
                {[
                    { value: '06', label: 'Task Completed' },
                    { value: '40%', label: 'Events contributed' },
                    { value: '24', label: 'Active tasks' },
                ].map((stat, index) => (
                    <Box key={index} sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 400, fontSize: '28px', fontFamily: productSans, color: '#1a1a1a' }}>
                            {stat.value}
                        </Typography>
                        <Typography sx={{ fontSize: '10px', color: '#6D6D6D', fontFamily: productSans, fontWeight: 400 }}>
                            {stat.label}
                        </Typography>
                    </Box>
                ))}
            </Box>


            <Typography
                onClick={() => setHelpModalOpen(true)}
                sx={{
                    color: '#4167F2',
                    fontWeight: 500,
                    fontSize: '15px',
                    cursor: 'pointer',
                    fontFamily: productSans,
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
                            <SvgIcon {...props} viewBox="0 0 24 24" sx={{ ...props.sx, width: 22, height: 22 }}>
    <image 
      href="/assets/contributionIcons/eye.svg" 
      height="100%" 
      width="100%" 
    />
  </SvgIcon>
                            <Typography
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    fontFamily: productSans,
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
                           <SvgIcon {...props} viewBox="0 0 24 24" sx={{ ...props.sx, width: 22, height: 22 }}>
    <image 
      href="/assets/contributionIcons/problem.svg" 
      height="100%" 
      width="100%" 
    />
  </SvgIcon>
                            <Typography
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    fontFamily: productSans,
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
