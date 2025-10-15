
import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import styles from '../buttons/shimmerButton/shimmer.module.css';
import ApplyNowButton from '../buttons/ApplyNowButton';

const ContactUs = ({ contactUsData, setcontactUsData, onClick }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                gap: "30px",
                width: "100%"
            }}>
            {/* Left Container - Contact Info */}
            <Box
                className={styles.shimmerCard}
                sx={{
                    flex: "0 0 35%",
                    padding: "40px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    position: "relative",
                    background: "linear-gradient(180deg, #182936 0%, #0C1217 100%)"
                }}>
                <Box
                    sx={{
                        marginBottom: "16px",
                        fontFamily: "Encode Sans, sans-serif",
                        lineHeight: "1.2"
                    }}>
                    <Box
                        sx={{
                            fontSize: "45px",
                            fontWeight: "700",
                            fontFamily: "Encode Sans, sans-serif",
                            lineHeight: "60px",
                            letterSpacing: "0px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                        }}>
                        {/* First line: Don't be shy, */}
                        <Box
                            sx={{ display: "flex", gap: "8px" }}>
                            <span style={{
                                background: "linear-gradient(180deg, #FFFFFF 0%, #67B0E4 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text"
                            }}>
                                Don't
                            </span>
                            <span
                                style={{
                                    background: "linear-gradient(180deg, #FFFFFF 0%, #67B0E4 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text"
                                }}>
                                be
                            </span>
                            <span
                                style={{
                                    background: "linear-gradient(180deg, #FFFFFF 0%, #67B0E4 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text"
                                }}>
                                shy,
                            </span>
                        </Box>

                        {/* Second line: just say hi. */}
                        <Box
                            sx={{ display: "flex", gap: "8px" }}>
                            <span style={{
                                background: "linear-gradient(180deg, #FFFFFF 0%, #67B0E4 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text"
                            }}>
                                just
                            </span>
                            <span
                                style={{
                                    background: "linear-gradient(180deg, #FFFFFF 0%, #67B0E4 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text"
                                }}>
                                say
                            </span>
                            <span
                                style={{
                                    background: "linear-gradient(180deg, #FFFFFF 0%, #67B0E4 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text"
                                }}>
                                hi.
                            </span>
                        </Box>
                    </Box>
                </Box>

                <Typography
                    sx={{
                        fontSize: "16px",
                        color: "#E5E8EC",
                        fontFamily: "Encode Sans, sans-serif"
                    }}
                >
                    Flutterkanpur@gmail.com
                </Typography>
            </Box>

            {/* Right Container - Contact Form */}
            <Box sx={{
                flex: "0 0 65%",
                background: "#0C1217",
                borderRadius: "12px",
                padding: "40px",
                border: "1px solid rgba(255,255,255,0.1)"
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px"
                }}>
                    <TextField
                        onChange={(e) => setcontactUsData({ ...contactUsData, name: e.target.value })}
                        type='text'
                        label="Full Name"
                        variant="standard"
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: '500'
                            },
                            '& .MuiInput-root': {
                                color: '#FFFFFF',
                                fontSize: '16px',
                                '&:before': {
                                    borderBottom: '1px solid rgba(255,255,255,0.3)'
                                },
                                '&:after': {
                                    borderBottom: '1px solid #FFFFFF'
                                },
                                '&:hover:not(.Mui-disabled):before': {
                                    borderBottom: '1px solid rgba(255,255,255,0.5)'
                                }
                            }
                        }}
                    />

                    <TextField
                        onChange={(e) => setcontactUsData({ ...contactUsData, email: e.target.value })}
                        type='email'
                        label="E-mail (Optional)"
                        variant="standard"
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: '500'
                            },
                            '& .MuiInput-root': {
                                color: '#FFFFFF',
                                fontSize: '16px',
                                '&:before': {
                                    borderBottom: '1px solid rgba(255,255,255,0.3)'
                                },
                                '&:after': {
                                    borderBottom: '1px solid #FFFFFF'
                                },
                                '&:hover:not(.Mui-disabled):before': {
                                    borderBottom: '1px solid rgba(255,255,255,0.5)'
                                }
                            }
                        }}
                    />

                    <TextField
                        onChange={(e) => setcontactUsData({ ...contactUsData, message: e.target.value })}
                        label="Message"
                        variant="standard"
                        multiline
                        rows={3}
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: '500'
                            },
                            '& .MuiInput-root': {
                                color: '#FFFFFF',
                                fontSize: '16px',
                                '&:before': {
                                    borderBottom: '1px solid rgba(255,255,255,0.3)'
                                },
                                '&:after': {
                                    borderBottom: '1px solid #FFFFFF'
                                },
                                '&:hover:not(.Mui-disabled):before': {
                                    borderBottom: '1px solid rgba(255,255,255,0.5)'
                                }
                            }
                        }}
                    />

                    <TextField
                        onChange={(e) => setcontactUsData({ ...contactUsData, phone: e.target.value })}
                        type='number'
                        label="Phone"
                        variant="standard"
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: '500'
                            },
                            '& .MuiInput-root': {
                                color: '#FFFFFF',
                                fontSize: '16px',
                                '&:before': {
                                    borderBottom: '1px solid rgba(255,255,255,0.3)'
                                },
                                '&:after': {
                                    borderBottom: '1px solid #FFFFFF'
                                },
                                '&:hover:not(.Mui-disabled):before': {
                                    borderBottom: '1px solid rgba(255,255,255,0.5)'
                                }
                            }
                        }}
                    />

                    <Box sx={{ marginTop: "16px", display: "flex", justifyContent: "flex-start" }}>
                        <ApplyNowButton
                            disabled={false}
                            onClick={onClick}
                            text="SUBMIT"
                            width="120px"
                            height="44px"
                            fontSize="14px"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ContactUs
