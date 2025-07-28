import { Typography } from '@mui/material';
import React from 'react';
import GradientBorderContainer from './GradientBorderContainer';
import { Height } from '@mui/icons-material';

const StatsContainer = ({ 
    number, 
    label, 
    style = {},
    numberStyle = {},
    labelStyle = {}
}) => {
    return (
        <GradientBorderContainer style={style} gap="50px" height="57px" padding="0px 40px" width='auto'>
            <Typography
                sx={{
                    fontSize: '20px',
                    fontWeight: 200,
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
                    color: '#A6A6A6',
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