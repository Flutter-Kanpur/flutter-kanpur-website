'use client';

import { Button, Typography } from '@mui/material'
import React from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const SwipeDownButton = ({ style = {}, typographyStyle = {}, text, onClick }) => {
    return (
        <Button
            variant="outlined"
            endIcon={<ArrowDownwardIcon />}
            sx={{
                px: 3,
                py: 1.5,
                color: 'white',
                border: '1px solid transparent',
                borderRadius: '50px',
                background: 'linear-gradient(#0c1217, #0c1217) padding-box, linear-gradient(270deg, #3fd1ff, #e5e8ec) border-box'
            }}
        >
            <Typography sx={{ ...typographyStyle, fontWeight: 300, textTransform: "none", fontSize: 15, lineHeight: "24px", color: "#E5E8EC" }}>
                {text}
            </Typography>
        </Button>
    )
}
export default SwipeDownButton