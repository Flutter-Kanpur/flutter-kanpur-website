import { Typography } from '@mui/material';
import React from 'react';
import GradientBorderContainer from './GradientBorderContainer';

const StatsContainer = ({ 
    number, 
    label, 
    style = {},
    numberStyle = {},
    labelStyle = {}
}) => {
    return (
        <GradientBorderContainer style={style}>
            <Typography
                sx={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    textAlign: 'center',
                    ...numberStyle
                }}
            >
                {number}
            </Typography>
            <Typography
                sx={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#E5E8EC',
                    textAlign: 'center',
                    ...labelStyle
                }}
            >
                {label}
            </Typography>
        </GradientBorderContainer>
    );
};

export default StatsContainer; 