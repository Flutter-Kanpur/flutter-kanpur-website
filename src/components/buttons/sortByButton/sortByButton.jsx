'use client';

import { Button, Typography } from '@mui/material'
import React from 'react'
import SwapVertIcon from '@mui/icons-material/SwapVert';

const SortByButton = ({ style = {}, typographyStyle = {}, text, onClick }) => {
    return (
        <Button
            variant="outlined"
            endIcon={<SwapVertIcon sx={{color:'#3fd1ff'}}/>}
            sx={{
                px:2,
                color: 'white',
                border: '1px solid #0f1c25',
                borderRadius: '100px',
            }}
        >
            <Typography sx={{ ...typographyStyle, fontWeight: 300, textTransform: "none", fontSize: 15, lineHeight: "24px", color: "#3fd1ff" }}>
                {text}
            </Typography>
        </Button>
    )
}
export default SortByButton