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
        <Box style={{ width: "100%" }}>
            <Box sx={{ marginTop: "182px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 1 }}>
                <Box sx={{ position: "relative" }}>
                    <Image src="/landingPageIcons/landing_globe.svg" width={226.0133514404297} height={216.9365234375}
                        style={{
                            position: "absolute",
                            opacity: 0.1,
                            left: "0%", top: "50%",
                            transform: "translate(-50% , -50%)"
                        }} alt="Globe Background"
                    />
                    <Typography
                        sx={{
                            fontSize: 67,
                            fontWeight: 700,
                            color: "#E5E8EC",
                            background: "-webkit-linear-gradient(#fff,#C9E8FF)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            textAlign: "center"
                        }}
                    >
                        Unite. Design. Innovate
                    </Typography>
                </Box>
                <Typography sx={{
                    fontSize: 18,
                    fontWeight: 400,
                    color: "#E5E8EC",
                    background: "-webkit-linear-gradient(#fff,#C9E8FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textAlign: "center"
                }}>
                    Join the Flutter Kanpur Community & Shape the Future of Design & Development.
                </Typography>


                <ShimmerButton style={{ width: "200px", marginTop: "50px" }} />

                {/* Stats Container - now directly using props */}
                <Box sx={{
                    width: "100%",
                    marginBottom: '140px',
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: "180px",
                    display: "flex",
                    justifyContent: "space-evenly",
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
