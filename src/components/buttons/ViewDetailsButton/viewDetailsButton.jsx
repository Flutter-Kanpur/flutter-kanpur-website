'use client';

import { Button, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image';

const ViewDetailsButton = ({ style = {}, typographyStyle = {}, text, onClick }) => {
    return (
        <Button
            variant="contained"
            startIcon={<Image src="/EventPageImages/ViewDetails.png" width={20} height={18} alt="View" />}
            onClick={onClick}
            sx={{
                ...style,
                backgroundColor: '#0f1c25',
                color: 'white',
                '&:hover': { backgroundColor: '#142832' },
                flexShrink: 0,
                flexGrow: 0,
            }}
        >
            <Typography sx={{ ...typographyStyle, fontWeight: 300, textTransform: "none", fontSize: 15, lineHeight: "24px", color: "#E5E8EC" }}>
                {text}
            </Typography>
        </Button>
    )
}
export default ViewDetailsButton