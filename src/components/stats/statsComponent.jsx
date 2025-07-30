import { Box, Typography } from '@mui/material'
import React from 'react'

const StatsComponent = ({ style = {}, typographyStyle = {}, heading, description }) => {
    return (
        <Box
            sx={{
                borderRadius: "7px",
                padding: "1px", // border thickness
                background: "linear-gradient(to right, #fff, transparent)", // gradient border
                display: "inline-block",
                ...style,
            }}
        >
            <Box
                sx={{
                    borderRadius: "7px",
                    background: "#181818", // to be changed to a gradient if needed
                    display: "flex",
                    height: "25px",
                    minWidth: "261px",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1,
                    padding: "16px",
                }}
            >
                <Typography sx={{ ...typographyStyle, fontWeight: 300, fontSize: 20, background: "transparent", lineHeight: "24px", color: "#ffffff" }}>
                    {heading}
                </Typography>
                <Typography sx={{ ...typographyStyle, fontWeight: 500, fontSize: 18, lineHeight: "24px", color: "#A6A6A6" }}>
                    {description}
                </Typography>
            </Box>
        </Box>
    )
}

export default StatsComponent
