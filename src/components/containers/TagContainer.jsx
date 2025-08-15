import { Box } from '@mui/material'
import React from 'react'

const TagContainer = ({ tag }) => {
    return (
        <Box
            sx={{
                textAlign: "center",
                display: "flex",
                alignContent: "center",
                background: 'transparent',
                border: '1px solid #2E3942',
                borderRadius: '100px',
                padding: '9.5px 35.5px',
                fontSize: '14px',
                fontWeight: '500',
                width: 'fit-content',
                '&::before': {
                    content: `"${tag}"`,
                    background: 'linear-gradient(to right, #3FD1FF 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: 'Encode Sans, sans-serif'
                }
            }}>
        </Box>
    )
}

export default TagContainer
