'use client';

import { Box, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import ContactUs from './ContactUs';

const BlogAndContact = ({ blogs }) => {

    const [contactUsData, setcontactUsData] = useState({
        name: "",
        email: "",
        message: "",
        phone: ""
    })

    const sendContactForm = async () => {
        try {
            const subject = encodeURIComponent(`Contact from ${contactUsData.name} - ${contactUsData.phone}`);
            const body = encodeURIComponent(`Message:\n${contactUsData.message}\n\nEmail: ${contactUsData.email}`);
            // open Gmail compose with prefilled details
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=Flutterkanpur@gmail.com&su=${subject}&body=${body}`, '_blank');
            setcontactUsData({
                name: "",
                email: "",
                message: "",
                phone: ""
            });
            alert('Thank you for reaching out! We will get back to you soon.');
        } catch (error) {
            console.error('Error sending contact form:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const blogPosts = [
        {
            title: "Mastering Flutter UI: Expert Tips & Tricks",
            description: "Want to build sleek, responsive Flutter apps? This guide dives into best practices, advanced widgets, and expert techniques to take your UI game to the next level.",
            author: "Sarah Fatima",
            authorImage: "/assets/author1.jpg" // You can add actual images later
        },
        {
            title: "Why Flutter is the Future of Cross-Platform Dev",
            description: "Explore why Flutter stands out in the cross-platform race, offering faster development, beautiful UI, and native performance — all with a single codebase.",
            author: "John Developer",
            authorImage: "/assets/author2.jpg" // You can add actual images later
        }
    ];

    const blogData = blogs.length ? blogs : blogPosts;

    return (
        <Box sx={{
            background: "#010A10",
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
                {/* Header Section */}
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "60px"
                }}>
                    {/* Left Button */}
                    <Button
                        onClick={() => window.location.href = '/bloglisting'}
                        variant="outlined"
                        sx={{
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "#FFFFFF",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                            textTransform: "none",
                            '&:hover': {
                                border: "1px solid rgba(255,255,255,0.4)",
                                background: "rgba(255,255,255,0.05)"
                            }
                        }}
                    >
                        Explore more
                    </Button>

                    {/* Center Heading */}
                    <Typography
                        sx={{
                            fontSize: { xs: "24px", md: "32px" },
                            fontWeight: "700",
                            color: "#FFFFFF",
                            textAlign: "center",
                            fontFamily: "Encode Sans, sans-serif"
                        }}
                    >
                        Learn, Share & Inspire
                    </Typography>

                    {/* Right Button */}
                    <Button
                        variant="outlined"
                        sx={{
                            visibility: 'hidden',
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "#FFFFFF",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                            textTransform: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            '&:hover': {
                                border: "1px solid rgba(255,255,255,0.4)",
                                background: "rgba(255,255,255,0.05)"
                            }
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" fill="none" />
                            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" fill="none" />
                            <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" />
                            <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" />
                            <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        Post a Blog
                    </Button>
                </Box>

                {/* Blog Posts Section */}
                <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: "30px",
                    width: "100%",
                    marginBottom: "40px"
                }}>
                    {blogData.map((post, index) => (
                        <Box key={index} sx={{
                            flex: 1,
                            background: "#0C1217",
                            borderRadius: "12px",
                            padding: "30px",
                            border: "1px solid rgba(255,255,255,0.1)",
                            position: "relative",
                            overflow: "hidden",
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100px',
                                height: '100px',
                                background: 'radial-gradient(circle, rgba(55, 171, 255, 0.2) 0%, transparent 70%)',
                                borderRadius: '50%',
                                zIndex: 0
                            }
                        }}>
                            <Box sx={{ position: "relative", zIndex: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: "20px",
                                        fontWeight: "700",
                                        color: "#FFFFFF",
                                        marginBottom: "16px",
                                        fontFamily: "Encode Sans, sans-serif"
                                    }}
                                >
                                    {post.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        color: "#E5E8EC",
                                        lineHeight: "1.6",
                                        marginBottom: "30px",
                                        fontFamily: "Encode Sans, sans-serif"
                                    }}
                                >
                                    {post.description}
                                </Typography>

                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: "20px"
                                }}>
                                    <Button
                                        onClick={() => window.open(post?.blogURL, '_blank')}
                                        variant="outlined"
                                        sx={{
                                            border: "1px solid rgba(255,255,255,0.2)",
                                            color: "#FFFFFF",
                                            borderRadius: "8px",
                                            padding: "8px 20px",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            textTransform: "none",
                                            '&:hover': {
                                                border: "1px solid rgba(255,255,255,0.4)",
                                                background: "rgba(255,255,255,0.05)"
                                            }
                                        }}
                                    >
                                        VIEW FULL BLOG
                                    </Button>
                                </Box>

                                {/* Author Profile */}
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    gap: "8px"
                                }}>
                                    <Typography
                                        sx={{
                                            fontSize: "12px",
                                            color: "#A6A6A6",
                                            fontFamily: "Encode Sans, sans-serif"
                                        }}
                                    >
                                        {post.author}
                                    </Typography>
                                    <Box sx={{
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, #37ABFF, #7AFFFF)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "12px",
                                        color: "#FFFFFF",
                                        fontWeight: "600"
                                    }}>
                                        {post.author.split(' ').map(n => n[0]).join('')}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Load More Button */}
                <Box
                    onClick={() => window.location.href = '/bloglisting'}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "80px"
                    }}>
                    <Button
                        variant="outlined"
                        sx={{
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "#FFFFFF",
                            borderRadius: "8px",
                            padding: "12px 24px",
                            fontSize: "14px",
                            fontWeight: "500",
                            textTransform: "none",
                            '&:hover': {
                                border: "1px solid rgba(255,255,255,0.4)",
                                background: "rgba(255,255,255,0.05)"
                            }
                        }}
                    >
                        Load more blogs
                    </Button>
                </Box>

                {/* Contact Section */}
                <ContactUs onClick={sendContactForm} contactUsData={contactUsData} setcontactUsData={setcontactUsData} />
            </Box>
        </Box>
    );
};

export default BlogAndContact; 