import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import ShimmerButton from '../buttons/shimmerButton/shimmerButton'
import { flutter_kanpur_statistics } from "@/constants/statistics";
import StatsComponent from '../stats/statsComponent';


const HeroComponent = () => {
    return (
        <Box style={{ position: 'relative', width: "100%" }}>
            <Image src="/landingPageIcons/landing_globe.svg" width={226.0133514404297} height={216.9365234375} style={{ position: "absolute", opacity: 0.1, bottom: "71vh", right: "65.5vw" }} alt="Globe Background" />
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
                <Typography sx={{ fontSize: 18, fontWeight: 500, color: "#E5E8EC" }}>
                    Join the Flutter Kanpur Community & Shape the Future of Design & Development.
                </Typography>

                <ShimmerButton style={{ marginTop: "50px" }} />

                {/* Stats Container */}
                <Box sx={{
                    width: "100%",
                    marginBottom: '140px',
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: "180px",
                    display: "flex",
                    justifyContent: "space-evenly",
                }}>
                    {flutter_kanpur_statistics.map((stats) => (
                        <StatsComponent key={stats.id} heading={stats.title} description={stats.description} />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default HeroComponent
