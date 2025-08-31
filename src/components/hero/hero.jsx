"use client";
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import ShimmerButton from '../buttons/shimmerButton/shimmerButton'
import StatsComponent from '../stats/statsComponent';

// No need for Firebase imports, useState or useEffect as data comes from props

const HeroComponent = ({ stats = [], latestAnnouncement = "" }) => {
    // We receive data directly as props from the server component
    // No loading states needed as data is already available

    return (
        <Box style={{ position: 'relative', width: "100%" }}>
            <Image src="/landingPageIcons/landing_globe.svg" width={226.0133514404297} height={216.9365234375} style={{ position: "absolute", opacity: 0.1, bottom: "49vh", right: "65.5vw" }} alt="Globe Background" />
            <Box sx={{ marginTop: "182px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 1 }}>
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

                {/* Latest Announcement - now directly using props */}
                <Typography sx={{ fontSize: 18, fontWeight: 500, color: "#E5E8EC", minHeight: '24px' }}>
                    {latestAnnouncement || 'No announcements yet.'}
                </Typography>

                <ShimmerButton style={{ marginTop: "50px" }} />

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
                    {stats.length === 0 ? (
                        <Typography sx={{ color: '#fff' }}>No stats available</Typography>
                    ) : (
                        stats.map((stat) => (
                            <StatsComponent key={stat.id} heading={stat.title} description={stat.description} />
                        ))
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default HeroComponent
