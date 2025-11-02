"use client";
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import ShimmerButton from '../buttons/shimmerButton/shimmerButton'
import StatsComponent from '../stats/statsComponent';

const HeroComponent = ({ stats = [] }) => {

    // If stats is an array, use it directly; otherwise, create array from object
    const statsArray = Array.isArray(stats) ? stats : [
        {
            id: 1,
            title: stats?.community_member || '-',
            description: 'Community Members',
        },
        {
            id: 2,
            title: stats?.events_hosted || '-',
            description: 'Events Hosted',
        },
        {
            id: 3,
            title: stats?.community_lead || '-',
            description: 'Community Leads',
        },
    ]

    return (
        <Box style={{ position: 'relative', width: "100%", overflow: "hidden", minHeight: "100vh" }}>
            <Box sx={{
                textAlign: "center",
                position: "absolute",
                top: "-113px",
                left: "206px",
                width: "1100px",
                height: "1100px",
                background: "radial-gradient(circle, rgba(55, 171, 255, 0.12) 0%, rgba(122, 255, 255, 0.06) 30%, rgba(55, 171, 255, 0.03) 50%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(100px)",
                zIndex: 0,
                pointerEvents: "none",
                opacity: 1
            }} />
            
            <Image src="/landingPageIcons/landing_globe.svg" width={226.0133514404297} height={216.9365234375} style={{ position: "absolute", opacity: 0.1, bottom: "63vh", right: "70vw" }} alt="Globe Background" />
            <Box sx={{ marginTop: "182px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 1, position: "relative", zIndex: 2 }}>
                <Typography
                    sx={{
                        minHeight: "100px",
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                        textAlign: "center",
                        maxWidth: { xs: "90%", sm: "85%", md: 980 },
                        mx: "auto",
                        background: "linear-gradient(180deg, #FFFFFF 0%, #C9E8FF 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontSize: {
                            xs: 32,
                            sm: 42,
                            md: 64,
                            lg: 80,
                        },
                        position: "relative",
                        '&::before': {
                            textAlign: "center",
                            content: '""',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '110%',
                            height: '110%',
                            background: 'radial-gradient(ellipse, rgba(122, 255, 255, 0.12) 0%, rgba(55, 171, 255, 0.08) 40%, transparent 75%)',
                            filter: 'blur(40px)',
                            zIndex: -1,
                            pointerEvents: 'none',
                            opacity: 0.8
                        }
                    }}
                >
                    Unite. Design. Innovate
                </Typography>
                <Typography sx={{ mt: 1.5, color: "#E5E8EC", fontSize: { xs: 14, sm: 16, md: 18 } }}>
                    Join the Flutter Kanpur Community & Shape the Future of Design.
                </Typography>

                <ShimmerButton style={{ marginTop: "50px" }} />

                {/* Stats Container - now directly using props */}
                <Box sx={{
                    width: "100%",
                    maxWidth: "1200px",
                    marginBottom: '140px',
                    marginTop: "180px",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    gap: { xs: "20px", md: "40px" },
                    paddingX: { xs: "20px", md: "40px" }
                }}>
                    {statsArray.length === 0 ? (
                        <Typography sx={{ color: '#fff' }}>No stats available</Typography>
                    ) : (
                        statsArray.map((stat) => (
                            <StatsComponent key={stat.id} heading={stat.title} description={stat.description} />
                        ))
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default HeroComponent