import { Box, Typography } from '@mui/material';
import React from 'react';
import styles from '../buttons/shimmerButton/shimmer.module.css';

const AboutUs = () => {
    return (
        <Box sx={{
            width: "100%",
            // background: "#010A10",
            padding: "80px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Box sx={{
                width: "100%",
                maxWidth: "1200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
            }}>
                {/* About Us Heading */}
                <Typography
                    sx={{
                        fontSize: { xs: "28px", md: "36px" },
                        fontWeight: "700",
                        color: "#FFFFFF",
                        textAlign: "left",
                        marginBottom: "60px",
                        fontFamily: "Encode Sans, sans-serif",
                        lineHeight: "1.2"
                    }}
                >
                    Overview
                </Typography>

                {/* Mission and Vision Sections */}
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                    width: "100%"
                }}>
                    {/* Mission Section */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "24px",
                        alignItems: "flex-start"
                    }}>
                        {/* Mission Icon */}
                        <Box sx={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #37ABFF, #7AFFFF)",
                            border: "1px solid #37ABFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                        }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
                                <circle cx="12" cy="12" r="3" fill="white" />
                                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="white" />
                            </svg>
                        </Box>

                        {/* Mission Content */}
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                sx={{
                                    fontSize: "22px",
                                    fontWeight: "600",
                                    color: "#E6F9FF",
                                    marginBottom: "20px",
                                    fontFamily: "Encode Sans, sans-serif"
                                }}
                            >
                                Mission
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    color: "#FFFFFF",
                                    lineHeight: "1.7",
                                    fontFamily: "Encode Sans, sans-serif"
                                }}
                            >
                                Our mission is to empower individuals by providing them with the resources, mentorship, and opportunities they need to excel in the world of Flutter development and design. We strive to create an environment where curiosity is encouraged, skills are nurtured, and every member feels supported in their creative and professional journey.
                            </Typography>
                        </Box>
                    </Box>

                    {/* Vision Section */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "24px",
                        alignItems: "flex-start"
                    }}>
                        {/* Vision Icon */}
                        <Box sx={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #37ABFF, #7AFFFF)",
                            border: "1px solid #37ABFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                        }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="white" strokeWidth="2" fill="none" />
                                <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" fill="none" />
                            </svg>
                        </Box>

                        {/* Vision Content */}
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                sx={{
                                    fontSize: "22px",
                                    fontWeight: "600",
                                    color: "#E6F9FF",
                                    marginBottom: "20px",
                                    fontFamily: "Encode Sans, sans-serif"
                                }}
                            >
                                Vision
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    color: "#FFFFFF",
                                    lineHeight: "1.7",
                                    fontFamily: "Encode Sans, sans-serif"
                                }}
                            >
                                We envision Flutter Kanpur as a leading community where innovation meets collaboration. Our goal is to build a thriving ecosystem where developers and designers come together to push the boundaries of what's possible with Flutter. By fostering a culture of creativity, inclusivity, and excellence, we aspire to become a global hub for learning, sharing, and building groundbreaking digital experiences.
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Flutter Kanpur Community Section with Shimmer Background */}
                <Box sx={{
                    marginTop: "80px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Box className={styles.shimmerCard} sx={{
                        width: "100%",
                        maxWidth: "1200px",
                        padding: "40px",
                        textAlign: "left",
                        position: "relative"
                    }}>
                        {/* About Us Label */}
                        <Box sx={{
                            background: 'transparent',
                            border: '1px solid #2E3942',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            marginBottom: '20px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#FFFFFF',
                            fontFamily: 'Encode Sans, sans-serif',
                            display: 'inline-block'
                        }}>
                            About Us
                        </Box>

                        {/* Main Heading */}
                        <Typography
                            sx={{
                                fontSize: { xs: "28px", md: "32px" },
                                fontWeight: "700",
                                color: "#FFFFFF",
                                textAlign: "center",
                                marginBottom: "24px",
                                fontFamily: "Encode Sans, sans-serif",
                                lineHeight: "1.2"
                            }}
                        >
                            Flutter Kanpur Community
                        </Typography>

                        {/* Description Paragraphs */}
                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: "400",
                                color: "#E5E8EC",
                                lineHeight: "1.7",
                                fontFamily: "Encode Sans, sans-serif",
                                marginBottom: "20px"
                            }}
                        >
                            Flutter Kanpur is a vibrant community of developers, designers, and tech enthusiasts driven by creativity and innovation. We collaborate, learn, and grow through workshops, hackathons, and shared knowledge — building a space where ideas turn into reality.
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: "600",
                                color: "#FFFFFF",
                                lineHeight: "1.6",
                                fontFamily: "Encode Sans, sans-serif"
                            }}
                        >
                            Join us and be part of something extraordinary!
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AboutUs; 