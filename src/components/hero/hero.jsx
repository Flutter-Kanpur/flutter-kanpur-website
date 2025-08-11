import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import ShimmerButton from '../buttons/shimmerButton/shimmerButton'

const HeroComponent = () => {
    return (
        <div style={{ position: "relative", }}>
            <Image src="/landingPageIcons/landing_globe.svg" width={226.0133514404297} height={216.9365234375} style={{ position: "absolute", opacity: 0.1, top: "7vw", right: "36vw" }} alt="Globe Background" />
            <Box sx={{ marginTop: "182px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 3 }}>
                <Typography
                    sx={{
                        fontSize: 64,
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
                    Join the Flutter Kanpur Community & Shape the Future of Design.
                </Typography>
                <ShimmerButton />
            </Box>
        </div>
    )
}

export default HeroComponent
