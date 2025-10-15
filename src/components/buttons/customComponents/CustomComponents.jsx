import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const CustomloginSignUpButton = ({ conditionText, buttontext, onClick }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: '20px',
            color: '#A6A6A6',
            fontSize: '14px',
            fontFamily: 'Encode Sans, sans-serif'
        }}>
            {conditionText}{' '}
            <Button
                onClick={onClick}
                style={{
                    padding: '0',
                    textTransform: 'none',
                    background: 'none',
                    border: 'none',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontFamily: 'Encode Sans, sans-serif'
                }}
            >
                <Typography sx={{ fontSize: '14px', textTransform: 'none', fontFamily: 'Encode Sans, sans-serif' }}>
                    {buttontext}
                </Typography>
            </Button>
        </Box>
    )
}

export default CustomloginSignUpButton
