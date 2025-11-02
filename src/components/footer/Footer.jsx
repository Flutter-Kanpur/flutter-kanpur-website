'use client';

import { Box, Typography, Button, Link } from '@mui/material';
import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <Box sx={{ width: '100%' }}>
            {/* Top Section - Black Background */}
            <Box sx={{
                background: "#000000",
                padding: { xs: "60px 20px", md: "80px 40px", lg: "80px 120px" },
                display: "flex",
                flexDirection: "column",
                gap: "40px"
            }}>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
                    gap: { xs: "40px", md: "60px" },
                    maxWidth: "1400px",
                    margin: "0 auto",
                    width: "100%"
                }}>
                    {/* Left Column - Branding */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}>
                        {/* Flutter Logo */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <Image 
                                src="/landingPageIcons/flutter_icon.svg" 
                                height={40} 
                                width={40} 
                                alt="Flutter Logo"
                            />
                        </Box>
                        
                        {/* Slogan */}
                        <Typography
                            sx={{
                                fontSize: { xs: "20px", md: "24px", lg: "28px" },
                                fontWeight: 600,
                                color: "#FFFFFF",
                                fontFamily: "Encode Sans, sans-serif",
                                lineHeight: 1.3,
                                maxWidth: "300px"
                            }}
                        >
                            We growing up your business with personal AI manager.
                        </Typography>
                        
                        {/* Community Text */}
                        <Typography
                            sx={{
                                fontSize: "14px",
                                color: "#FFFFFF",
                                fontFamily: "Encode Sans, sans-serif",
                                opacity: 0.8,
                                marginTop: "8px"
                            }}
                        >
                            Flutter Kanpur Community, 2025
                        </Typography>
                    </Box>

                    {/* Second Column - Quick Links */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px"
                    }}>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: 600,
                                color: "#FFFFFF",
                                fontFamily: "Encode Sans, sans-serif",
                                marginBottom: "8px"
                            }}
                        >
                            Quick Links
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {["Jobs", "Blogs", "Members"].map((link) => (
                                <Link
                                    key={link}
                                    href="#"
                                    sx={{
                                        fontSize: "16px",
                                        color: "#FFFFFF",
                                        fontFamily: "Encode Sans, sans-serif",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        opacity: 0.9,
                                        '&:hover': {
                                            opacity: 1,
                                            textDecoration: "underline"
                                        }
                                    }}
                                >
                                    {link}
                                </Link>
                            ))}
                        </Box>
                    </Box>

                    {/* Third Column - Company */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px"
                    }}>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: 600,
                                color: "#FFFFFF",
                                fontFamily: "Encode Sans, sans-serif",
                                marginBottom: "8px"
                            }}
                        >
                            Company
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {["Blog", "Careers", "News"].map((link) => (
                                <Link
                                    key={link}
                                    href="#"
                                    sx={{
                                        fontSize: "16px",
                                        color: "#FFFFFF",
                                        fontFamily: "Encode Sans, sans-serif",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        opacity: 0.9,
                                        '&:hover': {
                                            opacity: 1,
                                            textDecoration: "underline"
                                        }
                                    }}
                                >
                                    {link}
                                </Link>
                            ))}
                        </Box>
                    </Box>

                    {/* Fourth Column - Resources & Get the App */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px"
                    }}>
                        {/* Resources */}
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    color: "#FFFFFF",
                                    fontFamily: "Encode Sans, sans-serif",
                                    marginBottom: "8px"
                                }}
                            >
                                Resources
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                {["Documentation", "Papers", "Press Conferences"].map((link) => (
                                    <Link
                                        key={link}
                                        href="#"
                                        sx={{
                                            fontSize: "16px",
                                            color: "#FFFFFF",
                                            fontFamily: "Encode Sans, sans-serif",
                                            textDecoration: "none",
                                            cursor: "pointer",
                                            opacity: 0.9,
                                            '&:hover': {
                                                opacity: 1,
                                                textDecoration: "underline"
                                            }
                                        }}
                                    >
                                        {link}
                                    </Link>
                                ))}
                            </Box>
                        </Box>

                        {/* Get the App */}
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    color: "#FFFFFF",
                                    fontFamily: "Encode Sans, sans-serif",
                                    marginBottom: "16px"
                                }}
                            >
                                Get the app
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                {/* Windows Button */}
                                <Button
                                    variant="outlined"
                                    sx={{
                                        border: "1px solid #FFFFFF",
                                        color: "#FFFFFF",
                                        borderRadius: "8px",
                                        padding: "12px 20px",
                                        fontSize: "16px",
                                        fontWeight: 500,
                                        textTransform: "none",
                                        fontFamily: "Encode Sans, sans-serif",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        justifyContent: "flex-start",
                                        width: "fit-content",
                                        minWidth: "160px",
                                        '&:hover': {
                                            border: "1px solid #FFFFFF",
                                            background: "rgba(255, 255, 255, 0.1)"
                                        }
                                    }}
                                >
                                    {/* Windows Logo Icon */}
                                    <Box sx={{
                                        width: "20px",
                                        height: "20px",
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "2px"
                                    }}>
                                        <Box sx={{ width: "8px", height: "8px", background: "#FFFFFF" }} />
                                        <Box sx={{ width: "8px", height: "8px", background: "#FFFFFF" }} />
                                        <Box sx={{ width: "8px", height: "8px", background: "#FFFFFF" }} />
                                        <Box sx={{ width: "8px", height: "8px", background: "#FFFFFF" }} />
                                    </Box>
                                    Windows
                                </Button>

                                {/* macOS Button */}
                                <Button
                                    variant="outlined"
                                    sx={{
                                        border: "1px solid #FFFFFF",
                                        color: "#FFFFFF",
                                        borderRadius: "8px",
                                        padding: "12px 20px",
                                        fontSize: "16px",
                                        fontWeight: 500,
                                        textTransform: "none",
                                        fontFamily: "Encode Sans, sans-serif",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        justifyContent: "flex-start",
                                        width: "fit-content",
                                        minWidth: "160px",
                                        '&:hover': {
                                            border: "1px solid #FFFFFF",
                                            background: "rgba(255, 255, 255, 0.1)"
                                        }
                                    }}
                                >
                                    {/* Apple Logo Icon */}
                                    <Box sx={{
                                        width: "20px",
                                        height: "20px",
                                        position: "relative"
                                    }}>
                                        <Box sx={{
                                            width: "12px",
                                            height: "14px",
                                            border: "2px solid #FFFFFF",
                                            borderRadius: "2px 2px 6px 6px",
                                            position: "absolute",
                                            top: "2px",
                                            left: "50%",
                                            transform: "translateX(-50%)"
                                        }} />
                                        <Box sx={{
                                            width: "6px",
                                            height: "6px",
                                            border: "1.5px solid #FFFFFF",
                                            borderRadius: "50%",
                                            position: "absolute",
                                            top: "-2px",
                                            left: "50%",
                                            transform: "translateX(-50%)"
                                        }} />
                                    </Box>
                                    macOS
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Bottom Section - Light Blue Background */}
            <Box sx={{
                background: "#00BFFF", // Bright cyan blue background
                padding: { xs: "20px", md: "24px 40px", lg: "24px 120px" },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "center", md: "center" },
                gap: { xs: "16px", md: "20px" },
                maxWidth: "100%"
            }}>
                {/* Left - Copyright */}
                <Typography
                    sx={{
                        fontSize: { xs: "14px", md: "16px" },
                        color: "#FFFFFF",
                        fontFamily: "Encode Sans, sans-serif",
                        textAlign: { xs: "center", md: "left" }
                    }}
                >
                    © 2025 Flutter Kanpur Inc. All rights reserved.
                </Typography>

                {/* Right - Links */}
                <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: { xs: "8px", sm: "20px" },
                    alignItems: "center"
                }}>
                    {["Terms of Service", "Privacy Policy", "Cookies"].map((link) => (
                        <Link
                            key={link}
                            href="#"
                            sx={{
                                fontSize: { xs: "14px", md: "16px" },
                                color: "#FFFFFF",
                                fontFamily: "Encode Sans, sans-serif",
                                textDecoration: "none",
                                cursor: "pointer",
                                '&:hover': {
                                    textDecoration: "underline",
                                    opacity: 0.9
                                }
                            }}
                        >
                            {link}
                        </Link>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;