'use client';

import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import React from 'react'

const GoBackButton = ({ text }) => {

    const router = useRouter();

    return (
        <Button
            onClick={() => router.back()}
            variant="outlined"
            sx={{
                px: 4,
                border: '1px solid #6c6c6c',
                borderRadius: '100px',
            }}>
            <Typography sx={{ fontWeight: 300, textTransform: "none", fontSize: 15, lineHeight: "24px", color: "#9c9c9c" }}>
                {text}
            </Typography>
        </Button>
    )
}
export default GoBackButton