'use client';

import { Box, Typography, Button } from '@mui/material';
import React from 'react';

const MobileAppDownload = () => {
    return (
            <Box sx={{
                background: "#010A10",
                padding: { xs: "80px 20px", lg: "80px 120px" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
            {/* Desktop Version */}
            <Box sx={{ 
                width: "100%", 
                maxWidth: "1200px",
                display: { xs: "none", lg: "flex" },
                flexDirection: "row",
                gap: "60px",
                alignItems: "center"
            }}>
                {/* Left Section - App Download Information */}
                <Box sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px"
                }}>
                    {/* Heading Section */}
                    <Box>
                        <Typography
                            sx={{
                                fontSize: { xs: "32px", md: "56px" },
                                fontWeight: 800,
                                color: "#FFFFFF",
                                fontFamily: "Encode Sans, sans-serif",
                                lineHeight: 1.15,
                                letterSpacing: "-0.01em",
                                marginBottom: "16px"
                            }}
                        >
                            Download Our Mobile App
                        </Typography>
                        
                        <Typography
                            sx={{
                                fontSize: "18px",
                                color: "#E5E8EC",
                                fontFamily: "Encode Sans, sans-serif",
                                lineHeight: "1.5"
                            }}
                        >
                            For the best experience, access all features in our official app.
                        </Typography>
                    </Box>

                    {/* Download Options */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: "30px",
                        alignItems: "center"
                    }}>
                        {/* QR Code Section */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "16px"
                        }}>
                            <Box sx={{
                                width: "120px",
                                height: "120px",
                                background: "#FFFFFF",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                {/* QR Code Placeholder */}
                                <Box sx={{
                                    width: "100px",
                                    height: "100px",
                                    background: "linear-gradient(45deg, #000000 25%, transparent 25%), linear-gradient(-45deg, #000000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000000 75%), linear-gradient(-45deg, transparent 75%, #000000 75%)",
                                    backgroundSize: "20px 20px",
                                    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
                                }} />
                            </Box>
                            
                            <Button
                                variant="contained"
                                sx={{
                                    background: "#37ABFF",
                                    color: "#FFFFFF",
                                    borderRadius: "8px",
                                    padding: "10px 20px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textTransform: "none",
                                    '&:hover': {
                                        background: "#2A8FDD"
                                    }
                                }}
                            >
                                Scan to install
                            </Button>
                        </Box>

                        {/* OR Separator */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "12px"
                        }}>
                            <Box sx={{
                                width: "1px",
                                height: "40px",
                                background: "rgba(255,255,255,0.3)"
                            }} />
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#FFFFFF",
                                    fontFamily: "Encode Sans, sans-serif",
                                    fontWeight: "500"
                                }}
                            >
                                OR
                            </Typography>
                            <Box sx={{
                                width: "1px",
                                height: "40px",
                                background: "rgba(255,255,255,0.3)"
                            }} />
                        </Box>

                        {/* Google Play Section */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "16px"
                        }}>
                            <Box sx={{
                                width: "120px",
                                height: "120px",
                                background: "#FFFFFF",
                                borderRadius: "12px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px"
                            }}>
                                {/* Google Play Logo */}
                                <Box sx={{
                                    width: "40px",
                                    height: "40px",
                                    background: "linear-gradient(45deg, #4285F4, #34A853, #FBBC05, #EA4335)",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Box sx={{
                                        width: "0",
                                        height: "0",
                                        borderLeft: "8px solid #FFFFFF",
                                        borderTop: "6px solid transparent",
                                        borderBottom: "6px solid transparent"
                                    }} />
                                </Box>
                                
                                <Typography
                                    sx={{
                                        fontSize: "12px",
                                        color: "#000000",
                                        fontFamily: "Encode Sans, sans-serif",
                                        fontWeight: "600"
                                    }}
                                >
                                    Google Play
                                </Typography>
                            </Box>
                            
                            <Button
                                variant="contained"
                                sx={{
                                    background: "#37ABFF",
                                    color: "#FFFFFF",
                                    borderRadius: "8px",
                                    padding: "10px 20px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textTransform: "none",
                                    '&:hover': {
                                        background: "#2A8FDD"
                                    }
                                }}
                            >
                                Search by name
                            </Button>
                        </Box>
                    </Box>

                    {/* Bottom Text */}
                    <Typography
                        sx={{
                            fontSize: "18px",
                            color: "#FFFFFF",
                            fontFamily: "Encode Sans, sans-serif",
                            lineHeight: "1.6",
                            maxWidth: "500px"
                        }}
                    >
                        Our mobile app is faster, smoother, and packed with exclusive features just for you.
                    </Typography>
                </Box>

                {/* Right Section - Smartphone Mockup */}
                <Box sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Box sx={{
                        position: "relative",
                        transform: "rotateY(-15deg) rotateX(5deg)"
                    }}>
                        <img
                            src="/assets/phone_mockup.png"
                            alt="Mobile App Mockup"
                            style={{
                                width: "800px",
                                height: "auto",
                                maxWidth: "100%"
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Mobile/Tablet Version */}
            <Box sx={{ 
                width: "100%", 
                maxWidth: "1200px",
                display: { xs: "flex", lg: "none" },
                flexDirection: "column",
                alignItems: "center",
                gap: "40px"
            }}>
                {/* Mobile Mockup Image */}
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Box sx={{
                        position: "relative",
                        transform: "rotateY(-15deg) rotateX(5deg)"
                    }}>
                        <img
                            src="/assets/phone_mockup.png"
                            alt="Mobile App Mockup"
                            style={{
                                width: "300px",
                                height: "auto",
                                maxWidth: "100%"
                            }}
                        />
                    </Box>
                </Box>

                {/* Download Section */}
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "30px",
                    textAlign: "center"
                }}>
                    {/* Heading */}
                    <Box>
                        <Typography
                            sx={{
                                fontSize: { xs: "28px", sm: "36px" },
                                fontWeight: 800,
                                color: "#FFFFFF",
                                fontFamily: "Encode Sans, sans-serif",
                                lineHeight: 1.15,
                                letterSpacing: "-0.01em",
                                marginBottom: "16px"
                            }}
                        >
                            Download Our Mobile App
                        </Typography>
                        
                        <Typography
                            sx={{
                                fontSize: "18px",
                                color: "#E5E8EC",
                                fontFamily: "Encode Sans, sans-serif",
                                lineHeight: "1.5",
                                maxWidth: "500px"
                            }}
                        >
                            For the best experience, access all features in our official app.
                        </Typography>
                    </Box>

                    {/* Download Options */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: "30px",
                        alignItems: "center"
                    }}>
                        {/* QR Code Section */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "16px"
                        }}>
                            <Box sx={{
                                width: "120px",
                                height: "120px",
                                background: "#FFFFFF",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                {/* QR Code Placeholder */}
                                <Box sx={{
                                    width: "100px",
                                    height: "100px",
                                    background: "linear-gradient(45deg, #000000 25%, transparent 25%), linear-gradient(-45deg, #000000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000000 75%), linear-gradient(-45deg, transparent 75%, #000000 75%)",
                                    backgroundSize: "20px 20px",
                                    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
                                }} />
                            </Box>
                            
                            <Button
                                variant="contained"
                                sx={{
                                    background: "#37ABFF",
                                    color: "#FFFFFF",
                                    borderRadius: "8px",
                                    padding: "10px 20px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textTransform: "none",
                                    '&:hover': {
                                        background: "#2A8FDD"
                                    }
                                }}
                            >
                                Scan to install
                            </Button>
                        </Box>

                        {/* OR Separator */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "12px"
                        }}>
                            <Box sx={{
                                width: "1px",
                                height: "40px",
                                background: "rgba(255,255,255,0.3)"
                            }} />
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#FFFFFF",
                                    fontFamily: "Encode Sans, sans-serif",
                                    fontWeight: "500"
                                }}
                            >
                                OR
                            </Typography>
                            <Box sx={{
                                width: "1px",
                                height: "40px",
                                background: "rgba(255,255,255,0.3)"
                            }} />
                        </Box>

                        {/* Google Play Section */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "16px"
                        }}>
                            <Box sx={{
                                width: "120px",
                                height: "120px",
                                background: "#FFFFFF",
                                borderRadius: "12px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px"
                            }}>
                                {/* Google Play Logo */}
                                <Box sx={{
                                    width: "40px",
                                    height: "40px",
                                    background: "linear-gradient(45deg, #4285F4, #34A853, #FBBC05, #EA4335)",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Box sx={{
                                        width: "0",
                                        height: "0",
                                        borderLeft: "8px solid #FFFFFF",
                                        borderTop: "6px solid transparent",
                                        borderBottom: "6px solid transparent"
                                    }} />
                                </Box>
                                
                                <Typography
                                    sx={{
                                        fontSize: "12px",
                                        color: "#000000",
                                        fontFamily: "Encode Sans, sans-serif",
                                        fontWeight: "600"
                                    }}
                                >
                                    Google Play
                                </Typography>
                            </Box>
                            
                            <Button
                                variant="contained"
                                sx={{
                                    background: "#37ABFF",
                                    color: "#FFFFFF",
                                    borderRadius: "8px",
                                    padding: "10px 20px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textTransform: "none",
                                    '&:hover': {
                                        background: "#2A8FDD"
                                    }
                                }}
                            >
                                Search by name
                            </Button>
                        </Box>
                    </Box>

                    {/* Bottom Text */}
                    <Typography
                        sx={{
                            fontSize: "18px",
                            color: "#FFFFFF",
                            fontFamily: "Encode Sans, sans-serif",
                            lineHeight: "1.6",
                            maxWidth: "500px"
                        }}
                    >
                        Our mobile app is faster, smoother, and packed with exclusive features just for you.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default MobileAppDownload;