import { Button, Typography } from '@mui/material';
import React from 'react';

const ApplyNowButton = ({
    text = 'APPLY NOW',
    width = '130px',
    height = '36px',
    fontSize = '8px',
    style = {},
    textStyle = {},
    onClick = () => { },
}) => {
    return (
        <div style={{
            position: 'relative',
            display: width === '100%' ? 'block' : 'inline-block',
            width: width === '100%' ? '100%' : 'auto'
        }}>
            {/* SVG background behind everything */}
            <img
                src="/assets/btn_background.svg"
                alt="Button Animation"
                style={{
                    position: 'absolute',
                    left: '-60px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '124px',
                    height: '117px',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />

            <Button
                onClick={onClick}
                sx={{
                    position: 'relative',
                    background: '#010A10',
                    borderRadius: '999px',
                    padding: '4px 18px',
                    width: width === '100%' ? '100%' : width,
                    minWidth: width === '100%' ? 'auto' : width,
                    minHeight: height,
                    border: 'none',
                    overflow: 'hidden',
                    boxShadow: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1, // Above the SVG
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '999px',
                        padding: '1px', // border thickness
                        background: 'linear-gradient(90deg, #37ABFF, #0C1217 , #0C1217 )',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        zIndex: -1, // Behind the text but above the button background
                    },
                    ...style,
                }}
            >
                <Typography
                    sx={{
                        color: '#F5F5F5',
                        fontSize: fontSize,
                        fontWeight: 400,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        position: 'relative',
                        zIndex: 1, // Above everything in the button
                        ...textStyle,
                    }}
                >
                    {text}
                </Typography>
            </Button>
        </div>
    );
};

export default ApplyNowButton;