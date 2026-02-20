import { Button, Typography } from '@mui/material'
import React from 'react'

const CustomButtonV2 = ({ onClick, text, style = {}, textStyle = {} }) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                ...style,
                padding: "10px 23.5px",
                borderRadius: "32px",
                backgroundColor: "#fff",
                fontWeight: 600,
                width: "50%",
                textTransform: "none",
                "&:hover": {
                    boxShadow: 'none',
                    backgroundColor: "#fff"
                }
            }}>
            <Typography
                sx={{
                    ...textStyle,
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#000",
                    width: "100%"
                }}>
                {text}
            </Typography>
        </Button>
    )
}

export default CustomButtonV2
